# Importação das publicações oficiais

O coletor usa Playwright com o executável instalado do **Brave**, em modo headless e contexto isolado. Não controla o desktop, não lê cookies do perfil pessoal, não encerra ou modifica as abas existentes. Nenhuma autenticação foi necessária nesta coleta.

Com o Node e o Playwright disponíveis:

```powershell
node tools/collect-instagram.mjs --account equipe.kronos
node tools/import-instagram.mjs
```

O caminho do Brave pode ser configurado com `--browser CAMINHO`. `--runtime CAMINHO` indica um arquivo de referência numa instalação do Node com Playwright resolvível. No ambiente de criação, o runtime integrado já é usado por padrão. `--output PASTA` seleciona o diretório do acervo.

## O que é coletado
- Links das publicações efetivamente expostas no perfil público.
- Legendas completas fornecidas pelo HTML público de cada publicação, sem reescrita.
- Imagens de cada carrossel e arquivos de vídeo disponíveis publicamente.
- Autor, data e endereço canônico do Instagram.

Nesta importação foram encontradas **12 publicações**, com **18 imagens e 3 vídeos**. Isso corresponde ao conteúdo exposto pela sessão pública; não é uma garantia de que todos os posts históricos da conta estejam acessíveis sem autenticação. Atualizações preservam registros antigos já importados. Nenhuma paginação privada ou bloqueio de login é contornado.

`content/instagram/posts.json` é o acervo da coleta. O importador gera `posts.js`, normaliza as datas e associa as publicações aos projetos. Os arquivos são hospedados junto ao site, e cada publicação tem sua própria rota `#/publicacao/ID`, legenda integral e link para o original. Os carrosséis preservam a ordem dos slides. Os vídeos usam controles nativos e não iniciam automaticamente.

## Organização editorial
Os agrupamentos atuais são Oficinas & Semana Acadêmica, Conhecendo nossa equipe, Mobiliza, Uniformes Kronos e Talos IA. Novas publicações não reconhecidas recebem o grupo Comunicação até curadoria; o conteúdo original permanece íntegro.
