import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {instagramPosts} from '../content/instagram/posts.js';
const source=JSON.parse(await readFile(new URL('../content/instagram/posts.json',import.meta.url),'utf8'));
let media=0,videos=0;
for(const p of instagramPosts){
 const original=source.posts.find(x=>x.id===p.id);
 assert.ok(original,'Registro sem fonte: '+p.id);
 const wrapped=original.caption.match(/^[\s\S]*?comments? - [\s\S]*?: "([\s\S]*)"\.\s*$/);
 assert.equal(p.caption,wrapped?wrapped[1]:original.caption,'Legenda alterada: '+p.id);
 assert.equal(p.url,original.url,'Origem alterada: '+p.id);
 assert.equal(p.media.length,original.media.length,'Mídias omitidas: '+p.id);
 for(const item of p.media){await access(new URL('../'+item.file,import.meta.url));media++;if(item.type==='video')videos++}
}
assert.equal(instagramPosts.length,source.posts.length,'Publicações omitidas');
console.log(JSON.stringify({posts:instagramPosts.length,media,videos,exactCaptions:true,localFiles:true}));
