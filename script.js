const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.getElementById('continueBtn').addEventListener('click', () => {
  document.getElementById('courses').scrollIntoView({behavior:'smooth'});
  showToast('Choose a course below to continue learning.');
});
document.getElementById('journeyBtn').addEventListener('click', () => {
  document.querySelector('.stats-grid').scrollIntoView({behavior:'smooth', block:'center'});
  showToast('Here is your learning progress at a glance.');
});
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = prompt('Search your learning dashboard:');
  if (query && query.trim()) {
    const cards = [...document.querySelectorAll('.course-card')];
    const match = cards.find(card => card.innerText.toLowerCase().includes(query.trim().toLowerCase()));
    if (match) {
      match.scrollIntoView({behavior:'smooth', block:'center'});
      match.style.outline = '2px solid #8878e8';
      setTimeout(() => match.style.outline = '', 1800);
      showToast('Found a matching course.');
    } else showToast('No matching course found. Try “design”, “web”, or “data”.');
  }
});
document.querySelectorAll('.course-continue').forEach(button => {
  button.addEventListener('click', () => showToast(`“${button.dataset.course}” selected. Course content can be connected here.`));
});
document.getElementById('chartRange').addEventListener('change', event => {
  const bars = [...document.querySelectorAll('#bars .bar')];
  const thisWeek = [35,58,43,82,48,68,23];
  const lastWeek = [24,45,62,39,72,50,30];
  const values = event.target.value === 'week' ? thisWeek : lastWeek;
  bars.forEach((bar, index) => {
    bar.style.height = values[index] + '%';
    bar.classList.toggle('active-bar', index === (event.target.value === 'week' ? 3 : 4));
    const label = bar.querySelector('b');
    if (label) label.remove();
    if (index === (event.target.value === 'week' ? 3 : 4)) {
      const b = document.createElement('b');
      b.textContent = event.target.value === 'week' ? '2.8h' : '2.4h';
      bar.appendChild(b);
    }
  });
  showToast(event.target.value === 'week' ? 'Showing this week’s activity.' : 'Showing last week’s activity.');
});
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    item.classList.add('active');
  });
});
