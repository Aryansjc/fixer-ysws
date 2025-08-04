const typingText = document.getElementById('typing-text');
const registerForm = document.getElementById('registerForm');
const commands = [
    'ls -la /var/log/bugs',
    'grep -r "ERROR" .',
    './fix_everything.sh',
    'git commit -m "bugs eliminated"',
    'echo "FIXER ACTIVATED"'
];
let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeWriter() {
    const currentCommand = commands[commandIndex];
    if (isDeleting) {
        typingText.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 30 : 60;
    if (!isDeleting && charIndex === currentCommand.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}
typeWriter();
function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}
function addGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            if (Math.random() < 0.1) {
                glitchElement.style.animation = 'none';
                glitchElement.offsetHeight;
                glitchElement.style.animation = 'glitch 0.3s linear';
            }
        }, 3000);
    }
}
function initVideoBackground() {
    const video = document.querySelector('.video-bg video');
    if (video) {
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(error => {
                console.log('Video autoplay failed:', error);
                document.addEventListener('click', () => {
                    video.play().catch(e => console.log('Manual video play failed:', e));
                }, { once: true });
            });
        });
        video.addEventListener('error', (e) => {
            console.log('Video loading error:', e);
            const videoBg = document.querySelector('.video-bg');
            if (videoBg) {
                videoBg.style.background = `
                    radial-gradient(circle at 20% 20%, rgba(0, 255, 65, 0.1) 0%, transparent 20%),
                    radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 20%),
                    radial-gradient(circle at 40% 60%, rgba(255, 0, 128, 0.05) 0%, transparent 20%)
                `;
            }
        });
        video.addEventListener('canplaythrough', () => {
            video.style.visibility = 'visible';
        });
    }
}
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
function handleFormSubmission() {
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData);
            const submitBtn = registerForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'PROCESSING...';
            submitBtn.disabled = true;
            setTimeout(() => {
                showNotification('Registration successful! Welcome to the resistance, hacker.', 'success');
                registerForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                console.log('Registration data:', data);
            }, 2000);
        });
    }
}
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<div class="notification-content">' +
        '<span class="notification-icon">' + (type === 'success' ? 'X' : 'i') + '</span>' +
        '<span class="notification-message">' + message + '</span>' +
        '</div>';
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = (type === 'success' ? 'var(--neon-green)' : 'var(--cyber-blue)');
    notification.style.color = 'var(--terminal-black)';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.fontFamily = 'var(--font-mono)';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(400px)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
