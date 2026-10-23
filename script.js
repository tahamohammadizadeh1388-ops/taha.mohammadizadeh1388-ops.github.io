(function () {
  var root = document.documentElement;
  var calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- تم ---------- */
  try {
    var s = localStorage.getItem("theme");
    if (s === "light" || s === "dark") root.setAttribute("data-theme", s);
  } catch (e) {}
  function css(v) {
    return getComputedStyle(root).getPropertyValue(v).trim();
  }
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  }
  var repaint = function () {};
  document.getElementById("theme").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    repaint();
  });
  matchMedia("(prefers-color-scheme:dark)").addEventListener(
    "change",
    function () {
      setTimeout(repaint, 0);
    },
  );

  /* ---------- زبان ---------- */
  var T = {
    fa: {
      title: "محمد طاها محمدی‌زاده",
      brand: "طاها",
      mark: "ط",
      photoAlt: "عکس محمد طاها محمدی‌زاده",
      en: "Mohammad Taha Mohammadizadeh",
      h1: "محمد طاها<br>محمدی‌زاده",
      lead: "توسعه‌دهنده وب. صفحه‌هایی می‌سازم که تمیز و سریع‌اند و گاهی هم سه‌بعدی.",
      btnTg: "پیام در تلگرام",
      btnLi: "پروفایل لینکدین",
      skillsH: "مهارت‌ها",
      skillsP: "ابزارهایی که هر روز باهاشون کار می‌کنم؛ از ساختار و ظاهر تا تعامل و سه‌بعدی. سطح هر کدوم صادقانه نشان داده شده.",
      toolsH: "ابزار و اصول کاری",
      lvHigh: "تسلط بالا",
      lvMid: "تسلط خوب",
      lvGrow: "در حال رشد",
      sHtml: "ساختار معنادار و قابل‌دسترس؛ تگ‌های درست، فرم‌های قابل‌استفاده و پایه‌ی سئو.",
      sCss: "چیدمان ریسپانسیو با Grid و Flexbox، انیمیشن‌های روان و تم روشن و تاریک با متغیرهای CSS.",
      sJs: "منطق و تعامل صفحه: مدیریت رویدادها، کار با DOM، ذخیره‌ی تنظیمات و دریافت داده.",
      sThree: "صحنه‌های سه‌بعدی در مرورگر: نورپردازی، متریال، انیمیشن و واکنش به ماوس و لمس.",
      aboutH: "درباره من",
      aboutP:
        "حدود یک سال است که وب می‌سازم. از ساختار صفحه تا جزئیات ظاهر و انیمیشن را خودم پیش می‌برم و دوست دارم کارهایم ساده، سریع و دیدنی باشند.",
      contactH: "ارتباط با من",
      tg: "تلگرام",
      tg2: "Telegram",
      li: "لینکدین",
      li2: "LinkedIn",
      foot: "© محمد طاها محمدی‌زاده",
      langBtn: "EN",
      langAria: "تغییر زبان به انگلیسی",
      themeAria: "تغییر تم روشن و تاریک",
      stageTip: "روی شکل کلیک کن",
      nSkills: "مهارت‌ها",
      nAbout: "درباره من",
      nContact: "ارتباط",
    },
    en: {
      title: "Mohammad Taha Mohammadizadeh",
      brand: "Taha",
      mark: "T",
      photoAlt: "Photo of Mohammad Taha Mohammadizadeh",
      en: "محمد طاها محمدی‌زاده",
      h1: "Mohammad Taha<br>Mohammadizadeh",
      lead: "Web developer. I build pages that are clean, fast, and sometimes three-dimensional.",
      btnTg: "Message on Telegram",
      btnLi: "LinkedIn profile",
      skillsH: "Skills",
      skillsP: "The tools I work with daily, from structure and styling to interaction and 3D. Levels are shown honestly.",
      toolsH: "Tools & practices",
      lvHigh: "Strong",
      lvMid: "Solid",
      lvGrow: "Growing",
      sHtml: "Semantic, accessible structure: proper tags, usable forms and SEO basics.",
      sCss: "Responsive layouts with Grid and Flexbox, smooth animation, and light/dark theming with CSS variables.",
      sJs: "Page logic and interaction: event handling, DOM work, saved preferences and data fetching.",
      sThree: "3D scenes in the browser: lighting, materials, animation, and mouse/touch response.",
      aboutH: "About",
      aboutP:
        "I’ve been building for the web for about a year. From page structure to visual detail and animation, I handle it all, and I like my work simple, fast, and good to look at.",
      contactH: "Contact",
      tg: "Telegram",
      tg2: "تلگرام",
      li: "LinkedIn",
      li2: "لینکدین",
      foot: "© Mohammad Taha Mohammadizadeh",
      langBtn: "فا",
      langAria: "Switch language to Persian",
      themeAria: "Toggle light and dark theme",
      stageTip: "Click the shape",
      nSkills: "Skills",
      nAbout: "About",
      nContact: "Contact",
    },
  };
  var lang = "fa";
  try {
    var sl = localStorage.getItem("lang");
    if (sl === "fa" || sl === "en") lang = sl;
  } catch (e) {}
  var enEl = document.getElementById("en");
  function applyLang() {
    var d = T[lang];
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
    document.title = d.title;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.innerHTML = d[el.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.title = d[el.dataset.i18nTitle];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.alt = d[el.dataset.i18nAlt];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", d[el.dataset.i18nAria]);
    });
    if (enEl) {
      enEl.textContent = d.en;
      enEl.dir = lang === "fa" ? "ltr" : "rtl";
    }
  }
  applyLang();
  document.getElementById("lang").addEventListener("click", function () {
    lang = lang === "fa" ? "en" : "fa";
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    applyLang();
  });

  /* ---------- عکس: اگه photo.jpg نبود، جای‌نگهدار نشون بده ---------- */
  (function () {
    var fig = document.getElementById("photo"),
      img = fig && fig.querySelector("img");
    if (!img) return;
    function miss() {
      fig.classList.add("empty");
    }
    img.addEventListener("error", miss);
    if (img.complete && img.naturalWidth === 0) miss();
  })();

  /* ---------- نور دنبال‌کننده ماوس ---------- */
  addEventListener("pointermove", function (e) {
    root.style.setProperty("--mx", e.clientX + "px");
    root.style.setProperty("--my", e.clientY + "px");
  });

  /* ---------- افکت تایپ اسم انگلیسی (فقط یک بار، موقع لود) ---------- */
  var en = enEl;
  if (en && !calm && lang === "fa") {
    var final = T.fa.en,
      chars = "abcdefghijklmnopqrstuvwxyz<>/{}=;",
      t0 = performance.now(),
      dur = 1400;
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1),
        out = "";
      for (var i = 0; i < final.length; i++) {
        var c = final[i];
        out +=
          c === " " || i < final.length * p
            ? c
            : chars[Math.floor(Math.random() * chars.length)];
      }
      en.textContent = out;
      if (p < 1) requestAnimationFrame(tick);
      else en.textContent = final;
    })(t0);
  }

  /* ---------- نوار پیشرفت اسکرول، هدر شیشه‌ای، لینک فعال ---------- */
  var bar = document.getElementById("bar"),
    hd = document.querySelector("header"),
    navA = document.querySelectorAll(".nav a");
  function onScroll() {
    var h = root.scrollHeight - innerHeight;
    bar.style.setProperty("--p", h > 0 ? Math.min(scrollY / h, 1) : 0);
    hd.classList.toggle("stuck", scrollY > 10);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting)
            navA.forEach(function (a) {
              a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id);
            });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("#skills,#about,#contact").forEach(function (s) {
      io.observe(s);
    });
  }

  /* ---------- پر شدن نوار مهارت‌ها موقع دیده شدن ---------- */
  var sk = document.querySelectorAll(".skill");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            so.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    sk.forEach(function (el, i) {
      el.style.setProperty("--d", i * 120 + "ms");
      so.observe(el);
    });
  } else sk.forEach(function (el) { el.classList.add("in"); });

  /* ---------- Three.js ---------- */
  var box = document.getElementById("stage");
  if (!window.THREE || !box) return;

  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.z = 7.0;
  var r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(r.domElement);

  var group = new THREE.Group();
  scene.add(group);

  // نورپردازی
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  var key = new THREE.DirectionalLight(0xffffff, 1.0);
  key.position.set(3, 4, 5);
  scene.add(key);
  var lightA = new THREE.PointLight(0xffffff, 1.6, 14);
  lightA.position.set(-3, -1.5, 3);
  scene.add(lightA);
  var lightB = new THREE.PointLight(0xffffff, 1.4, 14);
  lightB.position.set(3, -3, -2);
  scene.add(lightB);

  // گره اصلی: صیقلی، با گرادیان رنگ در طول مسیر
  var TS = 280,
    RS = 40;
  var kg = new THREE.TorusKnotGeometry(1, 0.27, TS, RS, 2, 3);
  var kcol = new Float32Array(kg.attributes.position.count * 3);
  kg.setAttribute("color", new THREE.BufferAttribute(kcol, 3));
  var knot = new THREE.Mesh(
    kg,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.5,
      roughness: 0.26,
    }),
  );
  group.add(knot);

  // حلقه‌های مداری با ماهواره
  function orbit(rad, tiltX, tiltY, speed) {
    var o = new THREE.Group();
    o.rotation.x = tiltX;
    o.rotation.y = tiltY;
    var ringM = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    o.add(new THREE.Mesh(new THREE.TorusGeometry(rad, 0.007, 8, 200), ringM));
    var arm = new THREE.Group();
    o.add(arm);
    var satM = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sat = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 20), satM);
    sat.position.x = rad;
    arm.add(sat);
    var halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      }),
    );
    halo.position.x = rad;
    arm.add(halo);
    group.add(o);
    return { arm: arm, speed: speed, mats: [ringM, satM, halo.material] };
  }
  var orbA = orbit(1.8, 1.15, 0.2, 0.012),
    orbB = orbit(2.1, -0.8, 0.5, -0.008);

  // درخشش پشت شکل
  var gc = document.createElement("canvas");
  gc.width = gc.height = 128;
  var gx = gc.getContext("2d"),
    gr = gx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.4, "rgba(255,255,255,.35)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  gx.fillStyle = gr;
  gx.fillRect(0, 0, 128, 128);
  var glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(gc),
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    }),
  );
  glow.scale.set(7.4, 7.4, 1);
  glow.position.z = -1.5;
  scene.add(glow);

  // دو ابر ذرات با دو رنگ
  function cloud(n, minR, maxR, size) {
    var p = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var rad = minR + Math.random() * (maxR - minR),
        th = Math.random() * Math.PI * 2,
        ph = Math.acos(2 * Math.random() - 1);
      p[i * 3] = rad * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      p[i * 3 + 2] = rad * Math.cos(ph);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    var pts = new THREE.Points(
      g,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: size,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    );
    scene.add(pts);
    return pts;
  }
  var dustA = cloud(650, 2.3, 4.2, 0.026),
    dustB = cloud(450, 2.6, 4.6, 0.036);

  var cA = new THREE.Color(),
    cB = new THREE.Color(),
    cT = new THREE.Color();
  function paint() {
    cA.set(css("--accent"));
    cB.set(css("--accent2"));
    var col = kg.attributes.color,
      per = RS + 1;
    for (var i = 0; i < col.count; i++) {
      var u = Math.floor(i / per) / TS;
      cT.copy(cA).lerp(cB, 0.5 + 0.5 * Math.sin(u * Math.PI * 2 * 3));
      col.setXYZ(i, cT.r, cT.g, cT.b);
    }
    col.needsUpdate = true;
    lightA.color.copy(cA);
    lightB.color.copy(cB);
    glow.material.color.copy(cA);
    dustA.material.color.copy(cA);
    dustB.material.color.copy(cB);
    orbA.mats.forEach(function (m) {
      m.color.copy(cB);
    });
    orbB.mats.forEach(function (m) {
      m.color.copy(cA);
    });
  }
  paint();
  repaint = paint;

  function size() {
    var w = box.clientWidth,
      h = box.clientHeight;
    r.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  size();
  addEventListener("resize", size);

  var tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    spin = 0,
    lastY = scrollY,
    t = 0;
  addEventListener("pointermove", function (e) {
    tx = (e.clientX / innerWidth - 0.5) * 1.2;
    ty = (e.clientY / innerHeight - 0.5) * 1.2;
  });
  // کلیک یا لمس روی شکل: یه چرخش اضافه که آروم می‌شه
  box.addEventListener("pointerdown", function () {
    spin = 0.35;
  });
  // اسکرول سرعت چرخش رو تغییر می‌ده
  addEventListener(
    "scroll",
    function () {
      spin += Math.min(Math.abs(scrollY - lastY) * 0.0006, 0.08);
      lastY = scrollY;
    },
    { passive: true },
  );

  function loop() {
    t += 0.01;
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    spin *= 0.94;
    if (!calm) {
      knot.rotation.y += 0.004 + spin;
      dustA.rotation.y -= 0.0012 + spin * 0.3;
      dustB.rotation.y += 0.0008 + spin * 0.2;
      dustB.rotation.x += 0.0004;
      orbA.arm.rotation.z += orbA.speed + spin * 0.2;
      orbB.arm.rotation.z += orbB.speed - spin * 0.2;
      var s = 1 + Math.sin(t * 1.4) * 0.025;
      knot.scale.setScalar(s);
      glow.material.opacity = 0.26 + Math.sin(t * 1.4) * 0.05;
      lightA.position.x = -3 + Math.sin(t) * 1.2;
      lightB.position.y = -3 + Math.cos(t * 0.8) * 1.2;
    }
    group.rotation.x = cy;
    group.rotation.z = -cx * 0.4;
    dustA.rotation.x = cy * 0.5;
    r.render(scene, cam);
    requestAnimationFrame(loop);
  }
  loop();
})();