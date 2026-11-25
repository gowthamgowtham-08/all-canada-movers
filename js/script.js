document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Navigation =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mobileMenu.classList.add('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ===== FAQ Accordion =====
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const answer = toggle.nextElementSibling;
            const icon = toggle.querySelector('.faq-icon');

            // Close other open FAQ items
            faqToggles.forEach(t => {
                if (t !== toggle) {
                    t.setAttribute('aria-expanded', 'false');
                    const otherAnswer = t.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.classList.remove('open');
                    }
                    const otherIcon = t.querySelector('.faq-icon');
                    if (otherIcon) {
                        if (otherIcon.tagName === 'I' && otherIcon.classList.contains('fa-minus')) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        } else if (otherIcon.tagName === 'SPAN' && otherIcon.textContent === '−') {
                            otherIcon.textContent = '+';
                        }
                    }
                }
            });

            if (isExpanded) {
                toggle.setAttribute('aria-expanded', 'false');
                if (answer) {
                    answer.classList.remove('open');
                }
                if (icon) {
                    if (icon.tagName === 'I') {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    } else if (icon.tagName === 'SPAN') {
                        icon.textContent = '+';
                    }
                }
            } else {
                toggle.setAttribute('aria-expanded', 'true');
                if (answer) {
                    answer.classList.add('open');
                }
                if (icon) {
                    if (icon.tagName === 'I') {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else if (icon.tagName === 'SPAN') {
                        icon.textContent = '−';
                    }
                }
            }
        });
    });

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Scroll Reveal =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-subtle, .reveal-fade');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== Back To Top =====
    const backToTopBtn = document.getElementById('back-to-top');
    const floatingBtn = document.getElementById('floating-back-to-top');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (backToTopBtn) backToTopBtn.addEventListener('click', scrollToTop);
    if (floatingBtn) floatingBtn.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            if (floatingBtn) floatingBtn.classList.add('visible');
        } else {
            if (floatingBtn) floatingBtn.classList.remove('visible');
        }
    });

    // ===== EmailJS Initialization =====
    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: "L7tBY1dSsHqDVqAW6"
        });
    } else {
        console.error("EmailJS library is not loaded.");
    }

    // ===== Logistics Toast Notification =====
    function showSuccessToast(title, message) {
        const existingContainer = document.getElementById('toast-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-notification-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');

        const card = document.createElement('div');
        card.className = 'toast-notification-card';
        card.setAttribute('role', 'alert');

        card.innerHTML = `
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ED1C24] flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                <i class="fas fa-check text-white text-[15px] sm:text-[16px]"></i>
            </div>
            <div class="flex-1 min-w-0 pr-1">
                <h4 class="text-[#0B1F33] text-[13.5px] sm:text-[14.5px] font-extrabold uppercase tracking-wide leading-snug mb-1 m-0">${title}</h4>
                <p class="text-slate-600 text-[12.5px] sm:text-[13.5px] leading-relaxed m-0">${message}</p>
            </div>
            <button type="button" aria-label="Close notification" class="toast-close-btn text-slate-400 hover:text-[#0B1F33] transition-colors p-1 -mt-1 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/30 shrink-0 cursor-pointer bg-transparent border-none">
                <i class="fas fa-times text-[13px] sm:text-[14px]"></i>
            </button>
        `;

        container.appendChild(card);
        document.body.appendChild(container);

        let dismissTimer = setTimeout(dismissToast, 5500);

        function dismissToast() {
            clearTimeout(dismissTimer);
            card.classList.add('toast-exit');
            setTimeout(() => {
                if (container.parentNode) {
                    container.remove();
                }
            }, 220);
        }

        const closeBtn = card.querySelector('.toast-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', dismissToast);
        }
    }

    // ===== Hero Quote Form =====
    const heroForm = document.getElementById("hero-quote-form");
    const heroSubmitBtn = document.getElementById("hero-submit-btn") || (heroForm ? heroForm.querySelector('button[type="submit"]') : null);
    const heroSubmitText = document.getElementById("hero-submit-text") || (heroSubmitBtn ? heroSubmitBtn.querySelector('span') : null);
    const heroMsgBox = document.getElementById("hero-form-message");

    if (heroForm) {
        heroForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Check required fields
            if (!heroForm.checkValidity()) {
                heroForm.reportValidity();
                return;
            }

            // Disable button
            if (heroSubmitBtn) {
                heroSubmitBtn.disabled = true;
                heroSubmitBtn.style.opacity = "0.7";
                heroSubmitBtn.style.cursor = "not-allowed";
            }

            // Change button text
            if (heroSubmitText) {
                heroSubmitText.textContent = "SENDING...";
            }

            // Clear previous error messages
            if (heroMsgBox) {
                heroMsgBox.textContent = "";
                heroMsgBox.classList.add("hidden");
                heroMsgBox.classList.remove("text-red-600", "text-green-600");
            }

            // Send email through EmailJS
            if (typeof emailjs !== "undefined") {
                emailjs.sendForm(
                    "service_kib40pi",
                    "template_2lo1kbt",
                    heroForm
                )
                .then(function (response) {
                    console.log(
                        "Hero Form Email sent successfully:",
                        response.status,
                        response.text
                    );

                    // Show professional logistics toast notification
                    showSuccessToast(
                        "QUOTE REQUEST RECEIVED",
                        "Your quote request has been submitted successfully.<br>Our team will review your details and contact you within 24 hours."
                    );

                    // Ensure inline message remains hidden
                    if (heroMsgBox) {
                        heroMsgBox.classList.add("hidden");
                        heroMsgBox.textContent = "";
                    }

                    // Change button
                    if (heroSubmitText) {
                        heroSubmitText.textContent = "REQUEST SENT ✓";
                    }

                    // Reset form
                    heroForm.reset();

                    // Restore button after 5 seconds
                    setTimeout(function () {
                        if (heroSubmitText) {
                            heroSubmitText.textContent = "GET FREE ESTIMATE →";
                        }
                    }, 5000);
                })
                .catch(function (error) {
                    console.error("Hero Form EmailJS Error:", error);

                    // Error message
                    if (heroMsgBox) {
                        heroMsgBox.textContent =
                            "Unable to send your request. Please try again or call us at 855-866-8377.";
                        heroMsgBox.classList.remove("hidden");
                        heroMsgBox.classList.add("text-red-600");
                    }

                    // Restore button
                    if (heroSubmitText) {
                        heroSubmitText.textContent = "GET FREE ESTIMATE →";
                    }
                })
                .finally(function () {
                    // Enable button
                    if (heroSubmitBtn) {
                        heroSubmitBtn.disabled = false;
                        heroSubmitBtn.style.opacity = "1";
                        heroSubmitBtn.style.cursor = "pointer";
                    }
                });
            } else {
                console.error("EmailJS library not loaded");
                if (heroMsgBox) {
                    heroMsgBox.textContent = "Email service is temporarily unavailable. Please call us at 855-866-8377.";
                    heroMsgBox.classList.remove("hidden");
                    heroMsgBox.classList.add("text-red-600");
                }
                if (heroSubmitBtn) {
                    heroSubmitBtn.disabled = false;
                    heroSubmitBtn.style.opacity = "1";
                    heroSubmitBtn.style.cursor = "pointer";
                }
                if (heroSubmitText) {
                    heroSubmitText.textContent = "GET FREE ESTIMATE →";
                }
            }
        });
    }

    // ===== Contact Page Form =====
    const contactForm = document.getElementById("contact-page-form");
    const contactSubmitBtn = document.getElementById("contact-submit-btn") || (contactForm ? contactForm.querySelector('button[type="submit"]') : null);
    const contactSubmitText = document.getElementById("contact-submit-text") || (contactSubmitBtn ? contactSubmitBtn.querySelector('span') : null);
    const contactMsgBox = document.getElementById("contact-form-message");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Check required fields
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Disable button
            if (contactSubmitBtn) {
                contactSubmitBtn.disabled = true;
                contactSubmitBtn.style.opacity = "0.7";
                contactSubmitBtn.style.cursor = "not-allowed";
            }

            // Change button text
            if (contactSubmitText) {
                contactSubmitText.textContent = "SENDING...";
            }

            // Clear previous message
            if (contactMsgBox) {
                contactMsgBox.textContent = "";
                contactMsgBox.classList.add("hidden");
                contactMsgBox.classList.remove("text-red-600", "text-green-600");
            }

            // Send form using EmailJS
            if (typeof emailjs !== "undefined") {
                emailjs.sendForm(
                    "service_w0uk70w",
                    "template_imlinud",
                    contactForm
                )
                .then(function (response) {
                    console.log(
                        "Contact Form Email sent successfully:",
                        response.status,
                        response.text
                    );

                    // Show professional logistics toast notification
                    showSuccessToast(
                        "QUOTE REQUEST RECEIVED",
                        "Your quote request has been submitted successfully.<br>Our team will review your details and contact you within 24 hours."
                    );

                    // Ensure inline message remains hidden
                    if (contactMsgBox) {
                        contactMsgBox.classList.add("hidden");
                        contactMsgBox.textContent = "";
                    }

                    // Change button text
                    if (contactSubmitText) {
                        contactSubmitText.textContent = "QUOTE REQUEST SENT ✓";
                    }

                    // Reset form
                    contactForm.reset();

                    // Restore button after 5 seconds
                    setTimeout(function () {
                        if (contactSubmitText) {
                            contactSubmitText.textContent = "REQUEST A FREE QUOTE";
                        }
                    }, 5000);
                })
                .catch(function (error) {
                    console.error("Contact Form EmailJS Error:", error);

                    if (contactMsgBox) {
                        contactMsgBox.textContent = "Sorry, we could not send your request. Please try again or call us at 855-866-8377.";
                        contactMsgBox.classList.remove("hidden");
                        contactMsgBox.classList.add("text-red-600");
                    }

                    if (contactSubmitText) {
                        contactSubmitText.textContent = "REQUEST A FREE QUOTE";
                    }
                })
                .finally(function () {
                    if (contactSubmitBtn) {
                        contactSubmitBtn.disabled = false;
                        contactSubmitBtn.style.opacity = "1";
                        contactSubmitBtn.style.cursor = "pointer";
                    }
                });
            } else {
                console.error("EmailJS library not loaded");
                if (contactMsgBox) {
                    contactMsgBox.textContent = "Email service is temporarily unavailable. Please call us at 855-866-8377.";
                    contactMsgBox.classList.remove("hidden");
                    contactMsgBox.classList.add("text-red-600");
                }
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = false;
                    contactSubmitBtn.style.opacity = "1";
                    contactSubmitBtn.style.cursor = "pointer";
                }
                if (contactSubmitText) {
                    contactSubmitText.textContent = "REQUEST A FREE QUOTE";
                }
            }
        });
    }

    // ===== Sticky Header =====
    const siteHeader = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (siteHeader) {
            if (window.scrollY > 10) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    });
});
// ===== Pricing UI =====
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.pricing-tab');
    const panels = document.querySelectorAll('.pricing-panel');
    
    if (tabs.length === 0 || panels.length === 0) return;
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            if (tab.getAttribute('aria-selected') === 'true') return;
            
            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
            });
            
            tab.setAttribute('aria-selected', 'true');
            
            const currentPanel = document.querySelector('.pricing-panel:not(.hidden)');
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const duration = prefersReducedMotion ? 0 : 250;
            
            if (currentPanel) {
                if (!prefersReducedMotion) {
                    currentPanel.style.opacity = '0';
                    currentPanel.style.transform = 'translateY(8px)';
                }
                
                setTimeout(() => {
                    currentPanel.classList.add('hidden');
                    if (prefersReducedMotion) {
                        currentPanel.style.opacity = '0';
                        currentPanel.style.transform = 'translateY(8px)';
                    }
                    
                    const newPanel = document.getElementById(`panel-${index}`);
                    if (newPanel) {
                        newPanel.classList.remove('hidden');
                        void newPanel.offsetWidth;
                        newPanel.style.opacity = '1';
                        newPanel.style.transform = 'translateY(0)';
                    }
                }, duration);
            }
        });
        
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });

    // ===== Interactive Image Spotlight & Feature Tab Switcher =====
    const spotlightTabs = document.querySelectorAll('.spotlight-tab-btn');
    const spotlightSlides = document.querySelectorAll('.spotlight-image-slide');
    const routeNodes = [
        document.getElementById('route-node-1'),
        document.getElementById('route-node-2'),
        document.getElementById('route-node-3'),
        document.getElementById('route-node-4')
    ];

    function activateSpotlight(id) {
        spotlightTabs.forEach(btn => {
            const btnId = btn.getAttribute('data-spotlight');
            const numEl = btn.querySelector('.tab-num');
            const barEl = btn.querySelector('.tab-bar');
            const titleEl = btn.querySelector('.tab-title');
            const isBlue = btnId === '3';

            if (btnId === id) {
                btn.classList.add('active', 'bg-white', 'shadow-md');
                btn.classList.remove('bg-white/70', 'border-transparent');
                btn.setAttribute('aria-selected', 'true');
                btn.setAttribute('tabindex', '0');

                if (isBlue) {
                    btn.classList.add('border-brandBlue');
                    if (numEl) { numEl.classList.add('text-brandBlue'); numEl.classList.remove('text-gray-400'); }
                    if (barEl) { barEl.classList.add('w-12', 'bg-brandBlue'); barEl.classList.remove('w-6', 'bg-gray-300'); }
                } else {
                    btn.classList.add('border-brandRed');
                    if (numEl) { numEl.classList.add('text-brandRed'); numEl.classList.remove('text-gray-400'); }
                    if (barEl) { barEl.classList.add('w-12', 'bg-brandRed'); barEl.classList.remove('w-6', 'bg-gray-300'); }
                }
                if (titleEl) titleEl.classList.remove('text-[#0B1F33]/70');
            } else {
                btn.classList.remove('active', 'bg-white', 'shadow-md', 'border-brandRed', 'border-brandBlue');
                btn.classList.add('bg-white/70', 'border-transparent');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');

                if (numEl) { numEl.classList.remove('text-brandRed', 'text-brandBlue'); numEl.classList.add('text-gray-400'); }
                if (barEl) { barEl.classList.remove('w-12', 'bg-brandRed', 'bg-brandBlue'); barEl.classList.add('w-6', 'bg-gray-300'); }
                if (titleEl) titleEl.classList.add('text-[#0B1F33]/70');
            }
        });

        spotlightSlides.forEach((slide, idx) => {
            const slideId = (idx + 1).toString();
            if (slideId === id) {
                slide.classList.remove('opacity-0', 'scale-105', 'z-0', 'pointer-events-none');
                slide.classList.add('opacity-100', 'scale-100', 'z-10');
            } else {
                slide.classList.remove('opacity-100', 'scale-100', 'z-10');
                slide.classList.add('opacity-0', 'scale-105', 'z-0', 'pointer-events-none');
            }
        });

        routeNodes.forEach((node, idx) => {
            if (node) {
                if ((idx + 1).toString() === id) {
                    node.setAttribute('r', '8');
                    node.style.opacity = '1';
                } else {
                    node.setAttribute('r', '5');
                    node.style.opacity = '0.4';
                }
            }
        });
    }

    spotlightTabs.forEach((tab, index) => {
        const id = tab.getAttribute('data-spotlight');

        tab.addEventListener('mouseenter', () => activateSpotlight(id));
        tab.addEventListener('click', () => activateSpotlight(id));
        
        tab.addEventListener('keydown', (e) => {
            let nextIndex = null;
            if (e.key === 'ArrowRight') {
                nextIndex = (index + 1) % spotlightTabs.length;
            } else if (e.key === 'ArrowLeft') {
                nextIndex = (index - 1 + spotlightTabs.length) % spotlightTabs.length;
            }
            if (nextIndex !== null) {
                e.preventDefault();
                spotlightTabs[nextIndex].focus();
                activateSpotlight(spotlightTabs[nextIndex].getAttribute('data-spotlight'));
            }
        });
    });
});

