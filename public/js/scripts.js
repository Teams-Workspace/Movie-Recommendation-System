/* ========== NAVBAR-DROPDOWN  JS Code START ========== */

// Toggle dropdown menu visibility
function toggleNavDropdown(event) {
    event.stopPropagation();
    const dropdown = event.currentTarget.querySelector('.dropdown-menu');
    const isDropdownVisible = dropdown.style.display === 'block';
    
    // Toggle dropdown visibility
    dropdown.style.display = isDropdownVisible ? 'none' : 'block';
}

// Select all dropdown elements and add event listeners
const dropdownItems = document.querySelectorAll('.nav-items.dropdown');
dropdownItems.forEach(item => {
    item.addEventListener('click', toggleNavDropdown);
});

// Close dropdowns when clicking outside
document.addEventListener('click', function () {
    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        dropdown.style.display = 'none';
    });
});

/* ========== NAVBAR-DROPDOWN  JS Code END ========== */


/* ========== USER-DROPDOWN  JS Code START ========== */
// Function to toggle the first user dropdown for non-responsive view
function toggleUserDropdown1(event) {
    event.stopPropagation();
    const userDropdown1 = document.querySelector('.user-dropdown');
    userDropdown1?.classList.toggle('active');
}

// Function to toggle the second user dropdown for responsive view
function toggleUserDropdown2(event) {
    event.stopPropagation();
    const responsiveUserDropdown = document.querySelector('.responsive-user-dropdown');
    responsiveUserDropdown?.classList.toggle('active');
}

// Select user logo elements for both views
const userLogo1 = document.querySelector('#userLogo1');
const userLogo2 = document.querySelector('#userLogo2');

// Add event listeners if elements exist
if (userLogo1) {
    userLogo1.addEventListener('click', toggleUserDropdown1);
}
if (userLogo2) {
    userLogo2.addEventListener('click', toggleUserDropdown2);
}

// Close user dropdowns when clicking outside
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


/* ========== NAV-ICON DROPDOWN  JS Code START ========== */

// Selecting the menu toggle icon and responsive nav links
const toggleMenu = document.querySelector('.toggle-menu');
const navLinks = document.getElementById('responsive-nav');
const links = document.querySelectorAll('.nav-links a');

// Toggle menu visibility
toggleMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when a link inside it is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !toggleMenu.contains(event.target)) {
        navLinks.style.display = 'none';
    }
});

/* ========== NAV-ICON DROPDOWN  JS Code END ========== */

// search bar functionality

document.addEventListener("DOMContentLoaded", function() {
    const forms = [document.getElementById('searchForm'), document.getElementById('responsiveSearchForm')];

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const searchInput = this.querySelector('.search-box');

            // Check if the input field is empty
            if (searchInput.value.trim() === '') {
                event.preventDefault(); // Prevent form submission
            }
        });
    });
});
