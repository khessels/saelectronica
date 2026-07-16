/* ============================================================
   footer.js — shared footer, injected into every page.
   Edit this file once; the change applies everywhere.
   ============================================================ */
(function () {
  var html =
    '<footer>' +
      '<span class="footer-left">' +
        '<img src="logo-mark-icon.png" alt="Electrónica Santa Ana" class="footer-logo">' +
        '\u00A9 2026 Electrónica Santa Ana \u2014 Taller de electr\u00F3nica' +
      '</span>' +
      '<span class="footer-right">' +
        '<a class="social-link" href="https://www.facebook.com/crelectronicasa" target="_blank" rel="noopener" aria-label="Facebook de Electrónica Santa Ana">' +
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>' +
        '</a>' +
        'Santa Ana, Costa Rica' +
      '</span>' +
    '</footer>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  var footerEl = holder.firstElementChild;

  var thisScript = document.currentScript;
  thisScript.parentNode.insertBefore(footerEl, thisScript);
})();
