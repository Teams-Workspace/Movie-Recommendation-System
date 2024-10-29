/* ========== NAVBAR-DROPDOWN  JS Code START ========== */

// Toggle dropdown menu when clicking the dropdown element
function toggleNavDropdown(event) {
    event.stopPropagation();
    const dropdown = event.currentTarget.querySelector('.dropdown-menu');
    const isDropdownVisible = dropdown.style.display === 'block';

    // Toggle dropdown visibility
    dropdown.style.display = isDropdownVisible ? 'none' : 'block';
}

// Select all dropdown elements
const dropdownItems = document.querySelectorAll('.nav-items.dropdown');

// Add event listener to each dropdown item
dropdownItems.forEach(item => {
    item.addEventListener('click', toggleNavDropdown);
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    });
});

/* ========== NAVBAR-DROPDOWN  JS Code END ========== */

/* ========== USER-DROPDOWN  JS Code Start ========== */

// Function to toggle the first user dropdown
function toggleUserDropdown1(event) {
    event.stopPropagation();
    const userDropdown1 = document.querySelector('.user-dropdown');

    if (userDropdown1) {
        userDropdown1.classList.toggle('active');
    }
}

// Function to toggle the second responsive user dropdown
function toggleUserDropdown2(event) {
    event.stopPropagation();
    const responsiveUserDropdown = document.querySelector('.responsive-user-dropdown');

    if (responsiveUserDropdown) {
        responsiveUserDropdown.classList.toggle('active');
    }
}

// Select the user logo elements
const userLogo1 = document.querySelector('#userLogo1');
const userLogo2 = document.querySelector('#userLogo2');

// Add event listeners to the user logos
userLogo1.addEventListener('click', toggleUserDropdown1);
userLogo2.addEventListener('click', toggleUserDropdown2);

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    const userDropdown1 = document.querySelector('.user-dropdown');
    const responsiveUserDropdown = document.querySelector('.responsive-user-dropdown');

    if (userDropdown1 && !userLogo1.contains(event.target)) {
        userDropdown1.classList.remove('active');
    }

    if (responsiveUserDropdown && !userLogo2.contains(event.target)) {
        responsiveUserDropdown.classList.remove('active');
    }
});
/* ========== USER-DROPDOWN  JS Code END ========== */

/* ========== NAV-ICON -DROPDOWN  JS Code START ========== */

// Selecting the menu toggle icon and the nav links
const toggleMenu = document.querySelector('.toggle-menu');
const navLinks = document.getElementById('responsive-nav');
const links = document.querySelectorAll('.nav-links a');

// Function to close the dropdown
const closeDropdown = () => {
    navLinks.style.display = 'none'; // Hide menu
};

// Event listener for the menu toggle
toggleMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    // Toggle the display property of navLinks
    if (navLinks.style.display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'block'; // Show menu
    } else {
        navLinks.style.display = 'none';  // Hide menu
    }
});

// Event listener for each link inside the dropdown
links.forEach(link => {
    link.addEventListener('click', () => {
        // Close the dropdown when a link is clicked
        closeDropdown();
    });
});

// Event listener to close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    // Check if the click is outside of navLinks and toggleMenu
    if (!navLinks.contains(event.target) && !toggleMenu.contains(event.target)) {
        closeDropdown(); // Close the dropdown
    }
});

/* ========== NAV-ICON -DROPDOWN  JS Code END ========== */

/* ========== SLIDER  Code Start ========== */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('#slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Ensure the initial active class is set
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
    }

    function nextSlide() {
        slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        slides[currentSlide].style.transform = 'translateX(-100%)';
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.transition = 'none';
        slides[currentSlide].style.transform = 'translateX(100%)';
        setTimeout(() => {
            slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            slides[currentSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.opacity = '1';
        }, 20); // Short delay to ensure transition applies
    }

    function prevSlide() {
        slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        slides[currentSlide].style.transform = 'translateX(100%)';
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].style.transition = 'none';
        slides[currentSlide].style.transform = 'translateX(-100%)';
        setTimeout(() => {
            slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            slides[currentSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.opacity = '1';
        }, 20); // Short delay to ensure transition applies
    }

    nextArrow.addEventListener('click', nextSlide);
    prevArrow.addEventListener('click', prevSlide);

    setInterval(nextSlide, slideInterval);
});



/* ========== SLIDER  Code End ========== */