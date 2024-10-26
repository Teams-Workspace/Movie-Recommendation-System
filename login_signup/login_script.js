document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm("loginEmail", "loginPassword");
    });

    function validateForm(emailId, passwordId) {
        const email = document.getElementById(emailId);
        const password = document.getElementById(passwordId);

        // Add red border if the email field is empty
        if (!email.value) {
            email.classList.add("error");
        } else {
            email.classList.remove("error");
        }

        // Add red border if the password field is empty
        if (!password.value) {
            password.classList.add("error");
        } else {
            password.classList.remove("error");
        }

        // Proceed with form submission if both fields are filled
        if (email.value && password.value) {
            alert("Form submitted successfully!");
        }
    }
});
