document.addEventListener('DOMContentLoaded', () => {
    console.log('Thermax Landing Page Scripts Loaded');

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // Generic Form Handler Function
    function setupFormValidation(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.setAttribute('novalidate', true);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Dynamic ID prefixes based on form to find inputs (assuming ids are uniquely suffixed or we search within form)
            // But here inputs have unique IDs in HTML: hero uses 'name', footer uses 'f-name'
            // To make this reusable without strict ID naming, we can query selectors.
            // However, seeing index.html, hero inputs are "name", "email"... Footer inputs are "f-name", "f-email"...

            // Let's Map inputs based on formId
            const isFooter = formId === 'footer-lead-form';
            const prefix = isFooter ? 'f-' : '';

            const nameInput = document.getElementById(`${prefix}name`);
            const companyInput = document.getElementById(`${prefix}company`);
            const emailInput = document.getElementById(`${prefix}email`);
            const phoneInput = document.getElementById(`${prefix}phone`);

            let isValid = true;

            // Helper to set error
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

            // Validation Logic
            if (nameInput.value.trim() === '') {
                setError(nameInput, `${prefix}name-error`, true);
                isValid = false;
            } else {
                setError(nameInput, `${prefix}name-error`, false);
            }

            if (companyInput.value.trim() === '') {
                setError(companyInput, `${prefix}company-error`, true);
                isValid = false;
            } else {
                setError(companyInput, `${prefix}company-error`, false);
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setError(emailInput, `${prefix}email-error`, true);
                isValid = false;
            } else {
                setError(emailInput, `${prefix}email-error`, false);
            }

            const phoneRegex = /^[\d\+\-\(\)\s]{7,}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                setError(phoneInput, `${prefix}phone-error`, true);
                isValid = false;
            } else {
                setError(phoneInput, `${prefix}phone-error`, false);
            }

            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;

                // Construct FormData
                const formData = new FormData(form);
                formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(`Thank you, ${nameInput.value}! Your enquiry has been sent successfully.`);
                        form.reset();
                        // Clear errors visually
                        form.querySelectorAll('input').forEach(i => i.classList.remove('error'));
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    console.error("Submission error:", error);
                    alert("Something went wrong. Please try again.");
                } finally {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            }
        });

        // Real-time validation removal
        ['name', 'company', 'email', 'phone'].forEach(field => {
            const isFooter = formId === 'footer-lead-form';
            const prefix = isFooter ? 'f-' : '';
            const id = `${prefix}${field}`;

            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function () {
                    if (this.classList.contains('error')) {
                        this.classList.remove('error');
                        const errorEl = document.getElementById(id + '-error');
                        if (errorEl) errorEl.classList.remove('visible');
                    }
                });
            }
        });
    }

    // Initialize Forms
    setupFormValidation('lead-form');
    setupFormValidation('footer-lead-form');
});
