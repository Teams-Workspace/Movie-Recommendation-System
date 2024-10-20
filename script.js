/* ========== NAVBAR-DROPDOWN  CSS Code START ========== */

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


/* ========== NAVBAR-DROPDOWN  CSS Code END ========== */

/* ========== USER-DROPDOWN  CSS Code Start ========== */

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


/* ========== USER-DROPDOWN  CSS Code END ========== */

/* ========== NAV-ICON -DROPDOWN  CSS Code START ========== */

function toggleMenu() {
    const navLinks = document.getElementById("responsive-nav");
    const isNavVisible = navLinks.style.display === "block";
    
    // Toggle the display of the navigation links
    navLinks.style.display = isNavVisible ? "none" : "block";
}

const toggleMenuButton = document.querySelector('.toggle-menu');

toggleMenuButton.addEventListener('click', toggleMenu);


/* ========== NAV-ICON -DROPDOWN  CSS Code END ========== */