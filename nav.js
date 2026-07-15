/* ============================================================
   nav.js — shared header/menu, injected into every page.
   Edit this file once; the change applies everywhere.

   Each page sets <body data-page="..."> to say which nav item
   should be highlighted. Recognized values:
   "inicio", "reparacion", "iot", "pcb", "firmware", "contacto"
   ============================================================ */
(function () {
  var currentPage = document.body.getAttribute('data-page') || '';

  var items = [
    { id: 'inicio', href: 'index.html', label: 'Inicio' },
    { id: 'reparacion', href: 'reparacion.html', label: 'Reparación' },
    { id: 'iot', href: 'diseno-iot-y-iiot.html', label: 'Diseño IoT\\IIoT' },
    { id: 'pcb', href: 'diseno-circuitos-y-placas-pcb.html#pcb-circuitos', label: 'Diseño PCB / Circuitos' },
    { id: 'firmware', href: 'firmware.html', label: 'Firmware' },
    { id: 'contacto', href: 'contacto.html', label: 'Contacto' }
  ];

  var linksHTML = items.map(function (item) {
    var activeAttr = (item.id === currentPage) ? ' class="active"' : '';
    return '<li><a href="' + item.href + '"' + activeAttr + '>' + item.label + '</a></li>';
  }).join('');

  var html =
    '<header>' +
      '<nav class="wrap">' +
        '<a href="index.html" class="logo"><span class="dot-g">\u25CD</span>Electr\u00F3nica <br class="logo-break">Santa Ana<span class="dot-c">\u25CD</span></a>' +
        '<button type="button" class="menu-toggle" aria-label="Abrir men\u00FA" aria-expanded="false" aria-controls="site-navlinks">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="navlinks" id="site-navlinks">' + linksHTML + '</ul>' +
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
