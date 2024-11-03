const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpButton = document.querySelector('.signup-button');
const errorMessageContainer = document.createElement('div'); // Create an error message container

errorMessageContainer.style.color = 'red'; // Style the error message container
errorMessageContainer.style.marginTop = '10px';
document.getElementById('signupForm').appendChild(errorMessageContainer); // Append it to the form

// Function to validate fields and manage button state
function validateFields() {
    const isNameFilled = nameInput.value.trim() !== '';
    const isEmailFilled = emailInput.value.includes('@') && emailInput.value.includes('.');
    const isPasswordFilled = passwordInput.value.trim() !== '' && passwordInput.value.length >= 6; // Ensure password is at least 6 characters

    // Clear previous error messages
    errorMessageContainer.textContent = '';

    signUpButton.disabled = !(isNameFilled && isEmailFilled && isPasswordFilled);

    // Highlight missing fields
    nameInput.classList.toggle('error', !isNameFilled);
    emailInput.classList.toggle('error', !isEmailFilled);
    passwordInput.classList.toggle('error', !isPasswordFilled);

    // Set error messages
    if (!isNameFilled) {
        errorMessageContainer.textContent += 'Name is required. ';
    }
    if (!isEmailFilled) {
        errorMessageContainer.textContent += 'Email is invalid. ';
    }
    if (!isPasswordFilled) {
        if (passwordInput.value.length < 6) {
            errorMessageContainer.textContent += 'Password must be at least 6 characters long. ';
        } else {
            errorMessageContainer.textContent += 'Password is required. ';
        }
    }
}

// Add input event listeners for validation
nameInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);
passwordInput.addEventListener('input', validateFields);

// Handle form submission
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Final validation check before submission
    validateFields();

    if (!signUpButton.disabled) {
        // Submit the form if validation passes
        document.getElementById('signupForm').submit();
    }
});

