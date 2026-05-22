/* enough.js — scripts compartidos entre todas las páginas */

// Nav toggle (hamburger para móvil)
(function () {
  var btn = document.querySelector('.nav-toggle');
  var ul  = document.querySelector('.site-nav ul');
  if (!btn || !ul) return;
  btn.addEventListener('click', function () {
    var open = ul.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  ul.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      ul.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}());

// Reveal animation (.reveal → .in al entrar al viewport)
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.08 });
  reveals.forEach(function (el) { obs.observe(el); });
}());

// Smooth scroll para links internos (#ancla)
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
}());
