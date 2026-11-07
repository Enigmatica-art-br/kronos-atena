import {renderView,directoryResults,filteredPosts} from './views.js';
const main=document.querySelector('main');
const menu=document.querySelector('#menu');
const header=document.querySelector('header');
let observers=[];
function initShelves(scope=main){
 scope.querySelectorAll('[data-shelf]').forEach(shelf=>{
  const track=shelf.querySelector('.shelf-track'),prev=shelf.querySelector('[data-prev]'),next=shelf.querySelector('[data-next]'),label=shelf.querySelector('[data-page]');
  const items=[...track.children];let queued=null;
  const offsets=()=>items.map(item=>item.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft);
  const update=()=>{
   const max=Math.max(0,track.scrollWidth-track.clientWidth),left=track.scrollLeft,positions=offsets();
   prev.disabled=left<=2;next.disabled=left>=max-2;
   const start=Math.max(0,positions.findIndex((x,i)=>x+items[i].getBoundingClientRect().width>left+2));
   const end=positions.reduce((n,x,i)=>x<left+track.clientWidth-2?i+1:n,0);
   label.textContent=items.length?(start+1)+'–'+Math.max(start+1,end)+' / '+items.length:'';
   shelf.classList.toggle('can-scroll',max>2);
  };
  const move=direction=>{
   const positions=offsets(),left=queued??track.scrollLeft,max=track.scrollWidth-track.clientWidth;
   const target=direction>0?(positions.find(x=>x>left+4)??max):([...positions].reverse().find(x=>x<left-4)??0);
   queued=Math.max(0,Math.min(max,target));track.scrollTo({left:queued,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});track.addEventListener('wheel',()=>queued=null,{passive:true});track.addEventListener('pointerdown',()=>queued=null,{passive:true});
  track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
  const observer=new ResizeObserver(update);observer.observe(track);observers.push(observer);requestAnimationFrame(update);
 });
}
function initForms(route){
 const form=main.querySelector('#filters');
 if(form){const update=()=>{const result=directoryResults(route,Object.fromEntries(new FormData(form)));main.querySelector('#results').innerHTML=result.html;main.querySelector('#result-count').textContent=result.count+' '+(route==='pessoas'?'integrantes':'robôs')};form.addEventListener('input',update);form.addEventListener('change',update);form.addEventListener('reset',()=>setTimeout(update,0));update()}
 const posts=main.querySelector('#post-filters');if(posts)posts.addEventListener('change',()=>{main.querySelector('#post-results').innerHTML=filteredPosts(new FormData(posts).get('project'))});
}
function render(){
 observers.forEach(o=>o.disconnect());observers=[];
 const [route='',id]=location.hash.replace(/^#\/?/,'').split('/');
 main.innerHTML=renderView(route,id);
 document.title=(main.querySelector('h1')?.textContent.replace(/\s+/g,' ').trim()||'Kronos')+' — Kronos & Atena';
 header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');
 document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#/'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 initForms(route);initShelves();window.scrollTo({top:0,left:0,behavior:'instant'});if(location.hash)main.focus({preventScroll:true});
}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#/"]');if(!a||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
 e.preventDefault();if(location.hash!==a.hash)history.pushState(null,'',a.hash);render();
});
menu.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('menu-open')){header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.focus()}});
main.addEventListener('click',e=>{
 const b=e.target.closest('[data-video]');if(!b)return;
 const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+b.dataset.video+'?autoplay=1';frame.title='Talos IA — Pitch do Desafio Liga Jovem';frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;b.closest('.video-stage').replaceChildren(frame);frame.focus();
});
addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return}render()});
render();
