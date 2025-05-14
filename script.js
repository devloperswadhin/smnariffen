// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Typed.js initialization
const typed = new Typed('#typed', {
    strings: ['Logo Designer', 'Branding Expert', 'UI/UX Designer'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme
document.body.dataset.theme = localStorage.getItem('theme') || 'light';

// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3b82f6'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        // Add filtering logic here when portfolio items are added
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});


// Portfolio projects data
const portfolioProjects = [
    {
        id: 1,
        title: "Logo Design Projects",
        category: "logos",
        description: "Professional logo design for various clients",
        images: [
            "assets/portfolio/logo1.jpg",
            "assets/portfolio/logo2.jpg",
            // Add more project images
        ]
    },
    // Add more projects here
];

// Portfolio grid population
function populatePortfolio(filter = 'all') {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? portfolioProjects 
        : portfolioProjects.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
        const projectCard = `
            <div class="portfolio-item" data-category="${project.category}" data-aos="fade-up">
                <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
                <div class="portfolio-item-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button class="view-project" data-project-id="${project.id}">View Project</button>
                </div>
            </div>
        `;
        portfolioGrid.innerHTML += projectCard;
    });
}

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    populatePortfolio();
});


// Project modal functionality
function createProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${project.title}</h2>
            <div class="project-gallery">
                ${project.images.map(img => `
                    <img src="${img}" alt="Project image" loading="lazy">
                `).join('')}
            </div>
            <div class="project-details">
                <p>${project.description}</p>
                <div class="project-meta">
                    <p><strong>Category:</strong> ${project.category}</p>
                    <p><strong>Tools Used:</strong> ${project.tools.join(', ')}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => {
        modal.remove();
    };
}

// Add event listeners for project cards
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-project')) {
        const projectId = e.target.dataset.projectId;
        const project = portfolioProjects.find(p => p.id === parseInt(projectId));
        if (project) {
            createProjectModal(project);
        }
    }
});