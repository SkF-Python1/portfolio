// Smooth scrolling for navigation links
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

// Navbar background change on scroll and active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScrollPos = window.scrollY;
    
    // Navbar background change
    if (currentScrollPos > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Highlight active section in navigation
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Tab functionality for skills section
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the tab id and activate corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Add animations to elements using IntersectionObserver
const animateOnScrollOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Animation for skill categories and project cards
const skillAndProjectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            skillAndProjectObserver.unobserve(entry.target);
        }
    });
}, animateOnScrollOptions);

document.querySelectorAll('.skill-category, .project-card').forEach(element => {
    element.classList.add('animate-element');
    skillAndProjectObserver.observe(element);
});

// Animation for contact items
const contactItemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 150); // Staggered animation
            contactItemObserver.unobserve(entry.target);
        }
    });
}, animateOnScrollOptions);

document.querySelectorAll('.contact-item, .social-link').forEach(element => {
    element.classList.add('animate-element');
    contactItemObserver.observe(element);
});

// Animate skill progress bars when they come into view
const progressBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            
            // First set width to 0
            progressBar.style.width = '0';
            
            // Then animate to the actual value
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            
            progressBarObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-progress').forEach(progressBar => {
    progressBarObserver.observe(progressBar);
});

// Animate hero content on page load
window.addEventListener('load', () => {
    document.querySelector('.hero-content').classList.add('loaded');
    
    // Add typing effect to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        heroHeading.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 500);
    }
    
    // Animate tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
});

// Animate skills when hovered
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        const skills = category.querySelectorAll('li');
        skills.forEach((skill, index) => {
            setTimeout(() => {
                skill.classList.add('pulse');
                setTimeout(() => {
                    skill.classList.remove('pulse');
                }, 700);
            }, index * 100);
        });
    });
});

// Handle form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        // Simulate form submission with animation
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }, 2000);
    });
}

// Dark/Light theme toggle
const themeSwitch = document.querySelector('.theme-switch');
const iconElement = themeSwitch.querySelector('i');

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            iconElement.classList.remove('fa-moon');
            iconElement.classList.add('fa-sun');
        } else {
            iconElement.classList.remove('fa-sun');
            iconElement.classList.add('fa-moon');
        }
    });
}

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.backgroundPosition = `${x * 10}% ${y * 10}%`;
        
        // Move hero decorative elements
        const heroElements = document.querySelectorAll('.hero-shape-1, .hero-shape-2');
        heroElements.forEach(element => {
            const speed = element.classList.contains('hero-shape-1') ? 5 : 10;
            const xPos = (window.innerWidth - e.pageX * speed) / 100;
            const yPos = (window.innerHeight - e.pageY * speed) / 100;
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }
});

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .active {
        color: var(--primary) !important;
    }
    
    .active::after {
        width: 100% !important;
    }
    
    .pulse {
        animation: pulse 0.7s ease-in-out;
    }
    
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .hero-content.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes pulse {
        0% { transform: translateX(0); }
        50% { transform: translateX(10px); }
        100% { transform: translateX(0); }
    }
    
    .dark-theme {
        --background: #0f172a;
        --text-dark: #e2e8f0;
        --card-bg: #1e293b;
        --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    }
    
    .dark-theme .navbar {
        background-color: rgba(15, 23, 42, 0.95);
    }
    
    .dark-theme .nav-links a {
        color: #e2e8f0;
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%);
    }
    
    .dark-theme .about {
        background-color: #0f172a;
    }
    
    .dark-theme .projects {
        background-color: #0f172a;
    }
    
    .dark-theme p, 
    .dark-theme h1, 
    .dark-theme h2, 
    .dark-theme h3,
    .dark-theme .skill-label,
    .dark-theme .detail-label,
    .dark-theme .detail-value,
    .dark-theme .stat-text,
    .dark-theme .tab-btn {
        color: #e2e8f0;
    }
    
    /* Fix for gradient text in headings */
    .dark-theme section h2,
    .dark-theme .hero-content h1 {
        background: none;
        -webkit-background-clip: initial;
        background-clip: initial;
        color: #000000;
    }
    
    .dark-theme .skill-category,
    .dark-theme .project-card,
    .dark-theme .contact-item,
    .dark-theme .contact-form-container {
        background-color: #1e293b;
    }
    
    .dark-theme .form-group input,
    .dark-theme .form-group textarea {
        background-color: #0f172a;
        border-color: #334155;
        color: #e2e8f0;
    }
    
    .dark-theme .skill-bar {
        background-color: #334155;
    }
    
    .dark-theme .tech-stack span {
        background: linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2));
        color: #e2e8f0;
    }
    
    .dark-theme .project-details {
        background-color: #0f172a;
    }
    
    .dark-theme .social-link,
    .dark-theme .tech-icon {
        background-color: #1e293b;
        color: #818cf8;
    }
    
    .dark-theme .hero-content .highlight,
    .dark-theme .about-text .highlight,
    .dark-theme h3,
    .dark-theme .project-link {
        color: #818cf8;
    }
    
    .dark-theme .stat-number {
        color: #818cf8;
    }
    
    .dark-theme .stat-item {
        background-color: #1e293b;
        border-color: #4f46e5;
    }
    
    .dark-theme .hero-badge {
        background: linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2));
        color: #e2e8f0;
        border-color: rgba(79, 70, 229, 0.3);
    }
    
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Add intersection observer for all sections to add entrance animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-animate');
    sectionObserver.observe(section);
});

