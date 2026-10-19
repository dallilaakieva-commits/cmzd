const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();

  // Мобильное меню
  const menuBtn = $('.menu-btn');
  const nav = $('.nav');
  menuBtn?.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    if (nav.classList.contains('mobile-open')) {
      nav.style.display = 'flex'; nav.style.position = 'absolute'; nav.style.top = '66px'; nav.style.left = '14px'; nav.style.right = '14px';
      nav.style.flexDirection = 'column'; nav.style.padding = '18px'; nav.style.background = '#fff'; nav.style.borderRadius = '18px'; nav.style.boxShadow = '0 20px 50px rgba(19,49,95,.15)';
    } else { nav.removeAttribute('style'); }
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => { if (window.innerWidth <= 1000) { nav.classList.remove('mobile-open'); nav.removeAttribute('style'); }}));

  // Барсик: нажми — он «оживает» и подсказывает, куда идти
  const runner = $('#barsikRunner'), bubble = $('#barsikBubble');
  const tips = [
    ['Привет! Я Барсик 🐆', 'Нажми «Чем мы можем помочь», чтобы выбрать нужное направление.'],
    ['Ищешь врача?', 'Ниже есть команда специалистов — заведующий отмечен золотой рамкой.'],
    ['Ты здесь впервые?', 'Открой «Частые вопросы»: там есть телефон, портал и список документов.'],
    ['Для родителей 🎥', 'В разделе «Родителям» будут полезные видеоролики специалистов.']
  ];
  let tip = 0;
  const showTip = () => { bubble.querySelector('strong').textContent = tips[tip][0]; bubble.querySelector('span').textContent = tips[tip][1]; bubble.classList.add('show'); runner.animate([{transform:'translateX(-50%) rotate(0deg)'},{transform:'translateX(-50%) rotate(-5deg)'},{transform:'translateX(-50%) rotate(5deg)'},{transform:'translateX(-50%) rotate(0deg)'}],{duration:550,easing:'ease-out'}); tip = (tip + 1) % tips.length; };
  runner?.addEventListener('click', showTip);
  setTimeout(showTip, 700);

  // Галерея
  const track = $('#galleryTrack'), dots = $('#galleryDots');
  let slide = 0; const count = $$('.gallery-slide', track).length;
  for(let i=0;i<count;i++){ const b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label',`Фото ${i+1}`); b.addEventListener('click',()=>go(i)); dots.appendChild(b); }
  function go(i){ slide=(i+count)%count; track.style.transform=`translateX(-${slide*100}%)`; $$('.gallery-dots button').forEach((b,n)=>b.classList.toggle('active',n===slide)); }
  $('.gallery-arrow.prev')?.addEventListener('click',()=>go(slide-1));
  $('.gallery-arrow.next')?.addEventListener('click',()=>go(slide+1));
  go(0);
  let galleryTimer=setInterval(()=>go(slide+1),5000);
  $('.gallery')?.addEventListener('mouseenter',()=>clearInterval(galleryTimer));
  $('.gallery')?.addEventListener('mouseleave',()=>galleryTimer=setInterval(()=>go(slide+1),5000));

  // Видео-заглушки: пока нет ссылок, показываем понятное сообщение
  const toast = $('#toast'); let toastTimer;
  function notify(text){ toast.textContent=text; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),3800); }
  $$('.video-card[data-video]').forEach(card=>card.addEventListener('click',()=>notify('Здесь можно вставить ссылку на видео YouTube или RuTube — я подготовила место для ролика.')));
  $('#videoInfo')?.addEventListener('click',()=>notify('Чтобы добавить видео: замените карточку в index.html на ссылку или iframe YouTube / RuTube.'));
  $('#addVideo')?.addEventListener('click',()=>notify('Скопируйте любую карточку video-card в index.html и поменяйте название, описание и ссылку на ролик.'));

  // Плавное появление блоков
  const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
  $$('.service-card,.person-card,.about-features article,.video-card,.faq-list details').forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(18px)';el.style.transition=`opacity .55s ease ${Math.min(i*35,300)}ms, transform .55s ease ${Math.min(i*35,300)}ms`; observer.observe(el)});
  const style=document.createElement('style'); style.textContent='.visible{opacity:1!important;transform:none!important}'; document.head.appendChild(style);

  // Маленький интерактивный курсор на десктопе
  const dot=$('.cursor-dot'); window.addEventListener('pointermove',e=>{if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';}});
});
