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

  /* ---------- نور دنبال‌کننده ماوس ---------- */
  addEventListener('pointermove',function(e){
    root.style.setProperty('--mx',e.clientX+'px');
    root.style.setProperty('--my',e.clientY+'px');
  });

  /* ---------- افکت تایپ اسم انگلیسی (فقط یک بار، موقع لود) ---------- */
  var en=document.getElementById('en');
  if(en && !calm){
    var final=en.dataset.text, chars='abcdefghijklmnopqrstuvwxyz<>/{}=;', t0=performance.now(), dur=1400;
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

  // هسته داخلی کوچک‌تر در جهت مخالف
  var core=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,1),
    new THREE.MeshBasicMaterial({color:css('--accent2'),wireframe:true,transparent:true,opacity:.9}));
  group.add(core);

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
    core.material.color.set(css('--accent2'));
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
      core.rotation.x-=.012; core.rotation.y+=.018;
      dust.rotation.y-=.0012+spin*.3;
      var k=1+Math.sin(t*1.5)*.025; core.scale.setScalar(k);
    }
    group.rotation.x=cy; group.rotation.z=-cx*.4;
    dust.rotation.x=cy*.5;
    r.render(scene,cam);
    requestAnimationFrame(loop);
  }
  loop();
})();
