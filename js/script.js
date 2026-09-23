// Si la imagen local (img/xx.jpg) todavía no existe, se usa una foto de
// stock libre de derechos (Picsum) como referencia visual temporal, con
// un filtro CSS que la lleva a la paleta fría del sitio.
// En cuanto coloques tu propia foto en /img con el nombre correcto, la pisa
// automáticamente y desaparece la etiqueta "Imagen de referencia".
function aplicarFallback(selector, size) {
  document.querySelectorAll(selector).forEach(item => {
    const url = item.style.backgroundImage.slice(5, -2); // extrae la url()
    const seed = item.dataset.seed || Math.random();
    const test = new Image();
    test.onerror = () => {
      item.style.backgroundImage = `url('https://picsum.photos/seed/dexter${seed}/${size}')`;
      item.classList.add('img-stock');
    };
    test.src = url;
  });
}

// El logo es una etiqueta <img> (no un fondo), así que se resuelve al revés:
// se intenta cargar la imagen real y, si existe, reemplaza al texto "Dexter".
function cargarLogo() {
  const img = document.querySelector('.brand-logo');
  const texto = document.querySelector('.brand-text');
  if (!img || !texto) return;
  const test = new Image();
  test.onload = () => {
    img.src = img.dataset.src;
    img.style.display = 'inline-block';
    texto.style.display = 'none';
  };
  test.src = img.dataset.src;
}

aplicarFallback('.photo-item', '800/600');
aplicarFallback('.character-photo', '600/800');
aplicarFallback('.gallery-item', '500/700');
aplicarFallback('.intro-image', '900/700');
cargarLogo();

// Menú mobile: el botón hamburguesa abre/cierra la navegación completa.
function iniciarMenuMobile() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', abierto);
  });
}

// Submenú de "Temporadas": funciona a clic (sirve tanto para mouse como para
// pantallas táctiles) y se cierra solo al tocar afuera o al elegir una opción.
function iniciarSubmenus() {
  document.querySelectorAll('.has-submenu').forEach(item => {
    const btn = item.querySelector('.submenu-toggle');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const abierto = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', abierto);
    });

    item.querySelectorAll('.submenu a').forEach(link => {
      link.addEventListener('click', () => {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-submenu.open').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-submenu.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

iniciarMenuMobile();
iniciarSubmenus();
