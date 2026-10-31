(() => {
  const root = document.documentElement;
  // Si algo falla, se quita la clase «js» para que nada quede oculto.
  try {
    init();
  } catch (err) {
    root.classList.remove('js');
    console.error(err);
  }

  function init() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const site = window.NEXUS_SITE || {};

  // Descarga y compra: si el enlace aún no existe, el botón conserva su nombre,
  // se marca «Próximamente» y sigue siendo enfocable, sin llevar a ninguna parte.
  const pending = (a, noteId) => {
    a.removeAttribute('href');
    a.setAttribute('aria-disabled', 'true');
    a.setAttribute('role', 'button');
    a.tabIndex = 0;
    if (noteId) a.setAttribute('aria-describedby', noteId);
    const soon = document.createElement('span');
    soon.className = 'soon';
    soon.textContent = 'Próximamente';
    a.append(soon);
    a.addEventListener('click', (e) => e.preventDefault());
  };
  // Solo se vende con precio visible y un contacto de soporte.
  const canBuy = Boolean(site.purchaseUrl && site.price && site.supportEmail);
  for (const a of document.querySelectorAll('[data-download]')) {
    if (site.downloadUrl) a.href = site.downloadUrl;
    else pending(a, a.nextElementSibling?.id || 'note-hero');
  }
  for (const a of document.querySelectorAll('[data-purchase]')) {
    if (canBuy) a.href = site.purchaseUrl;
    else pending(a, 'note-buy');
  }
  if (!site.downloadUrl) {
    for (const n of document.querySelectorAll('[data-download-note]')) {
      n.textContent = n.hasAttribute('data-signed-note') ? 'Aún no disponible: estamos preparando la primera versión pública.' : `Aún no disponible · ${n.textContent}`;
    }
    // En la barra solo cabe la etiqueta corta.
    const navBtn = document.querySelector('.nav [data-download]');
    navBtn.setAttribute('aria-label', 'Descargar, próximamente');
    navBtn.firstChild.textContent = 'Descargar';
  }
  document.querySelector('[data-price]').textContent = site.price ? `${site.price} · pago único` : 'Pago único';
  document.getElementById('note-buy').textContent = canBuy ? '' : site.price ? 'Compra disponible próximamente.' : 'El precio se anunciará con la primera versión pública.';
  if (site.supportEmail) {
    const p = document.querySelector('[data-support]');
    const a = document.createElement('a');
    a.href = `mailto:${site.supportEmail}`;
    a.textContent = site.supportEmail;
    p.replaceChildren('Soporte: ', a);
  }

  // Barra con borde al bajar.
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Arranque de los monitores (momento firma): centro, izquierda, derecha.
  const stage = document.querySelector('.stage');
  const order = ['.m-center', '.m-left', '.m-right'];
  const boot = () => {
    stage.classList.add('booted');
    order.forEach((sel, i) => {
      const m = stage.querySelector(sel);
      const at = reduce ? 0 : 250 + i * 420;
      setTimeout(() => m.classList.add('on'), at);
      setTimeout(() => m.classList.add('done'), at + 1000);
    });
  };
  const centerImg = stage.querySelector('.m-center img');
  if (centerImg.complete) boot();
  else {
    centerImg.addEventListener('load', boot, { once: true });
    centerImg.addEventListener('error', boot, { once: true });
    setTimeout(boot, 2500);
  }

  // Ligero paralaje de los monitores con el ratón (solo con puntero fino).
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    stage.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        stage.style.setProperty('--tilt', `${18 - dx * 8}deg`);
      });
    });
    stage.addEventListener('pointerleave', () => stage.style.setProperty('--tilt', '18deg'));
  }

  // Apariciones y contadores al entrar en pantalla.
  const fmt = (v, d) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
  const count = (el) => {
    const target = Number(el.dataset.count);
    const d = Number(el.dataset.decimals || 0);
    if (reduce || target === 0) return void (el.textContent = fmt(target, d));
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 900);
      el.textContent = fmt(target * (1 - Math.pow(1 - k, 3)), d);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        for (const n of e.target.querySelectorAll('[data-count]')) count(n);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );
  for (const el of document.querySelectorAll('.reveal, .pins')) io.observe(el);

  // Selector de efectos: cambia la captura y la medición.
  const tabs = [...document.querySelectorAll('.fx-tabs [role=tab]')];
  const img = document.querySelector('[data-fx-img]');
  const desc = document.querySelector('[data-fx-desc]');
  const cpu = document.querySelector('[data-fx-cpu]');
  for (const t of tabs) new Image().src = `assets/shots/centro-${t.dataset.fx}.jpg`;
  const panel = document.getElementById('fx-panel');
  const select = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    }
    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
    img.classList.add('swap');
    setTimeout(() => {
      img.src = `assets/shots/centro-${tab.dataset.fx}.jpg`;
      img.alt = `Centro de control con efectos ${tab.textContent}`;
      img.classList.remove('swap');
    }, reduce ? 0 : 150);
    desc.textContent = tab.dataset.desc;
    cpu.textContent = `${tab.dataset.cpu} %`;
  };
  tabs.forEach((t, i) => {
    t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const n = tabs.length;
      const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });
  }
})();
