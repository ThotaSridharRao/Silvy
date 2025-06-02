const video = document.getElementById('bg-vid');
video.playbackRate = 0.75;
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo'); // This refers to the video *inside* the content wrapper
    const playButton = document.getElementById('playButton');

    // Mute video by default (important for autoplay in most browsers)
    video.muted = true;

    // Autoplay the video and hide the play button
    video.play().catch(error => {
      // Autoplay was prevented, show play button
      playButton.style.display = 'flex';
      console.error("Autoplay prevented:", error);
    });
    playButton.style.display = 'none'; // Initially hide the button

    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playButton.style.display = 'none';
      } else {
        video.pause();
        playButton.style.display = 'flex'; // Show button when paused
      }
    });

    // Show play button if video ends or is paused externally
    video.addEventListener('pause', () => {
      playButton.style.display = 'flex';
    });

    video.addEventListener('ended', () => {
      playButton.style.display = 'flex';
    });

    // Hide play button when video starts playing (e.g., if autoplay was enabled or user clicks on video)
    video.addEventListener('play', () => {
      playButton.style.display = 'none';
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
        // Video play/pause logic for the hero section
        const video = document.getElementById('heroVideo');
        const playButton = document.getElementById('playButton');

        if (video && playButton) { // Ensure elements exist before adding listeners
            video.muted = true; // Mute video by default

            video.play().catch(error => {
                playButton.style.display = 'flex';
                console.error("Autoplay prevented for hero video:", error);
            });
            playButton.style.display = 'none'; // Initially hide the button

            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });

            video.addEventListener('pause', () => {
                playButton.style.display = 'flex';
            });

            video.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });

            video.addEventListener('play', () => {
                playButton.style.display = 'none';
            });
        }


        // Animation logic for the "How We Work?" section
        const cards = document.querySelectorAll('.card');
        const thirdCard = document.getElementById('thirdCard');
        const imageWrapper = document.getElementById('imageWrapper');
        const nextSection = document.getElementById('nextSection');
        let scrollTriggered = false;

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = parseInt(card.dataset.animationOrder) * 150;
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach(card => {
            cardObserver.observe(card);
        });

        const nextSectionScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const thirdCardRect = thirdCard.getBoundingClientRect();
                const imageWrapperRect = imageWrapper.getBoundingClientRect();

                const triggerPoint = imageWrapperRect.top - 20;

                if (thirdCardRect.bottom <= triggerPoint && !scrollTriggered) {
                    scrollTriggered = true;
                    window.scrollTo({
                        top: nextSection.offsetTop,
                        behavior: 'smooth'
                    });
                    nextSectionScrollObserver.disconnect();
                }
            });
        }, {
            threshold: 0
        });

        nextSectionScrollObserver.observe(thirdCard);
    });
    const leftCol = document.querySelector('.left-column');
    const rightCol = document.querySelector('.right-column');

    function matchHeights() {
      rightCol.style.height = `${leftCol.offsetHeight}px`;
    }

    // Run on load and resize
    window.addEventListener('load', matchHeights);
    window.addEventListener('resize', matchHeights);

    document.addEventListener('DOMContentLoaded', () => {
        const heroVideo = document.getElementById('heroVideo');
        const playButton = document.getElementById('playButton');

        if (heroVideo && playButton) {
            heroVideo.muted = true;

            heroVideo.play().catch(error => {
                playButton.style.display = 'flex';
                console.error("Autoplay prevented for hero video:", error);
            });

            // Initially hide the play button if the video attempts to play
            heroVideo.addEventListener('play', () => {
                playButton.style.display = 'none';
            });

            playButton.addEventListener('click', () => {
                if (heroVideo.paused) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });

            heroVideo.addEventListener('pause', () => {
                playButton.style.display = 'flex';
            });

            heroVideo.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });
        }

        // Animation logic for the "How We Work?" section
        const cards = document.querySelectorAll('.card');
        const thirdCard = document.getElementById('thirdCard');
        const imageWrapper = document.getElementById('imageWrapper');
        const nextSection = document.getElementById('nextSection');
        let scrollTriggered = false;

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = parseInt(card.dataset.animationOrder) * 150;
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach(card => {
            cardObserver.observe(card);
        });

        const nextSectionScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (thirdCard && imageWrapper && nextSection && !scrollTriggered) {
                    const thirdCardRect = thirdCard.getBoundingClientRect();
                    const imageWrapperRect = imageWrapper.getBoundingClientRect();

                    // Adjust the trigger point relative to the imageWrapper's top
                    // This means the scroll will trigger when the third card's bottom
                    // reaches 20px above the imageWrapper's top
                    const triggerPoint = imageWrapperRect.top - 20;

                    if (thirdCardRect.bottom <= triggerPoint) {
                        scrollTriggered = true;
                        window.scrollTo({
                            top: nextSection.offsetTop,
                            behavior: 'smooth'
                        });
                        nextSectionScrollObserver.disconnect();
                    }
                }
            });
        }, {
            threshold: 0
        });

        // Only observe the third card if it exists
        if (thirdCard) {
            nextSectionScrollObserver.observe(thirdCard);
        }


        // Match heights of left and right columns in "How We Work?" section
        const leftCol = document.querySelector('.left-column');
        const rightCol = document.querySelector('.right-column');

        function matchHeights() {
            if (leftCol && rightCol) {
                rightCol.style.height = `${leftCol.offsetHeight}px`;
            }
        }

        // Run on load and resize
        window.addEventListener('load', matchHeights);
        window.addEventListener('resize', matchHeights);
    });
    
    
    document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header'); // Make sure your header tag or class matches this
    let lastScrollTop = 0;

    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        header.style.transition = 'top 0.3s ease-in-out';

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.top = '-100px'; // Adjust this if your header height is different
            } else {
                // Scrolling up
                header.style.top = '0';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    const navLinks = primaryNav.querySelectorAll('a'); // Get all navigation links

    // On mobile, the CTA button is inside the nav. On desktop, it's separate.
    // We'll manage its visibility purely through CSS with the new HTML structure.
    // No direct JS manipulation of the CTA button's display is needed here for simple hide/show.

    menuToggle.addEventListener('click', function() {
        primaryNav.classList.toggle('active');
        menuToggle.classList.toggle('active'); // For hamburger animation
    });

    // Close the menu when a navigation link is clicked (for anchor links)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the menu is currently active (open)
            if (primaryNav.classList.contains('active')) {
                primaryNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Optional: Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        // Check if the click is inside the primary navigation OR on the menu toggle button
        const isClickInsideNav = primaryNav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        // If the menu is active AND the click is outside both the nav and the toggle
        if (primaryNav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            primaryNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Handle screen resize: If resized to desktop, ensure menu is closed and active classes removed
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) { // Assuming 768px is your breakpoint
            if (primaryNav.classList.contains('active')) {
                primaryNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('is-active');
    });
}
});
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