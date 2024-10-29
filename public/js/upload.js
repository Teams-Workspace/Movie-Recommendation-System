// Get elements
const uploadProfileLink = document.getElementById('uploadProfileLink');
const profilePictureInput = document.getElementById('profilePictureInput');
const profilePreview = document.getElementById('profilePreview');
const uploadProfileForm = document.getElementById('uploadProfileForm');

// Handle click on Upload Profile to trigger file input
uploadProfileLink.addEventListener('click', function (e) {
    e.preventDefault();
    profilePictureInput.click(); // Trigger file selection
});

// Preview the selected image and submit the form
profilePictureInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePreview.src = e.target.result; // Show the preview
        }
        reader.readAsDataURL(file); // Read the image

        // Automatically submit the form to upload the profile picture
        uploadProfileForm.submit();
    }
});
