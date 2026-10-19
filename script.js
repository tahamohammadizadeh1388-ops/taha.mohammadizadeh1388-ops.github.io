(function(){
  var root=document.documentElement;
  var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- تم ---------- */
  try{var s=localStorage.getItem('theme'); if(s==='light'||s==='dark') root.setAttribute('data-theme',s);}catch(e){}
  function css(v){return getComputedStyle(root).getPropertyValue(v).trim();}
  function isDark(){var t=root.getAttribute('data-theme'); return t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches;}
  var repaint=function(){};
  document.getElementById('theme').addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
    repaint();
  });
  matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(){setTimeout(repaint,0)});


  /* ---------- زبان ---------- */
  var T={
    fa:{title:'محمد طاها محمدی‌زاده',brand:'طاها',en:'Mohammad Taha Mohammadizadeh',h1:'محمد طاها<br>محمدی‌زاده',
      lead:'توسعه‌دهنده وب. صفحه‌هایی می‌سازم که تمیز و سریع‌اند و گاهی هم سه‌بعدی.',
      btnTg:'پیام در تلگرام',btnLi:'پروفایل لینکدین',skillsH:'مهارت‌ها',sHtml:'ساختار معنادار و قابل‌دسترس',
      sCss:'چیدمان ریسپانسیو، انیمیشن و تم',sJs:'تعامل و منطق صفحه',sThree:'صحنه‌های سه‌بعدی در مرورگر',
      aboutH:'درباره من',aboutP:'حدود یک سال است که وب می‌سازم. از ساختار صفحه تا جزئیات ظاهر و انیمیشن را خودم پیش می‌برم و دوست دارم کارهایم ساده، سریع و دیدنی باشند.',
      contactH:'ارتباط با من',tg:'تلگرام',tg2:'Telegram',li:'لینکدین',li2:'LinkedIn',foot:'© محمد طاها محمدی‌زاده',
      langBtn:'EN',langAria:'تغییر زبان به انگلیسی',themeAria:'تغییر تم روشن و تاریک',stageTip:'روی شکل کلیک کن'},
    en:{title:'Mohammad Taha Mohammadizadeh',brand:'Taha',en:'محمد طاها محمدی‌زاده',h1:'Mohammad Taha<br>Mohammadizadeh',
      lead:'Web developer. I build pages that are clean, fast, and sometimes three-dimensional.',
      btnTg:'Message on Telegram',btnLi:'LinkedIn profile',skillsH:'Skills',sHtml:'Semantic, accessible structure',
      sCss:'Responsive layout, animation and theming',sJs:'Interaction and page logic',sThree:'3D scenes in the browser',
      aboutH:'About',aboutP:'I’ve been building for the web for about a year. From page structure to visual detail and animation, I handle it all, and I like my work simple, fast, and good to look at.',
      contactH:'Contact',tg:'Telegram',tg2:'تلگرام',li:'LinkedIn',li2:'لینکدین',foot:'© Mohammad Taha Mohammadizadeh',
      langBtn:'فا',langAria:'Switch language to Persian',themeAria:'Toggle light and dark theme',stageTip:'Click the shape'}
  };
  var lang='fa';
  try{var sl=localStorage.getItem('lang'); if(sl==='fa'||sl==='en') lang=sl;}catch(e){}
  var enEl=document.getElementById('en');
  function applyLang(){
    var d=T[lang];
    root.lang=lang; root.dir=lang==='fa'?'rtl':'ltr'; document.title=d.title;
    document.querySelectorAll('[data-i18n]').forEach(function(el){el.innerHTML=d[el.dataset.i18n];});
    document.querySelectorAll('[data-i18n-title]').forEach(function(el){el.title=d[el.dataset.i18nTitle];});
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){el.setAttribute('aria-label',d[el.dataset.i18nAria]);});
    if(enEl){enEl.textContent=d.en; enEl.dir=lang==='fa'?'ltr':'rtl';}
  }
  applyLang();
  document.getElementById('lang').addEventListener('click',function(){
    lang=lang==='fa'?'en':'fa';
    try{localStorage.setItem('lang',lang);}catch(e){}
    applyLang();
  });

  /* ---------- نور دنبال‌کننده ماوس ---------- */
  addEventListener('pointermove',function(e){
    root.style.setProperty('--mx',e.clientX+'px');
    root.style.setProperty('--my',e.clientY+'px');
  });

  /* ---------- افکت تایپ اسم انگلیسی (فقط یک بار، موقع لود) ---------- */
  var en=enEl;
  if(en && !calm && lang==='fa'){
    var final=T.fa.en, chars='abcdefghijklmnopqrstuvwxyz<>/{}=;', t0=performance.now(), dur=1400;
    (function tick(now){
      var p=Math.min((now-t0)/dur,1), out='';
      for(var i=0;i<final.length;i++){
        var c=final[i];
        out+= (c===' '||i<final.length*p) ? c : chars[Math.floor(Math.random()*chars.length)];
      }
      en.textContent=out;
      if(p<1) requestAnimationFrame(tick); else en.textContent=final;
    })(t0);
  }

  /* ---------- Three.js ---------- */
  var box=document.getElementById('stage');
  if(!window.THREE||!box) return;

  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(45,1,.1,100); cam.position.z=5;
  var r=new THREE.WebGLRenderer({antialias:true,alpha:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  box.appendChild(r.domElement);

  var group=new THREE.Group(); scene.add(group);

  // گره سیمی
  var knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1,.3,200,24,2,3),
    new THREE.MeshBasicMaterial({color:css('--accent'),wireframe:true,transparent:true,opacity:.7}));
  group.add(knot);

  // ابر ذرات
  var N=1100, pos=new Float32Array(N*3);
  for(var i=0;i<N;i++){
    var rad=2+Math.random()*1.8, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
    pos[i*3]=rad*Math.sin(ph)*Math.cos(th); pos[i*3+1]=rad*Math.sin(ph)*Math.sin(th); pos[i*3+2]=rad*Math.cos(ph);
  }
  var pg=new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var dust=new THREE.Points(pg,new THREE.PointsMaterial({color:css('--accent'),size:.022,transparent:true,opacity:.65}));
  scene.add(dust);

  repaint=function(){
    knot.material.color.set(css('--accent'));
    dust.material.color.set(css('--accent'));
  };

  function size(){var w=box.clientWidth,h=box.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
  size(); addEventListener('resize',size);

  var tx=0,ty=0,cx=0,cy=0, spin=0, lastY=scrollY, t=0;
  addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5)*1.2; ty=(e.clientY/innerHeight-.5)*1.2;});
  // کلیک یا لمس روی شکل: یه چرخش اضافه که آروم می‌شه
  box.addEventListener('pointerdown',function(){spin=.35;});
  // اسکرول سرعت چرخش رو تغییر می‌ده
  addEventListener('scroll',function(){spin+=Math.min(Math.abs(scrollY-lastY)*.0006,.08); lastY=scrollY;},{passive:true});

  function loop(){
    t+=.01;
    cx+=(tx-cx)*.06; cy+=(ty-cy)*.06;
    spin*=.94;
    if(!calm){
      group.rotation.y+=.004+spin;
      dust.rotation.y-=.0012+spin*.3;
    }
    group.rotation.x=cy; group.rotation.z=-cx*.4;
    dust.rotation.x=cy*.5;
    r.render(scene,cam);
    requestAnimationFrame(loop);
  }
  loop();
})();