document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('authModal');
  const closeBtn = document.getElementById('closeModal');
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const panels = {
    loginPanel: document.getElementById('loginPanel'),
    registerPanel: document.getElementById('registerPanel')
  };
  const switchButtons = Array.from(document.querySelectorAll('[data-switch]'));
  // Функції відкриття/закриття модалки
  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    const first = panels.loginPanel.querySelector('input');
    if (first) first.focus();
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  // Відкриття модалки при кліку на кнопку авторизації
  const authLink = document.getElementById('authLink');
  if (authLink) {
    authLink.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }
  // Закриття
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
  // Переключення табів
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-target');

      tabButtons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      Object.keys(panels).forEach(key => {
        const panel = panels[key];
        const isTarget = key === target;
        panel.classList.toggle('hidden', !isTarget);
        panel.setAttribute('aria-hidden', (!isTarget).toString());
      });

      const firstInput = panels[target].querySelector('input');
      if (firstInput) firstInput.focus();
    });
  });
  
  switchButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-switch');
      const tab = tabButtons.find(t => t.getAttribute('data-target') === target);
      if (tab) tab.click();
    });
  });

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModal();
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Вітаємо ви успішно зареєструвались');
      const loginTab = tabButtons.find(t => t.getAttribute('data-target') === 'loginPanel');
      if (loginTab) loginTab.click();
    });
  }
});
