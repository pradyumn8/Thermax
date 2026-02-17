document.addEventListener('DOMContentLoaded', () => {
    console.log('Thermax Landing Page Scripts Loaded');

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

    // Simple Form Validation
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulation of form submission
            alert(`Thank you, ${nameInput.value}! We will contact you at ${emailInput.value} shortly.`);
            leadForm.reset();
        });
    }
});
