import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Navegador isolado: não conecta, fecha ou modifica as abas do usuário.
const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => {
  if (value.startsWith('--')) pairs.push([value.slice(2), all[i + 1]]);
  return pairs;
}, []));
const account = args.account || 'equipe.kronos';
if (!/^[a-zA-Z0-9._]+$/.test(account)) throw new Error('Conta inválida');
const executablePath = args.browser || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe';
const require = createRequire(path.resolve(args.runtime || 'C:/Users/Fenix/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/collector.cjs'));
const { chromium } = require('playwright');
const output = path.resolve(args.output || 'content/instagram');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ locale: 'pt-BR', viewport: { width: 1440, height: 1100 } });
const page = await context.newPage();
const posts = new Map();
const mediaRecords = new Map();
const canonical = url => {
  try { const match = new URL(url, 'https://www.instagram.com').pathname.match(/\/(p|reel)\/([\w-]+)/); return match ? `https://www.instagram.com/${match[1]}/${match[2]}/` : null; } catch { return null; }
};

// Apenas respostas públicas já fornecidas ao navegador para este perfil.
page.on('response', async response => {
  if (!response.url().includes('instagram.com') || !response.headers()['content-type']?.includes('json')) return;
  try {
    const data = await response.json();
    const walk = (node, depth = 0) => {
      if (!node || typeof node !== 'object' || depth > 22) return;
      const owner = node.user?.username || node.owner?.username;
      const code = node.code || node.shortcode;
      if (code && owner === account) {
        const caption = node.caption?.text ?? node.edge_media_to_caption?.edges?.[0]?.node?.text ?? '';
        const children = node.carousel_media || node.edge_sidecar_to_children?.edges?.map(e => e.node) || [node];
        const media = children.flatMap(item => {
          const image = item.image_versions2?.candidates?.[0]?.url || item.display_url;
          const video = item.video_versions?.[0]?.url || item.video_url;
          return [image && { type: 'image', remoteUrl: image }, video && { type: 'video', remoteUrl: video }].filter(Boolean);
        });
        const url = `https://www.instagram.com/${node.media_type === 2 ? 'reel' : 'p'}/${code}/`;
        posts.set(code, url);
        mediaRecords.set(code, { id: code, url, author: owner, caption, date: node.taken_at || node.taken_at_timestamp || null, media, source: 'public-browser-response' });
      }
      for (const child of Object.values(node)) if (child && typeof child === 'object') walk(child, depth + 1);
    };
    walk(data);
  } catch { /* HTML e respostas indisponíveis não são conteúdo de posts. */ }
});

