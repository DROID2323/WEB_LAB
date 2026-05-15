document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function (e) {
    const opened = menu.classList.toggle('active');
    burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
    document.body.style.overflow = opened ? 'hidden' : '';
  });
  document.addEventListener('click', function (e) {
    if (!menu.classList.contains('active')) return;
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove('active');
      burger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });
});