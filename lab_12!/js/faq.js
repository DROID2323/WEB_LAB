document.addEventListener('DOMContentLoaded', () => {
  // Відкриття/закриття окремих питань
  document.querySelectorAll('.faq-summary').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');

      // Якщо вже відкрито — закриваємо
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        // Закриваємо інші (опціонально: щоб відкритим був лише один)
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        item.classList.add('open');
      }
    });
  });

  // Кнопка "Переглянути більше"
  const toggleBtn = document.querySelector('.faq-btn');
  const faq = document.querySelector('.faq');

  toggleBtn.addEventListener('click', () => {
    faq.classList.toggle('show-extra');
    if (faq.classList.contains('show-extra')) {
      toggleBtn.textContent = 'Приховати';
      // опціонально: плавно прокрутити до кнопки
      toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      toggleBtn.textContent = 'Переглянути більше';
      // закриваємо всі додаткові відкриті питання
      document.querySelectorAll('.faq-item.extra.open').forEach(i => i.classList.remove('open'));
    }
  });
});
