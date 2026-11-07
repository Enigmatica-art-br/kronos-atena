import {instagramPosts} from './content/instagram/posts.js';
export const people = [
 ['helena','Helena Martins Costa','atena','Programação','Bolsista','2024-03',null],
 ['beatriz','Beatriz Almeida Santos','atena','Eletrônica','Bolsista','2024-08',null],
 ['julia','Júlia Ferreira Lima','atena','Mecânica','Voluntário','2025-03',null],
 ['luiza','Luiza Oliveira Rocha','atena','Comunicação','Voluntário','2025-03',null],
 ['mariana','Mariana Ribeiro Alves','atena','Pesquisa','Bolsista','2023-03','2024-12'],
 ['gabriel','Gabriel Souza Pereira','kronos','Programação','Bolsista','2024-03',null],
 ['lucas','Lucas Henrique Barros','kronos','Mecânica','Bolsista','2024-08',null],
 ['rafael','Rafael Gomes Araújo','kronos','Eletrônica','Voluntário','2025-03',null],
 ['pedro','Pedro Miguel Carvalho','kronos','Comunicação','Voluntário','2025-03',null],
 ['mateus','Mateus Vieira Nascimento','kronos','Pesquisa','Voluntário','2023-03','2024-12']
].map((p,i)=>({id:p[0],name:p[1],team:p[2],area:p[3],bond:p[4],start:p[5],end:p[6],portrait:i,demo:true,lattes:null,social:null}));
export const robots = [
 ['atlas','Atlas','kronos','Seguidor de linha','LEGO EV3','Operacional',['EV3','Sensores de cor','Motores LEGO'],['gabriel','lucas']],
 ['iris','Íris','atena','Navegação autônoma','Arduino','Em desenvolvimento',['Arduino Uno','Ultrassom','Ponte H'],['helena','beatriz']],
 ['argus','Argus','kronos','Exploração e sensores','Arduino','Operacional',['Arduino Mega','Infravermelho','Chassi modular'],['rafael','gabriel']],
 ['aegis','Égide','atena','Resgate em arena','LEGO Spike','Em desenvolvimento',['Spike Prime','Sensor de distância','Garra'],['julia','helena']],
 ['hermes','Hermes','kronos','Transporte de objetos','Arduino','Desmontado',['Servo','Chassi reciclado','Motores DC'],['mateus','lucas']],
 ['metis','Métis','atena','Braço manipulador','Arduino','Operacional',['Microcontrolador','Servomotores','Garra impressa'],['mariana','beatriz']],
 ['orion','Órion','kronos','Plataforma experimental','Materiais reutilizados','Desmontado',['Estrutura reaproveitada','Motores DC','Sensores'],['pedro','rafael']]
].map((r,i)=>({id:r[0],name:r[1],team:r[2],purpose:r[3],platform:r[4],status:r[5],parts:r[6],people:r[7],index:i,demo:true}));
export const projects=[{id:'talos',name:'Talos IA',category:'Inteligência artificial',description:'Um projeto de inteligência artificial desenvolvido pela equipe para o Desafio Liga Jovem. Este espaço reunirá o problema investigado, a solução e o processo de desenvolvimento.',demo:false,people:[],publications:['pitch']},{id:'portal',name:'O nosso ponto de encontro',category:'Design e desenvolvimento web',description:'O portal Kronos e Atena: organização do acervo, identidade visual e acesso às pessoas, aos robôs e aos projetos das equipes.',demo:false,people:[],publications:[]}];
export const publications=[{id:'pitch',title:'Talos IA · Pitch do Desafio Liga Jovem',type:'Vídeo de apresentação',project:'talos',url:'https://www.youtube.com/watch?v=0SkIhD2li0U',videoId:'0SkIhD2li0U'}];
export const campaigns=[
 {id:'oficinas',name:'Oficinas & Semana Acadêmica',category:'Divulgação de atividades',description:'A comunicação das oficinas de robótica, programação, Photoshop e música, e da Semana Acadêmica XV do IFRJ Campus Engenheiro Paulo de Frontin.',cover:'DPBzDsZDqhp'},
 {id:'entrevistas',name:'Conhecendo nossa equipe',category:'Série de entrevistas',description:'Uma série de publicações que apresenta as pessoas da Kronos e o trabalho de cada integrante.',cover:'DOXAFZODhEz'},
 {id:'mobiliza',name:'Mobiliza · Desafio Liga Jovem',category:'Campanha de comunicação',description:'A trajetória da equipe no desafio, a apresentação do campus e a divulgação dos projetos.',cover:'DOOctlcjl-i'},
 {id:'uniformes',name:'Uniformes Kronos',category:'Identidade & divulgação',description:'A publicação oficial de divulgação dos uniformes da equipe e apoio ao projeto.',cover:'DPv0qNTjhjE'}
];
publications.push(...instagramPosts);
projects[0].publications.push(...instagramPosts.filter(p=>p.project==='talos').map(p=>p.id));
projects.push(...campaigns.map(p=>({...p,demo:false,people:[],publications:instagramPosts.filter(post=>post.project===p.id).map(post=>post.id),communication:true})));
export const teamName=t=>t==='atena'?'Atena':'Kronos';
