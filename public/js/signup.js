// Grab elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpButton = document.querySelector('.signup-button');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Function to validate individual fields and manage button state
function validateFields() {
    // Define validation conditions for each field
    const isNameFilled = nameInput.value.trim() !== '';
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    const isPasswordValid = passwordInput.value.trim() !== '' && passwordInput.value.length >= 6;

    // Clear error messages only for valid fields
    if (isNameFilled) {
        nameError.textContent = '';
    } else {
        nameError.textContent = 'Name is required.';
    }

    if (isEmailValid) {
        emailError.textContent = '';
    } else {
        emailError.textContent = 'Please enter a valid email.';
    }

    if (isPasswordValid) {
        passwordError.textContent = '';
    } else {
        passwordError.textContent = passwordInput.value.length < 6 
            ? 'Password must be at least 6 characters long.'
            : 'Password is required.';
    }

    // Enable/disable the signup button based on overall form validity
    signUpButton.disabled = !(isNameFilled && isEmailValid && isPasswordValid);
}

// Add input event listeners to validate fields as user types
nameInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);
passwordInput.addEventListener('input', validateFields);

// Handle form submission
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Perform final validation check before submission
    validateFields();

    if (!signUpButton.disabled) {
        // Submit the form if all fields are valid
        document.getElementById('signupForm').submit();
    }
});


// eye js 

document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    
    // Toggle password visibility and change the icon
    eyeIcon.addEventListener('click', function () {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.innerHTML = '<i class="bi bi-eye-fill"></i>'; // Change to filled eye icon
        } else {
            passwordField.type = 'password';
            eyeIcon.innerHTML = '<i class="bi bi-eye-slash-fill"></i>'; // Change to eye icon
        }
    });
});