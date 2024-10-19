
function toggleUserDropdown(event) {
    event.stopPropagation(); // Prevent the click from bubbling up
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', function () {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    }
});

function toggleNavDropdown(event) {
    event.stopPropagation(); // Prevent the click from bubbling up
    const dropdown = event.currentTarget.querySelector('.dropdown-menu');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none'; // Hide dropdown
        }
    });
});


function toggleMenu() {
    const navLinks = document.getElementById("responsive-nav");
    if (navLinks.style.display === "none" || navLinks.style.display === "") {
        navLinks.style.display = "block"; // Show the menu
    } else {
        navLinks.style.display = "none"; // Hide the menu
    }
}

function toggleResponsiveDropdown(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    const responsiveUserDropdown = document.querySelector('.responsive-user-dropdown');

    if (responsiveUserDropdown) {
        responsiveUserDropdown.classList.toggle('active'); // Toggle dropdown visibility
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const responsiveUserDropdown = document.querySelector('.responsive-user-dropdown');
    const userLogo = document.querySelector('#user-logo');

    if (responsiveUserDropdown && !userLogo.contains(event.target)) {
        responsiveUserDropdown.classList.remove('active');
    }
});


function toggleIconList() {
    const iconList = document.getElementById('icon-list');
    // Toggle display of the icon list
    if (iconList.style.display === 'none' || iconList.style.display === '') {
        iconList.style.display = 'block'; // Show the icon list
    } else {
        iconList.style.display = 'none'; // Hide the icon list
    }
}
