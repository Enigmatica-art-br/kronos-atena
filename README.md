# Kronos / Atena — portal IFRJ

Protótipo estático e responsivo das equipes, criado com HTML, CSS e JavaScript modular, sem build e sem backend. Publicação no GitHub Pages, sem domínio personalizado.

## Rodar
Sirva esta pasta com qualquer servidor HTTP estático, por exemplo `python -m http.server 4181`. Módulos JavaScript precisam de HTTP; não abrir index.html diretamente via file://.

## Organização
- `index.html`: estrutura, navegação e rodapé.
- `styles.css`: estrutura e adaptações móveis.
- `theme.css`: linguagem industrial aplicada à interface; tipografia de leitura limpa, superfícies oliva oxidadas, cobre, preto vinho e recortes discretos.
- `data.js`: pessoas, robôs, projetos e publicações. IDs ligam os registros.
- `app.js`: rotas por hash, páginas, filtros, busca e navegação.
- `assets/`: banner e retratos de demonstração.
- `docs/PLANO.md`: arquitetura, escopo, critérios e pendências.

## Substituição de conteúdo
Pessoas e robôs estão claramente identificados como fictícios. Os retratos são gerados, não integrantes reais. Cadastre URLs reais de Lattes e redes nos campos `lattes` e `social`. Datas usam `AAAA-MM`; saída `null` significa participação atual. Troque a ilustração técnica por fotografia quando o acervo real for fornecido.

O Talos IA e seu vínculo ao Desafio Liga Jovem foram informados pelo responsável. O pitch oficial foi localizado no canal `@EquipeKronos`: https://www.youtube.com/watch?v=0SkIhD2li0U. Não foram inventadas capacidades técnicas ou resultados. O perfil oficial de Instagram é https://www.instagram.com/equipe.kronos/; permalinks dos posts ainda aguardam curadoria.

## Imagens originais
Somente os retratos de demonstração são usados: `assets/pessoas-demo.webp`, gerados com a ferramenta integrada de imagens. Brief: dez estudantes adultos fictícios em estúdio, dispostos em cinco colunas e duas linhas. A referência de álbum orienta a interface por CSS; a abertura não utiliza imagens geradas. A fonte expressiva fica restrita à marca Kronos; textos, menus e fichas usam DM Sans local, com licença incluída.

## Publicação
GitHub Pages a partir da raiz da branch `main`. Não adicionar CNAME até autorização do responsável. O carregamento do vídeo usa YouTube com domínio de privacidade aprimorada e apenas após interação.
