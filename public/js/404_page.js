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