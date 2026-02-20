document.addEventListener('DOMContentLoaded', () => {
    console.log('Thermax NeO Landing Page Loaded');

    // ========== Mobile Navigation Toggle ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== Hero Slider ==========
                    // display none for button
    const heroBanners = [
        {
            image: 'assets/img889.jpg',
            alignment: 'split',
            content: `
               <div class="hero-content">
                    <h1>Turning Waste into Predictable Bio-CNG Revenue</h1>
                    <p>Thermax Neo designs high-performance Bio-CNG purification systems, guiding the right technology selection, engineered for Indian operating conditions and IS 16087 compliance.</p>
                    <ul class="benefits-list">
                        <li>Bio-CNG Purification Systems (2-32 TPD)</li>
                        <li>96-99% Methane Purity</li>
                        <li>VPSA, PSA, Membrane & Amine Scrubbing Technologies</li>
                    </ul>
                    <a href="#features" class="btn" style="display: none;">Explore Bio-CNG Potential</a>
                </div>
                <div class="hero-form-container">
                    <form id="hero-enquiry-form" class="hero-form">
                        <h3>Talk to a Bio-CNG Expert</h3>
                        <div class="form-group">
                            <label for="hero-name">Name</label>
                            <input type="text" id="hero-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-company">Company</label>
                            <input type="text" id="hero-company" name="company" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-email">Company Email</label>
                            <input type="email" id="hero-email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-mobile">Mobile Number</label>
                            <input type="number" id="hero-mobile" name="mobile" required>
                        </div>
                        <button type="submit" class="btn warning-btn" style="width: 100%;">Submit</button>
                    </form>
                </div>
            `
        },
        {
            image: 'assets/editt.png',
            alignment: 'left',
            content: ``
        },
        {
            image: 'assets/2.png',
            alignment: 'left',
            content: ``
        },
        {
            image: 'assets/image001.jpg',
            alignment: 'left',
            content: ``
        }
    ];

    const heroSliderContainer = document.getElementById('hero-slider');
    const heroPrevBtn = document.getElementById('hero-prev');
    const heroNextBtn = document.getElementById('hero-next');
    let currentHeroSlide = 0;

    if (heroSliderContainer && heroBanners.length > 0) {
        heroSliderContainer.innerHTML = '';

        heroBanners.forEach((banner, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('hero-slide');
            if (index === 0) slideDiv.classList.add('active');

            const img = document.createElement('img');
            img.src = banner.image;
            img.alt = `Hero Banner ${index + 1}`;
            slideDiv.appendChild(img);

            if (banner.content) {
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('hero-slide-content');
                if (banner.alignment) {
                    contentDiv.classList.add(`align-${banner.alignment}`);
                }
                contentDiv.innerHTML = banner.content;
                slideDiv.appendChild(contentDiv);
            }

            heroSliderContainer.appendChild(slideDiv);
        });

        const heroSlides = heroSliderContainer.querySelectorAll('.hero-slide');

        // Hero Form Submission
        const heroForm = document.getElementById('hero-enquiry-form');
        if (heroForm) {
            heroForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = heroForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                const formData = new FormData(heroForm);
                formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Success! Your enquiry has been sent.");
                        heroForm.reset();
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    alert("Something went wrong. Please try again.");
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }

        function showHeroSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            currentHeroSlide = index;
            if (currentHeroSlide < 0) currentHeroSlide = heroSlides.length - 1;
            if (currentHeroSlide >= heroSlides.length) currentHeroSlide = 0;
            heroSlides[currentHeroSlide].classList.add('active');
        }

        if (heroPrevBtn && heroNextBtn) {
            heroPrevBtn.addEventListener('click', () => showHeroSlide(currentHeroSlide - 1));
            heroNextBtn.addEventListener('click', () => showHeroSlide(currentHeroSlide + 1));
        }

    }

    // ========== Gallery Popup ==========
    const galleryData = {
        'project-1': {
            title: 'From Biogas to Commercial-Grade Methane',
            images: [
                'assets/img889.jpg',
                'assets/editt.png',
                'assets/2.png'
            ]
        },
        'project-2': {
            title: 'Consistent Purity Despite Feedstock Variability',
            images: [
                'assets/editt.png',
                'assets/img889.jpg',
                'assets/image001.jpg'
            ]
        },
        'project-3': {
            title: 'Upgrading to Bio-CNG Standards',
            images: [
                'assets/2.png',
                'assets/image001.jpg',
                'assets/img889.jpg'
            ]
        }
    };

    const galleryPopup = document.getElementById('gallery-popup');
    const galleryTitle = document.querySelector('.gallery-title');
    const gallerySlidesContainer = document.querySelector('.gallery-slides');
    const galleryDotsContainer = document.querySelector('.gallery-dots');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    let currentSlide = 0;
    let currentImages = [];

    // Gallery card click removed — no longer needed

    function openGallery(title, images) {
        currentImages = images;
        currentSlide = 0;

        galleryTitle.textContent = title;
        gallerySlidesContainer.innerHTML = '';
        galleryDotsContainer.innerHTML = '';

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${title} - Image ${index + 1}`;
            if (index === 0) img.classList.add('active');
            gallerySlidesContainer.appendChild(img);

            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            galleryDotsContainer.appendChild(dot);
        });

        galleryPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryPopup.classList.remove('active');
        document.body.style.overflow = '';
    }

    function goToSlide(index) {
        const slides = gallerySlidesContainer.querySelectorAll('img');
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    if (galleryPrev) galleryPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (galleryNext) galleryNext.addEventListener('click', () => goToSlide(currentSlide + 1));

    if (galleryPopup) {
        galleryPopup.addEventListener('click', (e) => {
            if (e.target === galleryPopup) closeGallery();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!galleryPopup || !galleryPopup.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // ========== Bottom Contact Form ==========
    const leadForm = document.getElementById('enquiry-form');
    if (leadForm) {
        leadForm.setAttribute('novalidate', true);

        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const companyInput = document.getElementById('company');
            const emailInput = document.getElementById('email');
            const mobileInput = document.getElementById('mobile');

            let isValid = true;

            const setError = (input, errorId, show) => {
                const errorEl = document.getElementById(errorId);
                if (show) {
                    input.classList.add('error');
                    if (errorEl) errorEl.classList.add('visible');
                } else {
                    input.classList.remove('error');
                    if (errorEl) errorEl.classList.remove('visible');
                }
            };

            if (nameInput.value.trim() === '') {
                setError(nameInput, 'name-error', true);
                isValid = false;
            } else {
                setError(nameInput, 'name-error', false);
            }

            if (companyInput.value.trim() === '') {
                setError(companyInput, 'company-error', true);
                isValid = false;
            } else {
                setError(companyInput, 'company-error', false);
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setError(emailInput, 'email-error', true);
                isValid = false;
            } else {
                setError(emailInput, 'email-error', false);
            }

            const phoneRegex = /^[\d\+\-\(\)\s]{7,}$/;
            if (!phoneRegex.test(mobileInput.value.trim())) {
                setError(mobileInput, 'mobile-error', true);
                isValid = false;
            } else {
                setError(mobileInput, 'mobile-error', false);
            }

            if (isValid) {
                const submitBtn = leadForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                const formData = new FormData(leadForm);
                formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Success! Your enquiry has been sent.");
                        leadForm.reset();
                        leadForm.querySelectorAll('input').forEach(i => i.classList.remove('error'));
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    alert("Something went wrong. Please try again.");
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });

        // Real-time error clearing
        ['name', 'company', 'email', 'mobile'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', function () {
                    if (this.classList.contains('error')) {
                        this.classList.remove('error');
                        const errorEl = document.getElementById(field + '-error');
                        if (errorEl) errorEl.classList.remove('visible');
                    }
                });
            }
        });
    }

    // ========== FAB Enquiry Popup ==========
    const fabEnquiryBtn = document.getElementById('fab-enquiry-btn');
    const fabEnquiryPopup = document.getElementById('fab-enquiry-popup');
    const fabEnquiryForm = document.getElementById('fab-enquiry-form');
    const fabEnquiryClose = document.querySelector('.fab-enquiry-close');

    function openFabEnquiryPopup() {
        if (fabEnquiryPopup) {
            fabEnquiryPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFabEnquiryPopup() {
        if (fabEnquiryPopup) {
            fabEnquiryPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (fabEnquiryBtn) fabEnquiryBtn.addEventListener('click', openFabEnquiryPopup);
    if (fabEnquiryClose) fabEnquiryClose.addEventListener('click', closeFabEnquiryPopup);

    if (fabEnquiryPopup) {
        fabEnquiryPopup.addEventListener('click', (e) => {
            if (e.target === fabEnquiryPopup) closeFabEnquiryPopup();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fabEnquiryPopup && fabEnquiryPopup.classList.contains('active')) {
            closeFabEnquiryPopup();
        }
    });

    if (fabEnquiryForm) {
        fabEnquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = fabEnquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const formData = new FormData(fabEnquiryForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    closeFabEnquiryPopup();
                    fabEnquiryForm.reset();
                    alert("Thank you! We will contact you shortly.");
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ========== Floating Buttons Visibility ==========
    const floatingButtons = document.querySelector('.floating-buttons');
    const heroSection = document.querySelector('.hero');

    if (floatingButtons) {
        const toggleFloatingButtons = () => {
            const threshold = heroSection ? heroSection.offsetHeight : 500;
            if (window.scrollY > threshold) {
                floatingButtons.classList.add('visible');
            } else {
                floatingButtons.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleFloatingButtons);
        toggleFloatingButtons();
    }

    // ========== Number Counter Animation ==========
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const observerOptions = { root: null, threshold: 0.5 };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (isNaN(target)) return;

                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ========== Brochure/Case Study Download Popup ==========
    const downloadBtns = document.querySelectorAll('.case-study-download-btn');
    const caseStudyPopup = document.getElementById('case-study-popup');
    const caseStudyForm = document.getElementById('case-study-form');
    const caseStudyClose = document.querySelector('.case-study-close');
    const brochureUrlInput = document.getElementById('brochure-url');
    const productNameInput = document.getElementById('product-name');

    function openCaseStudyPopup() {
        if (caseStudyPopup) {
            caseStudyPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCaseStudyPopup() {
        if (caseStudyPopup) {
            caseStudyPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const brochureUrl = btn.getAttribute('data-brochure');
            const productName = btn.getAttribute('data-product');

            if (brochureUrlInput) brochureUrlInput.value = brochureUrl || '';
            if (productNameInput) productNameInput.value = productName || '';

            // Update popup title if needed (optional)
            const titleEl = caseStudyPopup.querySelector('.case-study-popup-title');
            if (titleEl && productName) {
                titleEl.textContent = `Download Brochure`;
            }

            openCaseStudyPopup();
        });
    });

    if (caseStudyClose) caseStudyClose.addEventListener('click', closeCaseStudyPopup);

    if (caseStudyPopup) {
        caseStudyPopup.addEventListener('click', (e) => {
            if (e.target === caseStudyPopup) closeCaseStudyPopup();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseStudyPopup && caseStudyPopup.classList.contains('active')) {
            closeCaseStudyPopup();
        }
    });

    if (caseStudyForm) {
        caseStudyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = caseStudyForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const formData = new FormData(caseStudyForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            // Use dynamic product name for subject
            const productName = productNameInput ? productNameInput.value : 'Case Study';
            formData.append("subject", `${productName} Download Request`);

            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    closeCaseStudyPopup();
                    caseStudyForm.reset();

                    // Trigger dynamic brochure PDF download
                    const fileUrl = brochureUrlInput ? brochureUrlInput.value : '';
                    if (fileUrl) {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = fileUrl;
                        downloadLink.download = fileUrl.split('/').pop();
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);

                        // Small delay to ensure download starts before alert
                        setTimeout(() => {
                            alert(`Thank you! The brochure is downloading.`);
                        }, 500);
                    } else {
                        alert("Thank you! We will contact you shortly.");
                    }
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ========== Mobile Number 10-Digit Validation ==========
    function setupMobileValidation(mobileId, submitBtn) {
        const mobileInput = document.getElementById(mobileId);
        if (!mobileInput || !submitBtn) return;

        mobileInput.addEventListener('input', function () {
            const digits = this.value.replace(/\D/g, '');
            if (digits.length === 0 || digits.length === 10) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            } else {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
            }
        });
    }

    // Hero form
    const heroSubmitBtn = document.querySelector('#hero-enquiry-form button[type="submit"]');
    setupMobileValidation('hero-mobile', heroSubmitBtn);

    // Contact form
    const contactSubmitBtn = document.querySelector('#enquiry-form button[type="submit"]');
    setupMobileValidation('mobile', contactSubmitBtn);

    // FAB enquiry form
    const fabSubmitBtn = document.querySelector('#fab-enquiry-form button[type="submit"]');
    setupMobileValidation('fab-mobile', fabSubmitBtn);

    // Case study form
    const csSubmitBtn = document.querySelector('#case-study-form button[type="submit"]');
    setupMobileValidation('cs-mobile', csSubmitBtn);

});
