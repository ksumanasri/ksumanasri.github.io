document.addEventListener('DOMContentLoaded', () => {

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Cursor & Spotlight Interactions ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    
    if (!isTouchDevice && !prefersReducedMotion) {
        // Create custom cursor elements if not in HTML (Fallback if deleted)
        if(!cursorDot) {
            const dot = document.createElement('div');
            dot.id = 'cursor-dot';
            document.body.appendChild(dot);
        }
        if(!cursorRing) {
            const ring = document.createElement('div');
            ring.id = 'cursor-ring';
            document.body.appendChild(ring);
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let spotX = mouseX;
        let spotY = mouseY;

        // Show spotlight after first move
        let firstMove = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if(!firstMove && cursorSpotlight) {
                cursorSpotlight.style.opacity = '1';
                firstMove = true;
            }
            
            const dot = document.getElementById('cursor-dot');
            if(dot) {
                dot.style.left = `${mouseX}px`;
                dot.style.top = `${mouseY}px`;
            }
        });

        let interactFrameId;
        const renderInteractions = () => {
            if (document.hidden) {
                interactFrameId = requestAnimationFrame(renderInteractions);
                return;
            }

            // Smooth ring
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            
            const ring = document.getElementById('cursor-ring');
            if(ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }

            // Smooth background spotlight
            if(cursorSpotlight) {
                spotX += (mouseX - spotX) * 0.05;
                spotY += (mouseY - spotY) * 0.05;
                cursorSpotlight.style.left = `${spotX}px`;
                cursorSpotlight.style.top = `${spotY}px`;
            }

            interactFrameId = requestAnimationFrame(renderInteractions);
        };
        interactFrameId = requestAnimationFrame(renderInteractions);

        // Hover states for links and buttons
        const interactives = document.querySelectorAll('a, button, .magnetic, .glass-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const r = document.getElementById('cursor-ring');
                if(r) r.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                const r = document.getElementById('cursor-ring');
                if(r) r.classList.remove('hovering');
            });
        });

        // Magnetic Physics for buttons
        const magnetics = document.querySelectorAll('.magnetic');
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // --- High-Performance Particle Network ---
    if (!prefersReducedMotion) {
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];
            let w, h;
            
            const initParticles = () => {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
                particles = [];
                // Limit particles for performance
                const count = window.innerWidth < 768 ? 30 : 60;
                for (let i = 0; i < count; i++) {
                    particles.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: (Math.random() - 0.5) * 0.4,
                        r: Math.random() * 1.5 + 0.5,
                        baseAlpha: Math.random() * 0.5 + 0.1
                    });
                }
            };

            let animationFrameId;

            const drawParticles = () => {
                if (document.hidden) {
                    animationFrameId = requestAnimationFrame(drawParticles);
                    return;
                }

                ctx.clearRect(0, 0, w, h);
                
                // Draw Connections
                ctx.lineWidth = 0.5;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                // Draw Nodes
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 240, 255, ${p.baseAlpha})`;
                    ctx.fill();
                });

                animationFrameId = requestAnimationFrame(drawParticles);
            };

            window.addEventListener('resize', initParticles);
            
            // Re-init on visibility change to avoid large jumps
            document.addEventListener('visibilitychange', () => {
                if(!document.hidden) {
                    // Just resume, delta timing isn't used here so it's fine.
                }
            });

            initParticles();
            drawParticles();
        }
    }

    // --- Scroll Features ---
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Timeline specific
    const timelineSection = document.getElementById('education');
    const timelineProgressH = document.querySelector('.timeline-progress-h');

    const handleScroll = () => {
        // 1. Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";

        // 2. Navbar glass effect
        if (winScroll > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // 3. Active Nav Link (Scrollspy)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - window.innerHeight * 0.3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // 4. Timeline Fill Logic
        if (timelineSection && timelineProgressH) {
            const rect = timelineSection.getBoundingClientRect();
            // Start filling when top is at 70% of viewport, end filling when top reaches 20%
            const start = window.innerHeight * 0.7;
            const end = window.innerHeight * 0.2;
            
            let p = 0;
            if (rect.top < start) {
                p = (start - rect.top) / (start - end);
                p = Math.max(0, Math.min(1, p));
            }
            
            // Apply width if horizontal (desktop), or height if vertical (mobile layout stack)
            if (window.innerWidth > 1024) {
                timelineProgressH.style.width = `${p * 100}%`;
                timelineProgressH.style.height = `100%`;
            } else {
                timelineProgressH.style.height = `${p * 100}%`;
                timelineProgressH.style.width = `100%`;
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    // --- Scroll Reveals ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Optional: remove if you want it to trigger only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active', !isActive);
            navMenu.classList.toggle('active', !isActive);
            hamburger.setAttribute('aria-expanded', !isActive);
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }
});
