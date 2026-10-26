const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  nav?.classList.toggle('is-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#demo-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  note.textContent = 'Gracias. Su correo quedó listo en esta demostración; conecte un canal de contacto para recibir solicitudes.';
  note.classList.add('form-note-success');
});

const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll(
  '.story-copy, .chat-fragment, .section-heading, .benefit-card, .evidence-intro, .stat-card, .closing-card',
);

if (!motionPreference?.matches && 'IntersectionObserver' in window && revealTargets.length) {
  document.body.classList.add('motion-ready');

  revealTargets.forEach((element, index) => {
    element.dataset.reveal = '';

    if (element.matches('.benefit-card, .stat-card')) {
      const siblingIndex = [...element.parentElement.children].indexOf(element);
      element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 5) * 75}ms`);
    } else {
      element.style.setProperty('--reveal-delay', `${(index % 2) * 60}ms`);
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.revealed = '';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });

  revealTargets.forEach((element) => revealObserver.observe(element));
}
