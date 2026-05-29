// Smooth scroll et active link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active nav link
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Ajouter du style au lien actif
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(style);

// Expand/collapse au clic sur une project-card (un seul à la fois)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        // Ne pas déclencher si on clique sur un lien
        if (e.target.closest('a')) return;

        const isAlreadyExpanded = this.classList.contains('expanded');

        // Fermer tous
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('expanded'));

        // Ouvrir celui-ci sauf s'il était déjà ouvert (toggle)
        if (!isAlreadyExpanded) {
            this.classList.add('expanded');
        }
    });
});

// Projets associés aux compétences
function showRelatedProjects(btn) {
    const card = btn.closest('.competence-card');
    const related = card.dataset.related.split(',').map(s => s.trim());

    // Reset tous les projets
    document.querySelectorAll('.project-card').forEach(p => {
        p.classList.remove('project-highlight', 'project-dimmed', 'expanded');
    });

    // Highlight / dim
    document.querySelectorAll('.project-card').forEach(p => {
        if (related.includes(p.dataset.projectId)) {
            p.classList.add('project-highlight');
        } else {
            p.classList.add('project-dimmed');
        }
    });

    // Scroll vers la section projets
    const section = document.querySelector('#projets');
    section.scrollIntoView({ behavior: 'smooth' });

    // Reset automatique après 3s
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(p => {
            p.classList.remove('project-highlight', 'project-dimmed');
        });
    }, 3000);
}