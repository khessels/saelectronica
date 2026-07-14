/* ============================================================
   nav.js — shared header/menu, injected into every page.
   Edit this file once; the change applies everywhere.

   Each page sets <body data-page="..."> to say which nav item
   should be highlighted. Recognized values:
   "reparacion", "iot", "pcb", "firmware", "contacto"
   (leave empty/omit on the homepage — no item is highlighted).
   ============================================================ */
(function () {
  var currentPage = document.body.getAttribute('data-page') || '';

  var items = [
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
        '<a href="index.html" class="logo"><span class="dot-g">\u25CD</span>CIRCUITO<span class="dot-c">\u25CD</span></a>' +
        '<ul class="navlinks">' + linksHTML + '</ul>' +
      '</nav>' +
    '</header>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  var headerEl = holder.firstElementChild;

  var thisScript = document.currentScript;
  thisScript.parentNode.insertBefore(headerEl, thisScript);
})();
