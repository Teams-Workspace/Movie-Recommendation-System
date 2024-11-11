
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission
        errorMessage.textContent = ''; // Clear previous error messages

        let valid = true;

        // Clear previous error states
        email.classList.remove("error");
        password.classList.remove("error");

        // Front-end validation
        if (!email.value) {
            email.classList.add("error");
            errorMessage.textContent = 'Email is required. ';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            email.classList.add("error");
            errorMessage.textContent = 'Email is invalid. ';
            valid = false;
        }

        if (!password.value) {
            password.classList.add("error");
            errorMessage.textContent += 'Password is required. ';
            valid = false;
        } else if (password.value.length < 6) {
            password.classList.add("error");
            errorMessage.textContent += 'Password must be at least 6 characters long. ';
            valid = false;
        }

        if (valid) {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                window.location.href = result.redirect; // Redirect to the URL provided by the server
            } else {
                errorMessage.textContent = result.error; // Show error message from the server
            }
        }
    });
});

// eye js 

document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('loginPassword');
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