/* ============================================================
   nav.js — shared header/menu, injected into every page.
   Edit this file once; the change applies everywhere.

   Each page sets two attributes on <body>:
   - data-page: which nav item to highlight. Recognized values:
     "inicio", "reparacion", "iot", "pcb", "firmware", "proyectos", "contacto"
   - data-lang: "es" (default) or "en" — which language this page is in.
     Spanish pages are the canonical/default versions (plain filenames);
     English pages are the same filenames with an "-en" suffix
     (e.g. reparacion.html <-> reparacion-en.html).
   ============================================================ */
(function () {
  var currentPage = document.body.getAttribute('data-page') || '';
  var lang = document.body.getAttribute('data-lang') || 'es';

  function toEnglishHref(href){
    return href.replace('.html', '-en.html');
  }
  function toSpanishHref(href){
    return href.replace('-en.html', '.html');
  }
  function localizeHref(href){
    return lang === 'en' ? toEnglishHref(href) : href;
  }

  var items = [
    { id: 'inicio', href: 'index.html', label: { es: 'Inicio', en: 'Home' } },
    { id: 'reparacion', href: 'reparacion.html', label: { es: 'Reparación', en: 'Repair' } },
    { id: 'diseno', label: { es: 'Diseño y Prototipo', en: 'Design & Prototyping' }, children: [
        { id: 'iot', href: 'diseno-iot-y-iiot.html', label: { es: 'Diseño IoT\\IIoT', en: 'IoT\\IIoT Design' } },
        { id: 'pcb', href: 'diseno-circuitos-y-placas-pcb.html#pcb-circuitos', label: { es: 'Diseño PCB / Circuitos', en: 'PCB / Circuit Design' } }
      ]
    },
    { id: 'firmware', href: 'firmware.html', label: { es: 'Firmware', en: 'Firmware' } },
    { id: 'proyectos', href: 'proyectos.html', label: { es: 'Proyectos', en: 'Projects' } },
    { id: 'contacto', href: 'contacto.html', label: { es: 'Contacto', en: 'Contact' } }
  ];

  var dropdownIndex = 0;

  var linksHTML = items.map(function (item) {
    if (item.children) {
      var childActive = item.children.some(function (c) { return c.id === currentPage; });
      var toggleId = 'dropdown-toggle-' + (dropdownIndex++);
      var childrenHTML = item.children.map(function (child) {
        var activeAttr = (child.id === currentPage) ? ' class="active"' : '';
        return '<li><a href="' + localizeHref(child.href) + '"' + activeAttr + '>' + child.label[lang] + '</a></li>';
      }).join('');
      return '<li class="has-dropdown">' +
        '<button type="button" id="' + toggleId + '" class="dropdown-toggle' + (childActive ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
          item.label[lang] +
          '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<ul class="dropdown-menu" aria-labelledby="' + toggleId + '">' + childrenHTML + '</ul>' +
      '</li>';
    }
    var activeAttr = (item.id === currentPage) ? ' class="active"' : '';
    return '<li><a href="' + localizeHref(item.href) + '"' + activeAttr + '>' + item.label[lang] + '</a></li>';
  }).join('');

  var facebookIcon =
    '<a class="social-link" href="https://www.facebook.com/crelectronicasa" target="_blank" rel="noopener" aria-label="Facebook de Electr\u00F3nica Santa Ana">' +
      '<svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>' +
    '</a>';

  /* Language switcher: links to the exact counterpart page (same page, other language),
     using data-alt-href on <body> if given (needed when the two versions' filenames
     don't map by simple suffix, e.g. custom slugs), otherwise derives it automatically. */
  var altHrefOverride = document.body.getAttribute('data-alt-href');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var altHref = altHrefOverride
    ? altHrefOverride
    : (lang === 'en' ? toSpanishHref(currentPath) : toEnglishHref(currentPath));

  var langSwitch =
    '<a href="' + altHref + '" class="lang-switch" aria-label="' +
      (lang === 'es' ? 'Switch to English' : 'Cambiar a espa\u00F1ol') + '">' +
      (lang === 'es' ? 'EN' : 'ES') +
    '</a>';

  var html =
    '<header>' +
      '<nav class="wrap">' +
        '<a href="' + localizeHref('index.html') + '" class="logo"><img src="logo-mark-full.png" alt="Electr\u00F3nica Santa Ana" class="logo-img"></a>' +
        '<div class="nav-right">' +
          langSwitch +
          facebookIcon +
          '<button type="button" class="menu-toggle" aria-label="' + (lang === 'es' ? 'Abrir men\u00FA' : 'Open menu') + '" aria-expanded="false" aria-controls="site-navlinks">' +
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
    toggleBtn.setAttribute('aria-label', isOpen ? (lang === 'es' ? 'Cerrar men\u00FA' : 'Close menu') : (lang === 'es' ? 'Abrir men\u00FA' : 'Open menu'));
  }

  toggleBtn.addEventListener('click', function(){
    setMenuOpen(!navlinksEl.classList.contains('open'));
  });

  navlinksEl.addEventListener('click', function(e){
    if (e.target.tagName === 'A') {
      setMenuOpen(false);
      closeAllDropdowns();
    }
  });

  /* Dropdown behavior: hover works on desktop via CSS alone.
     This click handling makes it also work on touch devices
     and via keyboard, and closes other open dropdowns. */
  var dropdownLis = Array.prototype.slice.call(headerEl.querySelectorAll('.has-dropdown'));

  function closeAllDropdowns(except){
    dropdownLis.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('open');
      var btn = li.querySelector('.dropdown-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  dropdownLis.forEach(function (li) {
    var btn = li.querySelector('.dropdown-toggle');
    var links = Array.prototype.slice.call(li.querySelectorAll('.dropdown-menu a'));

    function openDropdown(focusFirst){
      closeAllDropdowns(li);
      li.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      if (focusFirst && links[0]) links[0].focus();
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = li.classList.contains('open');
      closeAllDropdowns(li);
      li.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });

    /* Keyboard: reach the submenu without needing to click/activate the toggle first */
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        openDropdown(true);
      }
    });

    links.forEach(function (link, i) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'Down') {
          e.preventDefault();
          var next = links[i + 1];
          if (next) next.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'Up') {
          e.preventDefault();
          if (i === 0) { btn.focus(); } else { links[i - 1].focus(); }
        } else if (e.key === 'Escape') {
          closeAllDropdowns();
          btn.focus();
        }
      });
    });
  });

  document.addEventListener('click', function (e) {
    if (!headerEl.contains(e.target)) closeAllDropdowns();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });
})();
