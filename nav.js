/* ============================================================
   nav.js — shared header/menu for the CIRCUITO site.
   Edit this file once; the change applies to every page on this site.
   Each page sets <body data-page="..."> to highlight the right item:
   "inicio", "contacto"
   ============================================================ */
(function () {
  var currentPage = document.body.getAttribute('data-page') || '';

  var items = [
    { id: 'inicio', href: 'index.html', label: 'Inicio' },
    { id: 'contacto', href: 'contacto.html', label: 'Contacto' }
  ];

  var linksHTML = items.map(function (item) {
    var activeAttr = (item.id === currentPage) ? ' class="active"' : '';
    return '<li><a href="' + item.href + '"' + activeAttr + '>' + item.label + '</a></li>';
  }).join('');

  var facebookIcon =
    '<a class="social-link" href="https://www.facebook.com/crelectronicasa" target="_blank" rel="noopener" aria-label="Facebook de Circuito">' +
      '<svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>' +
    '</a>';

  var html =
    '<header>' +
      '<nav class="wrap">' +
        '<a href="index.html" class="logo"><img src="logo-mark-full.png" alt="Circuito" class="logo-img"></a>' +
        '<div class="nav-right">' +
          facebookIcon +
          '<button type="button" class="menu-toggle" aria-label="Abrir men\u00FA" aria-expanded="false" aria-controls="site-navlinks">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<ul class="navlinks" id="site-navlinks">' + linksHTML + '</ul>' +
        '</div>' +
      '</nav>' +
    '</header>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  var headerEl = holder.firstElementChild;

  var thisScript = document.currentScript;
  thisScript.parentNode.insertBefore(headerEl, thisScript);

  var toggleBtn = headerEl.querySelector('.menu-toggle');
  var navlinksEl = headerEl.querySelector('.navlinks');

  function setMenuOpen(isOpen){
    navlinksEl.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar men\u00FA' : 'Abrir men\u00FA');
  }

  toggleBtn.addEventListener('click', function(){
    setMenuOpen(!navlinksEl.classList.contains('open'));
  });

  navlinksEl.addEventListener('click', function(e){
    if (e.target.tagName === 'A') {
      setMenuOpen(false);
    }
  });
})();
