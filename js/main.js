(function () {
  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Filtre des domaines
  var filters = document.querySelectorAll('.switch button');
  var items = document.querySelectorAll('.acc details');
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-filter');
      filters.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var shown = 0;
      items.forEach(function (d) {
        var match = cat === 'all' || d.getAttribute('data-cat').split(' ').indexOf(cat) > -1;
        d.hidden = !match;
        if (match) shown++;
      });
      var live = document.getElementById('filter-count');
      if (live) live.textContent = shown + (shown > 1 ? ' domaines affichés' : ' domaine affiché');
    });
  });

  // Ouvre un domaine depuis l'ancre (#droit-famille)
  if (location.hash) {
    var t = document.querySelector('.acc details' + location.hash);
    if (t) t.open = true;
  }

  // Formulaire de rendez-vous (démo : aucun envoi)
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var err = form.querySelector('[data-err-for="' + f.id + '"]');
        var valid = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
        if (f.type === 'tel' && valid) valid = /^[+\d][\d\s().-]{7,}$/.test(f.value.trim());
        if (err) err.classList.toggle('show', !valid);
        f.setAttribute('aria-invalid', valid ? 'false' : 'true');
        if (!valid) ok = false;
      });
      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      var name = form.querySelector('[name="nom"]').value.trim();
      var msg = form.parentNode.querySelector('.ok') || form.querySelector('.ok');
      form.querySelectorAll('.ok-name').forEach(function (n) { n.textContent = name; });
      form.reset();
      if (msg) { msg.classList.add('show'); msg.setAttribute('tabindex', '-1'); msg.focus(); }
    });
  });
})();