// Add an additional style element for section animations
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    .section-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(sectionStyle);

// Project modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project modal functionality
    const projectLinks = document.querySelectorAll('.project-link');
    const modals = document.querySelectorAll('.modal-container');
    const modalClose = document.querySelectorAll('.modal-close');
    
    // Open modal when clicking "Learn More"
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`modal-${projectId}`);
            
            // Add class to show modal with animation
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Animate architecture diagram components
            setTimeout(() => {
                animateArchitectureDiagram(modal);
                animateWorkflowSteps(modal);
                animateMetrics(modal);
            }, 300);
        });
    });
    
    // Close modal when clicking X or outside
    modalClose.forEach(close => {
        close.addEventListener('click', closeModal);
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(e);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-container.show');
            if (openModal) {
                closeModal(e, openModal);
            }
        }
    });
    
    function closeModal(e, specificModal) {
        const modalToClose = specificModal || findParentModal(e.target);
        if (modalToClose) {
            modalToClose.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    function findParentModal(element) {
        while (element) {
            if (element.classList && element.classList.contains('modal-container')) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    
    function animateArchitectureDiagram(modal) {
        const components = modal.querySelectorAll('.arch-component');
        const arrows = modal.querySelectorAll('.arch-arrow');
        
        components.forEach((component, index) => {
            component.style.opacity = '0';
            component.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                component.style.transition = 'all 0.5s ease';
                component.style.opacity = '1';
                component.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        arrows.forEach((arrow, index) => {
            arrow.style.opacity = '0';
            
            setTimeout(() => {
                arrow.style.transition = 'all 0.5s ease';
                arrow.style.opacity = '1';
            }, 100 * (index + components.length));
        });
    }
    
    function animateWorkflowSteps(modal) {
        const steps = modal.querySelectorAll('.workflow-step');
        
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.5s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, 200 * index);
        });
    }
    
    function animateMetrics(modal) {
        const metrics = modal.querySelectorAll('.metric-item');
        
        metrics.forEach((metric, index) => {
            metric.style.opacity = '0';
            metric.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                metric.style.transition = 'all 0.5s ease';
                metric.style.opacity = '1';
                metric.style.transform = 'scale(1)';
                
                // Animate the number counting up
                const valueElement = metric.querySelector('.metric-value');
                const finalValue = valueElement.textContent;
                animateCounter(valueElement, finalValue);
            }, 150 * index);
        });
    }
    
    function animateCounter(element, finalValue) {
        // Extract the numeric part and any suffix (like %, +, etc.)
        const matches = finalValue.match(/^([\d.]+)(.*)$/);
        if (!matches) return;
        
        const numericValue = parseFloat(matches[1]);
        const suffix = matches[2] || '';
        let startValue = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Use easeOutQuart for a nice easing effect
            const easing = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easing * numericValue);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = finalValue; // Ensure we end up with the exact target value
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}); 