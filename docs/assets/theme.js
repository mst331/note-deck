/* Note Deck — theme switcher
   初期値: localStorage('theme') > OS設定。トグルチップを .meta 右端に注入。 */
(function () {
  var t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') {
    t = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', t);

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    var host = document.querySelector('.meta > span:last-child') || document.querySelector('.meta');
    if (!host) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'themetoggle';
    function label() {
      btn.textContent = (document.documentElement.getAttribute('data-theme') === 'dark') ? '◑ LIGHT' : '◐ DARK';
    }
    btn.addEventListener('click', function () {
      var next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
    label();
    host.appendChild(btn);
  });
})();