try {
  console.log(`Brave headless: lendo https://www.instagram.com/${account}/`);
  const response = await page.goto(`https://www.instagram.com/${account}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(4000);
  for (let pass = 0, unchanged = 0; pass < 18 && unchanged < 3; pass++) {
    const before = posts.size;
    const links = await page.locator('a[href*="/p/"],a[href*="/reel/"]').evaluateAll(elements => elements.map(e => e.href));
    for (const link of links) { const url = canonical(link); if (url) posts.set(url.split('/').at(-2), url); }
    unchanged = posts.size === before ? unchanged + 1 : 0;
    await page.evaluate(() => window.scrollBy(0, innerHeight * 1.5));
    await page.waitForTimeout(1100);
  }
  console.log(`Publicações encontradas: ${posts.size}`);
  const records = [];
  for (const [id, url] of posts) {
    let record = mediaRecords.get(id);
    if (!record?.caption || !record.media.length) {
      console.log(`Lendo publicação ${id}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(1600);
      const embedded = await page.evaluate(({ id, account }) => {
        let found=null;
        const walk=(node,depth=0)=>{
          if(!node||typeof node!=='object'||depth>35||found)return;
          if((node.code||node.shortcode)===id){
            const children=node.carousel_media||node.edge_sidecar_to_children?.edges?.map(e=>e.node)||[node];
            const media=children.flatMap(item=>{const image=item.image_versions2?.candidates?.[0]?.url||item.display_url;const video=item.video_versions?.[0]?.url||item.video_url;return [image&&{type:'image',remoteUrl:image},video&&{type:'video',remoteUrl:video}].filter(Boolean)});
            if(media.length)found={id,author:account,caption:node.caption?.text||node.edge_media_to_caption?.edges?.[0]?.node?.text||'',date:node.taken_at||node.taken_at_timestamp||null,media,source:'public-post-embedded-json'};
          }
          for(const child of Object.values(node))if(child&&typeof child==='object')walk(child,depth+1);
        };
        for(const script of document.querySelectorAll('script[type="application/json"]')){try{walk(JSON.parse(script.textContent))}catch{}}
        return found;
      }, {id,account});
      const dom = await page.evaluate(() => {
        const article = document.querySelector('article') || document.querySelector('[role="dialog"]') || document.querySelector('main');
        const caption = article?.querySelector('h1')?.innerText || document.querySelector('meta[property="og:description"]')?.content || '';
        const images = [...(article || document).querySelectorAll('img')].filter(img => img.naturalWidth >= 300 && !img.alt?.includes('Foto do perfil')).map(img => ({ type: 'image', remoteUrl: img.currentSrc || img.src }));
        const og = document.querySelector('meta[property="og:image"]')?.content;
        if (!images.length && og) images.push({ type: 'image', remoteUrl: og });
        return { caption, media: images, date: document.querySelector('time')?.dateTime || null };
      });
      record = embedded ? {...embedded,url} : mediaRecords.get(id) || { id, url, author: account, ...dom, source: 'public-post-dom' };
    }
    if (!record.caption && !record.media.length) continue;
    const rawDescription = record.caption;
    if (record.source === 'public-post-dom') {
      const quoted = record.caption.match(/^[\s\S]*?comments? - [\s\S]*?: "([\s\S]*)"\.\s*$/);
      if (quoted) record.caption = quoted[1];
    }
    const localMedia = [];
    for (let index = 0; index < record.media.length; index++) {
      const media = record.media[index];
      try {
        const parsed = new URL(media.remoteUrl);
        if (!/(cdninstagram\.com|fbcdn\.net|instagram\.com)$/.test(parsed.hostname)) continue;
        const download = await context.request.get(media.remoteUrl, { timeout: 20000 });
        if (!download.ok()) continue;
        const contentType = download.headers()['content-type'] || '';
        if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) continue;
        const extension = contentType.includes('video') ? '.mp4' : contentType.includes('webp') ? '.webp' : contentType.includes('png') ? '.png' : '.jpg';
        const filename = `${id}-${index + 1}${extension}`;
        await writeFile(path.join(output, filename), await download.body());
        localMedia.push({ type: media.type, file: filename });
      } catch { /* Guardar somente os arquivos efetivamente baixados. */ }
    }
    records.push({ ...record, rawDescription, media: localMedia, collectedAt: new Date().toISOString() });
  }
  // Atualizações preservam publicações mais antigas já arquivadas.
  try{const previous=JSON.parse(await readFile(path.join(output,'posts.json'),'utf8'));const seen=new Set(records.map(p=>p.id));for(const post of previous.posts||[])if(!seen.has(post.id))records.push(post)}catch{}
  const body = await page.locator('body').innerText();
  const result = { account, profile: `https://www.instagram.com/${account}/`, collectedAt: new Date().toISOString(), httpStatus: response?.status(), status: records.length ? 'collected' : 'public-content-unavailable', posts: records, diagnostics: records.length ? null : { pageTitle: await page.title(), loginWall: /Entrar|Log in|Iniciar sessão/i.test(body), message: 'O Brave não recebeu publicações públicas nesta sessão. Nenhuma legenda foi inventada e nenhum perfil autenticado foi copiado.' } };
  await writeFile(path.join(output, 'posts.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status: result.status, posts: records.length, output: path.join(output, 'posts.json'), diagnostics: result.diagnostics }));
  if (!records.length) process.exitCode = 2;
} finally {
  await context.close();
  await browser.close();
}
