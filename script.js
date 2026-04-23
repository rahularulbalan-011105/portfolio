/* ═══════════════════════════════════════════════════════
   RAHUL A — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Preloader Animation ─── //
    document.body.classList.add('loading');
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');

    // Animate loading bar
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        preloaderFill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.remove('loading');
            }, 400);
        }
    }, 200);


    // ─── Initialize Lucide Icons ─── //
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    // ─── Navbar Scroll Effect ─── //
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        // Add scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    });


    // ─── Mobile Nav Toggle ─── //
    const navToggle = document.getElementById('navToggle');
    const navLinksMenu = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksMenu.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksMenu.classList.remove('open');
        });
    });


    // ─── Counter Animation ─── //
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });

        countersAnimated = true;
    }

    // Trigger counters when hero is in view
    const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) heroObserver.observe(heroSection);


    // ─── Scroll Reveal Animations ─── //
    const revealElements = document.querySelectorAll(
        '.detail-card, .skill-category, .project-card, .zig-step, .contact-card, .contact-form-wrap'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ─── Project Filters ─── //
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category;
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s var(--ease-out) both';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ─── Contact Form (Demo) ─── //
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = document.getElementById('submitBtn');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">✓ Message Sent!</span>';
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                contactForm.reset();
                // Re-initialize icons inside the button
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 3000);
        });
    }


    // ─── Smooth Scroll for anchor links ─── //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ─── Parallax effect on profile card ─── //
    const profileCard = document.querySelector('.profile-card');
    if (profileCard && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 10;
            const y = (clientY / innerHeight - 0.5) * 10;

            profileCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

});
