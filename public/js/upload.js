document.addEventListener('DOMContentLoaded', function () {
  const uploadProfileLink = document.getElementById('uploadProfileLink');
  const profilePictureInput = document.getElementById('profilePictureInput');
  const profilePreview = document.getElementById('profilePreview');
  const uploadProfileForm = document.getElementById('uploadProfileForm');

  const uploadProfileLinkResponsive = document.getElementById('uploadProfileLinkResponsive');
  const profilePictureInputResponsive = document.getElementById('profilePictureInputResponsive');
  const profilePreviewResponsive = document.getElementById('profilePreviewResponsive');
  const uploadProfileFormResponsive = document.getElementById('uploadProfileFormResponsive');

  // Function to handle file input click
  function handleFileInputClick(e, fileInput) {
    e.preventDefault();
    fileInput.click();
  }

  // Function to handle file preview and form submit
  function handleFileChange(e, profilePreview, uploadProfileForm) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreview.src = e.target.result; // Show the preview
      }
      reader.readAsDataURL(file); // Read the image
      uploadProfileForm.submit(); // Automatically submit the form to upload the profile picture
    }
  }

  // Event listeners for desktop view
  uploadProfileLink.addEventListener('click', function (e) {
    handleFileInputClick(e, profilePictureInput);
  });
  profilePictureInput.addEventListener('change', function (e) {
    handleFileChange(e, profilePreview, uploadProfileForm);
  });

  // Event listeners for responsive view
  uploadProfileLinkResponsive.addEventListener('click', function (e) {
    handleFileInputClick(e, profilePictureInputResponsive);
  });
  profilePictureInputResponsive.addEventListener('change', function (e) {
    handleFileChange(e, profilePreviewResponsive, uploadProfileFormResponsive);
  });
});