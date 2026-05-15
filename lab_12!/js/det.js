document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('routesGrid');
  const cards = Array.from(grid.querySelectorAll('.route-card'));
  const search = document.getElementById('route-search');
  const filter = document.getElementById('route-filter');

  function applyFilter() {
    const q = search.value.trim().toLowerCase();
    const f = filter.value;
    cards.forEach(card => {
      const from = card.dataset.from.toLowerCase();
      const to = card.dataset.to.toLowerCase();
      const type = card.dataset.type;
      const matchesQuery = q === '' || from.includes(q) || to.includes(q) || card.querySelector('h3').textContent.toLowerCase().includes(q);
      const matchesFilter = f === 'all' || f === type;
      card.style.display = (matchesQuery && matchesFilter) ? '' : 'none';
    });
  }

  search.addEventListener('input', applyFilter);
  filter.addEventListener('change', applyFilter);

  // Modal
  const modal = document.getElementById('routeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-route');
    if (!btn) return;
    const card = btn.closest('.route-card');
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('.muted').textContent;
    const meta = Array.from(card.querySelectorAll('.meta span')).map(s => s.textContent).join(' · ');
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalMeta.innerHTML = '<p style="color:#a08f70;font-weight:700;">' + meta + '</p>';
    modal.style.display = 'flex';
  });

  modalClose.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
});