// ===== Blog Category Filter & Tab Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const blogTabs = document.querySelectorAll('.blog-tab-btn');
    const articleCards = document.querySelectorAll('.article-card');
    const noArticlesMsg = document.getElementById('no-articles-message');

    if (blogTabs.length === 0 || articleCards.length === 0) return;

    function filterBlogCategory(category, activeTab) {
        // Update active tab styles
        blogTabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.classList.remove('bg-[#087FCA]', 'text-white', 'border-[#087FCA]');
            t.classList.add('bg-white', 'text-slate-600', 'border-slate-300');
        });

        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
            activeTab.classList.remove('bg-white', 'text-slate-600', 'border-slate-300');
            activeTab.classList.add('bg-[#087FCA]', 'text-white', 'border-[#087FCA]');
        }

        // Filter cards
        let visibleCount = 0;
        articleCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (noArticlesMsg) {
            if (visibleCount === 0) {
                noArticlesMsg.classList.remove('hidden');
            } else {
                noArticlesMsg.classList.add('hidden');
            }
        }
    }

    blogTabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tab.getAttribute('data-category');
            filterBlogCategory(category, tab);
        });

        tab.addEventListener('keydown', (e) => {
            let targetTab = null;
            if (e.key === 'ArrowRight') {
                targetTab = blogTabs[(index + 1) % blogTabs.length];
            } else if (e.key === 'ArrowLeft') {
                targetTab = blogTabs[(index - 1 + blogTabs.length) % blogTabs.length];
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }

            if (targetTab) {
                e.preventDefault();
                targetTab.focus();
                targetTab.click();
            }
        });
    });
});