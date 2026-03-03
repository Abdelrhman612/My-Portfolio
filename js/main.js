// ========== MAIN APPLICATION ==========

/**
 * Portfolio JavaScript
 * Contains all interactive functionality
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize all application features
 */
function initializeApp() {
    setupMobileNavigation();
    setupTypingEffect();
    setupSmoothScrolling();
    setupActiveNavHighlight();
    setupScrollAnimations();
    setupCounterAnimation();
    populateSkills();
    populateProjects();
    setupContactForm();
    setupProjectLinkTracking();
    setupCVTracking()
}

// ========== MOBILE NAVIGATION ==========
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ========== TYPING EFFECT ==========
function setupTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const words = ['.NET Developer', 'Node.js Expert', 'NestJS Specialist', 'Backend Architect'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    type();
}

// ========== SMOOTH SCROLLING ==========
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function setupActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial call
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.card, .project-card, .skill-item, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;

                function updateCount() {
                    const current = parseInt(counter.innerText);
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target + '+';
                    }
                }

                updateCount();
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// ========== POPULATE SKILLS ==========
function populateSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    const skills = [
        '.NET', 'Node.js', 'NestJS', 'React', 'PostgreSQL',
        'SQL Server', 'Docker', 'Python', 'TypeScript', 'Prisma',
        'REST APIs', 'GraphQL', 'MongoDB', 'Redis', 'AWS',

        'LeetCode (Problem Solving)'
    ];

    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';


        if (skill.includes('LeetCode')) {
            skillElement.style.cursor = 'pointer';
            skillElement.setAttribute('data-leetcode', 'true');
            skillElement.addEventListener('click', () => {
                window.open('https://leetcode.com/u/Abdelrhman-Ayman/', '_blank');
            });
        }

        skillElement.textContent = skill;
        skillsContainer.appendChild(skillElement);
    });
}

// ========== POPULATE PROJECTS ==========
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const projects = [

        {
            title: 'Video Meeting Application',
            description: 'Full-stack video conferencing app with real-time communication using WebRTC and Socket.IO. Features room management, screen sharing, and JWT authentication.',
            tech: ['.Net', 'React', 'SqlServer', 'Ef', 'WebRTC', 'Socket.IO', 'JWT', 'TypeScript', 'Docker'],
            link: 'https://github.com/Abdelrhman612/Meeting-Room-FullStack'
        },

        {
            title: 'AI Exam Generator',
            description: 'FullStack application that parses PDFs to generate interactive exams using AI. Showcases complex file handling.',
            tech: ['.Net', 'FastApi', 'React', 'Node.js', 'OpenAI', 'PDF.js', 'Docker'],
            link: 'https://github.com/Abdelrhman612/Pdf-ExamAi-FullStack'
        },
        {
            title: 'Gamified Learning Platform',
            description: 'Interactive learning experience with gamification elements to boost user engagement.',
            tech: ['Node.js', 'React', 'Next.js', 'Postgrs', 'NestJs'],
            link: 'https://github.com/Abdelrhman612/gamified-learning-platform-fullstack'
        },
        {
            title: 'Book Library Backend System',
            description: '🔧 Robust backend system for a book library built with NestJS. Features JWT authentication, role-based access control (user/admin), Cloudinary image upload, and email-based password recovery.',
            tech: ['NestJS', 'PostgreSQL', 'Prisma', 'JWT', 'Cloudinary', 'Passport', 'Nodemailer', 'TypeScript'],
            link: 'https://github.com/Abdelrhman612/Book-Library-Backend-NestJs'
        },
        {
            title: 'Book Library Frontend',
            description: 'A modern frontend application for a Book Library built with React, TypeScript, and Vite. Features user authentication, book management, and responsive design.',
            tech: ['React 19', 'TypeScript', 'Vite', 'Bootstrap 5', 'React Router v7', 'Axios'],
            link: 'https://github.com/Abdelrhman612/Book-Library-Frontend-ReactJs'
        },
        {
            title: 'E-commerce Backend (NestJS)',
            description: 'Scalable backend API for an e-commerce platform featuring authentication, order processing.',
            tech: ['NestJS', 'PostgreSQL', 'JWT'],
            link: 'https://github.com/Abdelrhman612/Ecommerce-Back-End-Nest.JS'
        },

    ];

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

/**
 * Create a project card element
 * @param {Object} project - Project data
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <a href="${project.link}" target="_blank" class="project-link">
            View Repository <i class="fas fa-arrow-right"></i>
        </a>
    `;

    return card;
}

// ========== PROJECT LINK TRACKING ==========
function setupProjectLinkTracking() {
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function (e) {
            console.log('Opening project link:', this.href);


            trackProjectClick(this.href);
        });
    });
}

/**
 * Track project link clicks
 * @param {string} url - The URL being clicked
 */
function trackProjectClick(url) {
    // Example: Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'project_click', {
            'project_url': url
        });
    }

    // Store in localStorage for custom tracking
    const clicks = JSON.parse(localStorage.getItem('project_clicks') || '[]');
    clicks.push({
        url: url,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('project_clicks', JSON.stringify(clicks.slice(-10))); // Keep last 10
}

// ========== CONTACT FORM ==========
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Simulate API call (replace with actual API)
            await simulateApiCall(formData);

            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();

        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
            console.error('Form submission error:', error);

        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Simulate API call (replace with actual API)
 * @param {Object} data - Form data
 * @returns {Promise}
 */
function simulateApiCall(data) {
    return new Promise((resolve) => {
        console.log('Sending form data:', data);
        setTimeout(resolve, 1500);
    });
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)',
        color: 'white',
        borderRadius: '10px',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease'
    });

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== LAZY LOADING IMAGES ==========
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========== CV DOWNLOAD TRACKING ==========
function setupCVTracking() {
    const cvLinks = document.querySelectorAll('a[href$=".pdf"]');

    cvLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('CV downloaded');


            if (typeof gtag !== 'undefined') {
                gtag('event', 'cv_download', {
                    'event_category': 'engagement',
                    'event_label': 'CV Download'
                });
            }

            const downloads = JSON.parse(localStorage.getItem('cv_downloads') || '[]');
            downloads.push({
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            });
            localStorage.setItem('cv_downloads', JSON.stringify(downloads.slice(-5)));

            showNotification('Downloading CV...', 'success');
        });
    });
}



// ========== EXPOSE FUNCTIONS TO GLOBAL SCOPE ==========
window.trackProjectClick = trackProjectClick;