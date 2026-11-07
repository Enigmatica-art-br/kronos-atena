# Portal Kronos + Atena — plano da primeira versão

## Objetivo e decisões
Construir um acervo navegável do trabalho das duas equipes do IFRJ. A central usa Kronos como identidade principal, com Atena como equipe com página e filtros próprios. Um único conjunto de dados evita duplicação. Não configurar domínio personalizado.

## Mapa de navegação e conteúdo
- `/`: banner original, apresentação, atalhos Kronos/Atena, seleção de robôs, Talos IA e comunicação.
- `#/equipes`: duas apresentações e acesso ao acervo filtrado de cada equipe.
- `#/equipe/kronos` e `#/equipe/atena`: pessoas e robôs vinculados à equipe.
- `#/pessoas`: 10 perfis demonstrativos; filtros independentes de equipe, vínculo e situação. Agrupar bolsistas, voluntários e ex-integrantes sem apagar o vínculo histórico.
- `#/pessoa/:id`: retrato, nome completo, função, vínculo, entrada/saída e projetos relacionados. Campos Lattes e redes preparados, sem URLs fictícias.
- `#/robos`: 7 fichas demonstrativas em grupos visuais; busca por nome, filtro por equipe e situação.
- `#/robo/:id`: ilustração, descrição, plataforma, estado, componentes, período e participantes vinculados.
- `#/projetos`: pesquisa e desenvolvimento; Talos IA e projeto do portal.
- `#/projeto/talos`: projeto real informado pelo responsável, descrição ainda sujeita a complementação, vínculo ao Desafio Liga Jovem e à comunicação.
- `#/comunicacao`: espaço de vídeo em destaque, publicações oficiais e projetos de comunicação. Vídeo sem ID confirmado fica com estado honesto de pendência e link ao canal, nunca embed aleatório.

## Modelo de dados
Pessoa: id, nome, equipe, área, vínculo (bolsista/voluntário), entrada, saída opcional, retrato, Lattes opcional, redes, projetos[].
Robô: id, nome, equipe, objetivo, plataforma, estado, componentes[], período, pessoas[], projeto opcional.
Projeto: id, título, categoria, descrição, equipe(s), pessoas[], publicações[].
Publicação: id, título, tipo, URL oficial, videoId opcional, projetoId. Reutilizar o registro no projeto e na comunicação.

## Direção visual — correções incorporadas durante a execução
Referências de álbum: composição industrial e mecânica, sem reproduzir rostos, imagens ou caveiras. Base preta e dourada; verde apenas em detalhes da composição mecânica. Removidos o ruído global, o fundo oliva e a decoração orbital. Chapas, eixos e cabos sobrepostos em composição vetorial própria; recortes localizados em peças e seções. Nenhuma imagem gerada no banner. Tipografia expressiva apenas no título Kronos; demais títulos, menus e textos priorizam leitura limpa. Central com títulos diretos e sem numeração ou subtítulos decorativos. Navegação renderizada no mesmo clique com retorno instantâneo ao topo. Marca tipográfica provisória até receber a logo oficial.

## Execução e critérios de aceite
1. Criar repositório separado e esqueleto estático, sem dependências de framework.
2. Produzir banner e retratos fictícios; usar ilustrações técnicas nos robôs de exemplo.
3. Implementar rotas, filtros, busca, perfis e fichas com ligações de volta.
4. Centralizar conteúdo nos módulos de dados. Marcar demonstrações e separar fatos fornecidos.
5. Verificar rotas, filtros combinados, estados vazios, links internos, Tab, foco após navegação, celular e redução de movimento.
6. Publicar no GitHub Pages padrão, sem CNAME. Documentar substituição dos dados.

## Pendências editoriais para a versão definitiva
Logo oficial; nomes, retratos e datas reais; história da Atena; fichas reais de robôs e permalinks do Instagram. Referências de álbum recebidas e incorporadas. Pitch oficial confirmado: 0SkIhD2li0U. Não anunciar resultados, prêmios ou especificações inventadas como fatos.

## Acervo e navegação — revisão executada
O script `tools/collect-instagram.mjs` usa o Brave headless em sessão isolada. A coleta pública encontrou 12 posts, com 18 imagens e 3 vídeos. As páginas de publicação preservam os textos e mídias originais e ligam cada registro ao seu projeto e à fonte. Foram criados agrupamentos reais de oficinas, entrevistas, Mobiliza e uniformes. A explicação pública sobre APIs também aparece no Talos IA.

A central passou a mostrar projetos, todas as sete fichas de robôs, os dez integrantes e as publicações. As imagens dos robôs são demonstrativas e distintas. As fileiras têm controles calculados pelas posições reais dos itens, contagem, limites desativados e suporte a cliques consecutivos. Catálogos oferecem busca e filtros; a navegação troca no próprio clique. O CSS foi consolidado em `portal.css`, e as vistas foram separadas do controlador em `views.js`.

Os permalinks dos 12 registros coletados estão resolvidos. A sessão pública pode não expor todo o histórico do Instagram; os dados reais de participantes e robôs, assim como a logo oficial e o histórico institucional da Atena, continuam pendentes.
