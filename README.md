# Kronos & Atena — portal IFRJ

Portal estático, responsivo e sem framework das equipes. Repositório independente; GitHub Pages sem domínio personalizado.

## Executar
Sirva a raiz com um servidor HTTP estático, por exemplo `python -m http.server 4181`. As rotas usam hash e funcionam diretamente no GitHub Pages.

## Arquivos
- `index.html`: navegação e estrutura compartilhada.
- `portal.css`: composição, tipografia, superfícies e layout responsivo.
- `app.js`: navegação imediata, filtros, reprodução e controles das fileiras.
- `views.js`: central, equipes, catálogos, perfis, projetos e publicações.
- `data.js`: registros e ligações entre pessoas, robôs, projetos e campanhas.
- `content/instagram/`: publicações oficiais com legendas, imagens e vídeos.
- `tools/collect-instagram.mjs`: coleta com Brave headless isolado.
- `tools/import-instagram.mjs`: normalização e curadoria por projeto.
- `tools/check-content.mjs`: verifica integridade das legendas, links e arquivos.
- `docs/COLETA-INSTAGRAM.md`: operação e limites da coleta.
- `docs/PLANO.md`: arquitetura, decisões e pendências.

## Acervo oficial
12 publicações públicas coletadas do Instagram `@equipe.kronos`, com 18 imagens e 3 vídeos. As páginas próprias preservam a legenda integral, os slides, os vídeos e o link original. Projetos: Oficinas & Semana Acadêmica, entrevistas, Mobiliza, uniformes e Talos IA.

O pitch oficial do Talos IA está conectado ao projeto e à comunicação: https://www.youtube.com/watch?v=0SkIhD2li0U. O player do YouTube só carrega após interação. Os vídeos nativos do Instagram não iniciam automaticamente e usam preload de metadados.

## Dados de demonstração
Os dez perfis e os sete robôs continuam demonstrativos, com fotos geradas e identificação explícita. Os retratos e robôs não representam integrantes ou construções reais. Legendas e pessoas citadas nas publicações oficiais não foram misturadas aos perfis fictícios. Campos Lattes e redes aceitam links reais quando fornecidos. Datas usam AAAA-MM, com saída null para participação atual.

## Imagens demonstrativas
`assets/pessoas-demo.webp`: dez adultos fictícios em retratos de estúdio, cinco colunas e duas linhas.
`assets/robos-demo.webp`: nove construções educacionais fictícias em bancada, três colunas e três linhas; sete usadas no catálogo.
Ambas geradas com a ferramenta integrada de imagens, sem referência aos rostos das capas de álbum. A identidade da interface usa CSS e o próprio conteúdo do acervo; nenhum banner gerado ou filtro global.

## Verificação
`node tools/check-content.mjs` compara as legendas importadas com a fonte, verifica as URLs e cada arquivo local. A navegação, os filtros, os carrosséis, o menu móvel e a ausência de overflow são verificados no navegador. As setas usam a posição real dos cartões, permitem cliques consecutivos e desativam nos limites.

## Publicação
Raiz da branch main, com .nojekyll. Não configurar CNAME até autorização.
