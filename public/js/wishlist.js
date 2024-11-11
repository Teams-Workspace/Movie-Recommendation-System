document.addEventListener('DOMContentLoaded', function () {
    const dots = document.querySelectorAll('.three-dots');
    dots.forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('show');
            
            const otherDropdowns = document.querySelectorAll('.options-dropdown');
            otherDropdowns.forEach(dd => {
                if (dd !== dropdown) {
                    dd.classList.remove('show');
                }
            });
        });
    });

    document.addEventListener('click', function () {
        const dropdowns = document.querySelectorAll('.options-dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    });

    const deleteOptions = document.querySelectorAll('.delete-option');
    deleteOptions.forEach(option => {
        option.addEventListener('click', function () {
            const movieItem = this.closest('.image-item');
            const movieId = movieItem.getAttribute('data-movie-id');

            fetch(`/wishlist/delete/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    movieItem.remove();
                } else {
                    alert('Failed to delete the movie.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the movie.');
            });
        });
    });

    const cancelOptions = document.querySelectorAll('.cancel-option');
    cancelOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.closest('.options-dropdown').classList.remove('show');
        });
    });
});
