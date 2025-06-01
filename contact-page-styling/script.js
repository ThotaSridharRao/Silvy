
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    const body = document.body;
    const header = document.querySelector('.main-header'); // Header for scroll effect and height

    // Check if essential header elements exist
    if (menuToggle && primaryNav && header) {
        // --- Mobile Menu Toggle Logic ---
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            primaryNav.classList.toggle('active'); // Changed from 'mobile-active' to 'active'
            body.classList.toggle('menu-open'); // Prevent body scroll when menu is open
        });

        // Close menu when clicking on nav links (for mobile view)
        const navLinks = primaryNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Check if in mobile view (screen width less than 768px) and menu is open
                if (window.innerWidth < 768 && primaryNav.classList.contains('active')) { // Changed from 'mobile-active' to 'active'
                    menuToggle.classList.remove('active');
                    primaryNav.classList.remove('active'); // Changed from 'mobile-active' to 'active'
                    body.classList.remove('menu-open');
                }
            });
        });

        // Close menu when clicking outside of it (for mobile view)
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 768 && primaryNav.classList.contains('active')) { // Changed from 'mobile-active' to 'active'
                // Check if the click is outside the menu toggle and the primary navigation
                if (!menuToggle.contains(e.target) && !primaryNav.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    primaryNav.classList.remove('active'); // Changed from 'mobile-active' to 'active'
                    body.classList.remove('menu-open');
                }
            }
        });

        // Handle window resize to ensure correct menu state
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // If resized to desktop/tablet view
                if (menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                }
                if (primaryNav.classList.contains('active')) { // Changed from 'mobile-active' to 'active'
                    primaryNav.classList.remove('active'); // Changed from 'mobile-active' to 'active'
                }
                if (body.classList.contains('menu-open')) {
                    body.classList.remove('menu-open');
                }
            }
        });

        // --- Header Scroll Hide/Show Logic ---
        let lastScrollY = 0; // Tracks last scroll position
        // Ensure header height is read after layout is stable
        let headerHeight = header.offsetHeight; 
        
        // Recalculate header height on resize or after potential DOM changes if needed
        const updateHeaderHeight = () => {
            headerHeight = header.offsetHeight;
        };
        window.addEventListener('resize', updateHeaderHeight); // Update on resize

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            // Only act if header is not covered by the mobile menu (prevents flicker)
            // Or if we are in desktop view (where mobile menu is display: none)
            if (!primaryNav.classList.contains('active') || window.innerWidth >= 768) { // Changed from 'mobile-active' to 'active'
                if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
                    // Scrolling down AND scrolled past header height
                    header.style.top = `-${headerHeight + 10}px`; // Hide header (10px buffer)
                } else {
                    // Scrolling up OR at the very top of the page
                    header.style.top = '0'; // Show header
                }
            }
            lastScrollY = currentScrollY; // Update last scroll position
        });

    } else {
        console.error('Essential header elements not found: .menu-toggle, .primary-nav, or .main-header. Header functionality may be affected.');
    }

    // --- Other JavaScripts (cleaned up to only include relevant parts for provided HTML) ---
    // Animation Logic for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Add the class to trigger the animation
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (Your existing JavaScript code for menu toggle, header scroll, and fade-in elements) ...

    // --- Contact Form Submission Logic ---
    const contactForm = document.querySelector('.contact-form-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Check if message already exists to avoid re-adding on subsequent submits
            let successMessageDiv = document.getElementById('form-success-message');
            if (!successMessageDiv) {
                // 1. Create the success message element
                successMessageDiv = document.createElement('div');
                successMessageDiv.id = 'form-success-message';
                successMessageDiv.innerHTML = `
                    <h3>Thank You!</h3>
                    <p>Your response has been recorded. We will reach out to you as soon as possible.</p>
                `;

                // 2. Apply dynamic CSS styles for the message
                successMessageDiv.style.cssText = `
                    margin-top: 30px; /* Added margin-top to separate from button */
                    padding: 25px;
                    background-color: #00000052; /* Using a slightly transparent dark background */
                    border: 5px solid var(--primary-color); /* Using your primary color for the border */
                    border-radius: var(--border-radius-lg); /* Using your border-radius variable */
                    color: var(--text-color-light); /* Light text color */
                    text-align: center;
                    font-family: 'Inter', sans-serif; /* Consistent font */
                    opacity: 0; /* Start hidden for fade-in */
                    transform: translateY(20px); /* Start slightly below for animation */
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    max-width: 100%; /* Ensure it fits within its parent */
                    box-sizing: border-box; /* Include padding and border in element's total width and height */
                `;

                // 3. Append the message *inside* the form element
                contactForm.appendChild(successMessageDiv);
            }


            // Trigger fade-in animation
            // Ensure visibility properties are set after appending
            setTimeout(() => {
                successMessageDiv.style.opacity = '1';
                successMessageDiv.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure CSS is applied before animation

            // 4. Clear the form fields
            const inputFields = contactForm.querySelectorAll('input, textarea, select');
            inputFields.forEach(field => {
                field.value = ''; // Clear value
            });

            // Optional: Disable the submit button to prevent multiple submissions
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#5a57a5'; // A slightly subdued color
                submitButton.style.cursor = 'not-allowed';
            }
        });
    } else {
        console.error('Contact form not found. Submission logic may not work.');
    }
});