function addInteractiveEffects() {
    const buttons = document.querySelectorAll('.cta-btn, .submit-btn, .join-slack, .rsvp-btn, .main-rsvp-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    const cards = document.querySelectorAll('.about-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createParticleEffect(card);
        });
    });
}
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--neon-green)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        document.body.appendChild(particle);
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let opacity = 1;
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }
        };
        requestAnimationFrame(animate);
    }
}
function initTerminalCommands() {
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerHTML = '<span class="prompt">root@hackclub:~$ </span>' +
                '<span style="color: var(--white);">echo "Welcome to FIXER!"</span>';
            terminalBody.appendChild(newLine);
            setTimeout(() => {
                const output = document.createElement('div');
                output.innerHTML = '<span style="color: var(--neon-green);">Welcome to FIXER!</span>';
                terminalBody.appendChild(output);
            }, 500);
        });
    }
}
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                if (finalValue.includes('+')) {
                    const number = parseInt(finalValue);
                    animateCounter(stat, 0, number, 2000, '+');
                } else if (finalValue.includes('H')) {
                    animateCounter(stat, 0, 24, 2000, 'H');
                } else if (finalValue === '∞') {
                    stat.style.animation = 'pulse 2s ease-in-out infinite';
                }
                observer.unobserve(stat);
            }
        });
    });
    stats.forEach(stat => observer.observe(stat));
}
function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.animation = 'rainbow 2s linear infinite';
                showNotification('HACKER MODE ACTIVATED! You found the secret code!', 'success');
                const style = document.createElement('style');
                style.textContent = '@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }';
                document.head.appendChild(style);
                setTimeout(() => {
                    document.body.style.animation = '';
                    if (document.head.contains(style)) {
                        document.head.removeChild(style);
                    }
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}
function initThemeCustomization() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.width = '60px';
    themeToggle.style.height = '60px';
    themeToggle.style.background = 'linear-gradient(135deg, var(--gray-dark) 0%, var(--terminal-black) 100%)';
    themeToggle.style.border = '2px solid var(--gray-light)';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.fontSize = '1.5rem';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    themeToggle.style.opacity = '0.8';
    themeToggle.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    themeToggle.style.backdropFilter = 'blur(10px)';
    themeToggle.style.overflow = 'hidden';
    themeToggle.title = 'Switch Theme (Experimental)';
    const iconContainer = document.createElement('div');
    iconContainer.style.position = 'relative';
    iconContainer.style.width = '24px';
    iconContainer.style.height = '24px';
    iconContainer.style.display = 'flex';
    iconContainer.style.alignItems = 'center';
    iconContainer.style.justifyContent = 'center';
    const mainIcon = document.createElement('div');
    mainIcon.innerHTML = '🎨';
    mainIcon.style.fontSize = '20px';
    mainIcon.style.transition = 'transform 0.3s ease';
    mainIcon.style.filter = 'drop-shadow(0 0 5px rgba(0, 255, 65, 0.5))';
    const ring = document.createElement('div');
    ring.style.position = 'absolute';
    ring.style.top = '50%';
    ring.style.left = '50%';
    ring.style.width = '30px';
    ring.style.height = '30px';
    ring.style.border = '2px solid transparent';
    ring.style.borderRadius = '50%';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.background = 'conic-gradient(from 0deg, var(--neon-green), var(--cyber-blue), var(--bright-pink), var(--neon-green))';
    ring.style.backgroundClip = 'padding-box';
    ring.style.animation = 'spin 3s linear infinite';
    ring.style.opacity = '0';
    ring.style.transition = 'opacity 0.3s ease';
    const spinKeyframes = `
        @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    if (!document.querySelector('#spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = spinKeyframes;
        document.head.appendChild(style);
    }
    iconContainer.appendChild(ring);
    iconContainer.appendChild(mainIcon);
    themeToggle.appendChild(iconContainer);
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1) translateY(-2px)';
        themeToggle.style.opacity = '1';
        themeToggle.style.boxShadow = '0 8px 25px rgba(0, 255, 65, 0.3)';
        themeToggle.style.borderColor = 'var(--neon-green)';
        ring.style.opacity = '0.7';
        mainIcon.style.transform = 'scale(1.1)';
    });
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1) translateY(0)';
        themeToggle.style.opacity = '0.8';
        themeToggle.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        themeToggle.style.borderColor = 'var(--gray-light)';
        ring.style.opacity = '0';
        mainIcon.style.transform = 'scale(1)';
    });
    let themeIndex = 1;
    const themes = [
        { 
            name: 'Classic Cyberpunk',
            primary: '#00ff41', 
            secondary: '#00d4ff', 
            accent: '#ff0080',
            icon: '🟢'
        },
        { 
            name: 'Fire Storm',
            primary: '#ff6b35', 
            secondary: '#f59e0b', 
            accent: '#8b5cf6',
            icon: '🔥'
        },
        { 
            name: 'Ocean Breeze',
            primary: '#06ffa5', 
            secondary: '#00b4d8', 
            accent: '#e63946',
            icon: '🌊'
        }
    ];
    const defaultTheme = themes[themeIndex];
    document.documentElement.style.setProperty('--neon-green', defaultTheme.primary);
    document.documentElement.style.setProperty('--cyber-blue', defaultTheme.secondary);
    document.documentElement.style.setProperty('--bright-pink', defaultTheme.accent);
    const updateThemeIcon = () => {
        const currentTheme = themes[themeIndex];
        mainIcon.innerHTML = currentTheme.icon;
        mainIcon.style.filter = `drop-shadow(0 0 8px ${currentTheme.primary})`;
        ring.style.background = `conic-gradient(from 0deg, ${currentTheme.primary}, ${currentTheme.secondary}, ${currentTheme.accent}, ${currentTheme.primary})`;
    };
    updateThemeIcon(); 
    themeToggle.addEventListener('click', () => {
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1.1) translateY(-2px)';
        }, 100);
        themeIndex = (themeIndex + 1) % themes.length;
        const theme = themes[themeIndex];
        document.documentElement.style.setProperty('--neon-green', theme.primary);
        document.documentElement.style.setProperty('--cyber-blue', theme.secondary);
        document.documentElement.style.setProperty('--bright-pink', theme.accent);
        updateThemeIcon();
        showNotification(`${theme.name} theme activated! ${theme.icon}`, 'success');
        ring.style.opacity = '1';
        ring.style.animation = 'spin 1s linear infinite';
        setTimeout(() => {
            ring.style.animation = 'spin 3s linear infinite';
            ring.style.opacity = '0.7';
        }, 1000);
    });
    document.body.appendChild(themeToggle);
}
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('%cFIXER loaded in ' + Math.round(loadTime) + 'ms', 
                   'color: #00ff41; font-family: monospace; font-size: 14px;');
        if (loadTime > 3000) {
            console.warn('Slow load detected. Consider optimizations.');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cFIXER SYSTEM INITIALIZED', 
               'color: #00ff41; font-family: monospace; font-size: 16px; font-weight: bold;');
    handleScrollAnimations();
    addGlitchEffect();
    handleNavbarScroll();
    initSmoothScrolling();
    handleFormSubmission();
    addInteractiveEffects();
    initTerminalCommands();
    animateStats();
    initKonamiCode();
    initThemeCustomization();
    initPerformanceMonitoring();
    initVideoBackground();
    if (window.innerWidth > 1024) {
        initDesktopEnhancements();
        addParallaxEffects();
        initDesktopNavigation();
    }
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('resize', handleResponsiveFeatures);
    document.body.classList.add('loaded');
});
function initDesktopEnhancements() {
    addDesktopHoverEffects();
    initSectionTransitions();
    addKeyboardNavigation();
    initDesktopAnimations();
    addTechTagAnimations();
    initProgressTracking();
}
function addDesktopHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .requirement-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const gradient = document.createElement('div');
            gradient.className = 'dynamic-border';
            gradient.style.position = 'absolute';
            gradient.style.top = '0';
            gradient.style.left = '0';
            gradient.style.right = '0';
            gradient.style.bottom = '0';
            gradient.style.background = `conic-gradient(from ${Date.now() % 360}deg, var(--neon-green), var(--cyber-blue), var(--bright-pink), var(--neon-green))`;
            gradient.style.padding = '2px';
            gradient.style.borderRadius = '8px';
            gradient.style.zIndex = '-1';
            gradient.style.opacity = '0';
            gradient.style.transition = 'opacity 0.3s ease';
            card.style.position = 'relative';
            card.appendChild(gradient);
            setTimeout(() => {
                gradient.style.opacity = '0.3';
            }, 10);
        });
        card.addEventListener('mouseleave', (e) => {
            const gradient = card.querySelector('.dynamic-border');
            if (gradient) {
                gradient.style.opacity = '0';
                setTimeout(() => {
                    if (card.contains(gradient)) {
                        card.removeChild(gradient);
                    }
                }, 300);
            }
        });
    });
}
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
                const cards = entry.target.querySelectorAll('.about-card, .requirement-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = 'translateY(0) scale(1)';
                        card.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });
    sections.forEach(section => {
        observer.observe(section);
        const cards = section.querySelectorAll('.about-card, .requirement-card');
        cards.forEach(card => {
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.opacity = '0.7';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}
function addParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
        sections.forEach((section, index) => {
            const rate = (scrolled - section.offsetTop) * 0.1;
            if (section.classList.contains('about-section') || 
                section.classList.contains('requirements-section')) {
                section.style.backgroundPosition = `center ${rate}px`;
            }
        });
    });
}
function initDesktopNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            ripple.style.position = 'absolute';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'var(--cyber-blue)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '-1';
            link.style.position = 'relative';
            link.appendChild(ripple);
            setTimeout(() => {
                if (link.contains(ripple)) {
                    link.removeChild(ripple);
                }
            }, 600);
        });
    });
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
function addKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    e.preventDefault();
                    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    e.preventDefault();
                    document.getElementById('requirements')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}
function initDesktopAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-100px'
    };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.classList.contains('hero-title')) {
                    element.style.animation = 'slideInFromLeft 1s cubic-bezier(0.4, 0, 0.2, 1)';
                } else if (element.classList.contains('section-title')) {
                    element.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                } else if (element.classList.contains('process-step')) {
                    element.style.animation = 'slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    initProcessStepInteractions(element);
                }
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    if (!document.querySelector('#desktop-animations')) {
        const style = document.createElement('style');
        style.id = 'desktop-animations';
        style.textContent = `
            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideInFromRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            .keyboard-navigation *:focus {
                outline: 2px solid var(--neon-green) !important;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
    document.querySelectorAll('.hero-title, .section-title, .process-step').forEach(el => {
        animationObserver.observe(el);
    });
}
function initProcessStepInteractions(stepElement) {
    const stepNumber = stepElement.querySelector('.step-number');
    const stepGlow = stepElement.querySelector('.step-glow');
    const stepContent = stepElement.querySelector('.step-content');
    if (!stepElement.dataset.interactionsInitialized) {
        stepElement.dataset.interactionsInitialized = 'true';
        stepElement.addEventListener('mouseenter', () => {
            if (stepGlow) {
                stepGlow.style.animation = 'pulse-glow 1s ease-in-out infinite';
                stepGlow.style.opacity = '0.8';
            }
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1) rotate(5deg)';
                stepNumber.style.boxShadow = '0 0 30px var(--bright-pink)';
            }
            if (stepContent) {
                stepContent.style.borderColor = 'var(--neon-green)';
            }
        });
        stepElement.addEventListener('mouseleave', () => {
            if (stepGlow) {
                stepGlow.style.animation = 'pulse-glow 3s ease-in-out infinite';
                stepGlow.style.opacity = '0.3';
            }
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
                stepNumber.style.boxShadow = 'none';
            }
            if (stepContent) {
                stepContent.style.borderColor = 'var(--gray-light)';
            }
        });
        stepElement.addEventListener('click', () => {
            const techTags = stepElement.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.animation = 'bounce 0.6s ease';
                }, index * 100);
            });
        });
    }
}
function addTechTagAnimations() {
    if (!document.querySelector('#tech-tag-animations')) {
        const style = document.createElement('style');
        style.id = 'tech-tag-animations';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
function initProgressTracking() {
    const processSteps = document.querySelectorAll('.process-step');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.background = 'var(--neon-green)';
                    stepNumber.style.color = 'var(--terminal-black)';
                    stepNumber.style.borderColor = 'var(--neon-green)';
                    stepNumber.style.boxShadow = '0 0 20px var(--neon-green)';
                }
                const techTags = entry.target.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            } else {
                const stepNumber = entry.target.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.background = 'var(--terminal-black)';
                    stepNumber.style.color = 'var(--bright-pink)';
                    stepNumber.style.borderColor = 'var(--bright-pink)';
                    stepNumber.style.boxShadow = 'none';
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-100px'
    });
    processSteps.forEach(step => {
        progressObserver.observe(step);
        const techTags = step.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.opacity = '0.3';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'all 0.4s ease';
        });
    });
}
function handleResponsiveFeatures() {
    const width = window.innerWidth;
    if (width > 1024 && !document.body.classList.contains('desktop-enhanced')) {
        document.body.classList.add('desktop-enhanced');
        initDesktopEnhancements();
    } else if (width <= 1024 && document.body.classList.contains('desktop-enhanced')) {
        document.body.classList.remove('desktop-enhanced');
    }
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed');
            });
    });
}