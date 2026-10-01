// 書類ページ（privacy / terms / delete-account）の目次。本文の HTML には触らず、見出し（h2）から組み立てる。
// 広い画面（1180px 以上）だけ左に出す。JS が動かなくても本文はそのまま読める。
(function () {
  var main = document.querySelector('main');
  if (!main) return;
  var hs = main.querySelectorAll('h2');
  if (hs.length < 3) return;
  var ja = (document.documentElement.lang || '').indexOf('ja') === 0;
  var nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', ja ? '目次' : 'Contents');
  var title = document.createElement('p');
  title.className = 'toc-title';
  title.textContent = ja ? '目次' : 'Contents';
  nav.appendChild(title);
  var ol = document.createElement('ol');
  var links = [];
  hs.forEach(function (h, i) {
    if (!h.id) h.id = 's' + (i + 1);
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.title = h.textContent;
    li.appendChild(a);
    ol.appendChild(li);
    links.push(a);
  });
  nav.appendChild(ol);
  main.parentNode.insertBefore(nav, main);

  if (!('IntersectionObserver' in window)) return;
  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = Array.prototype.indexOf.call(hs, e.target);
      if (current) current.removeAttribute('aria-current');
      current = links[i];
      current.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  hs.forEach(function (h) { io.observe(h); });
})();
