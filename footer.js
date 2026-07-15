/* ============================================================
   footer.js — shared footer, injected into every page.
   Edit this file once; the change applies everywhere.
   ============================================================ */
(function () {
  var html =
    '<footer>' +
      '<span>\u00A9 2026 Electrónica Santa Ana \u2014 Taller de electr\u00F3nica</span>' +
      '<span>Santa Ana, Costa Rica</span>' +
    '</footer>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  var footerEl = holder.firstElementChild;

  var thisScript = document.currentScript;
  thisScript.parentNode.insertBefore(footerEl, thisScript);
})();
