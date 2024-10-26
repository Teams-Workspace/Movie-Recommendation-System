// Get references to elements
const sendOTPButton = document.getElementById('sendOTP');
const otpSection = document.getElementById('otp-section');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const otpInputs = document.querySelectorAll('.otp-input');
const signUpButton = document.querySelector('.signup-button');

// Function to validate fields and enable/disable buttons
function validateFields() {
    // Reset styles for all inputs
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    otpInputs.forEach(input => input.classList.remove('error'));

    // Check if name and email are filled and email is valid
    const isNameFilled = nameInput.value.trim() !== '';
    const isEmailFilled = emailInput.value.includes('@');
    const isPasswordFilled = passwordInput.value.trim() !== '';

    // Enable or disable the Send OTP button based on input validity
    sendOTPButton.disabled = !(isNameFilled && isEmailFilled);

    // Check if all fields are filled for enabling the Sign Up button
    const areAllOTPInputsFilled = Array.from(otpInputs).every(input => input.value.trim() !== '');
    signUpButton.disabled = !(isNameFilled && isEmailFilled && isPasswordFilled && areAllOTPInputsFilled);

    // Show red border for any missing fields
    if (!isNameFilled) {
        nameInput.classList.add('error'); // Add error class for name input
    }
    if (!isEmailFilled) {
        emailInput.classList.add('error'); // Add error class for email input
    }
    if (!isPasswordFilled) {
        passwordInput.classList.add('error'); // Add error class for password input
    }
}

// Event listener for Send OTP button
sendOTPButton.addEventListener('click', function () {
    // Validate fields before proceeding
    validateFields();

    // If all fields are valid, show OTP section
    if (nameInput.value.trim() && emailInput.value.includes('@')) {
        otpSection.classList.remove('hidden');
    }
});

// Add input event listeners to each OTP input
otpInputs.forEach((input, index) => {
    // Focus on the next input when the current input is filled
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus(); // Focus next input if current is filled
        }
    });

    // Handle backspace to focus on the previous input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
            otpInputs[index - 1].focus(); // Focus previous input if current is empty and backspace is pressed
        }
    });
});

// Attach event listeners to input fields for real-time validation
nameInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);
passwordInput.addEventListener('input', validateFields);

// Function to check OTP validity (to be called upon OTP submission)
function checkOTP() {
    // Example logic for OTP validation (replace with your actual logic)
    const isOTPValid = Array.from(otpInputs).every(input => input.value.trim() !== '');

    // If OTP is not valid, show error for all inputs
    if (!isOTPValid) {
        otpInputs.forEach(input => input.classList.add('error'));
        // Show an error for other fields as well
        nameInput.classList.add('error');
        emailInput.classList.add('error');
        passwordInput.classList.add('error');
    } else {
        // Proceed with form submission logic here
        console.log('OTP is valid! Proceeding...');
    }
}

// Example of calling checkOTP function when user submits the form
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    checkOTP(); // Check OTP validity on form submission
});
