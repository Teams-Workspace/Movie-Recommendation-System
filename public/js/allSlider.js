
/* ========== SLIDER  Code Start ========== */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('#slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Ensure the initial active class is set
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
    }

    function nextSlide() {
        slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        slides[currentSlide].style.transform = 'translateX(-100%)';
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.transition = 'none';
        slides[currentSlide].style.transform = 'translateX(100%)';
        setTimeout(() => {
            slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            slides[currentSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.opacity = '1';
        }, 20); // Short delay to ensure transition applies
    }

    function prevSlide() {
        slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        slides[currentSlide].style.transform = 'translateX(100%)';
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].style.transition = 'none';
        slides[currentSlide].style.transform = 'translateX(-100%)';
        setTimeout(() => {
            slides[currentSlide].style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            slides[currentSlide].style.transform = 'translateX(0)';
            slides[currentSlide].style.opacity = '1';
        }, 20); // Short delay to ensure transition applies
    }

    nextArrow.addEventListener('click', nextSlide);
    prevArrow.addEventListener('click', prevSlide);

    setInterval(nextSlide, slideInterval);
});

let autoSlideInterval;
let currentIndex = 0;
const visibleImagesCount = 6; // Show up to 6 images
const imageList = document.querySelector(".custom-image-list");
const slideButtons = document.querySelectorAll(".custom-slide-button");
const images = Array.from(document.querySelectorAll(".custom-image-item"));
const totalImages = images.length;

// Initialize the slider
const initSlider = () => {
    // Clear any existing clones (in case of reinitialization)
    imageList.innerHTML = '';
    images.forEach(img => imageList.appendChild(img));

    // Clone the first and last few images for smooth looping, if there are enough images
    if (totalImages > 1) {
        for (let i = 0; i < visibleImagesCount; i++) {
            const cloneFirst = images[i % totalImages].cloneNode(true);
            const cloneLast = images[(totalImages - i - 1) % totalImages].cloneNode(true);
            imageList.appendChild(cloneFirst);
            imageList.insertBefore(cloneLast, imageList.firstChild);
        }
    }

    // Initial positioning
    updateImagePosition();

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "custom-prev-slide" ? -1 : 1;
            currentIndex += direction;
            updateImagePosition();
            resetPositionIfOutOfBounds();
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual change
        });
    });

    // Wishlist icon toggle
    imageList.addEventListener('click', function (event) {
        if (event.target.classList.contains('wishlist-icon')) {
            event.target.classList.toggle('active');
        }
    });

    // Pause auto-slide on mouse over, resume on mouse out
    imageList.addEventListener("mouseover", stopAutoSlide);
    imageList.addEventListener("mouseout", startAutoSlide);

    startAutoSlide();
};

const updateImagePosition = () => {
    const offset = -currentIndex * (images[0].clientWidth + 15); // Adjust for spacing
    imageList.style.transform = `translateX(${offset}px)`;
};

const resetPositionIfOutOfBounds = () => {
    imageList.addEventListener("transitionend", () => {
        if (currentIndex >= totalImages + visibleImagesCount) {
            imageList.style.transition = "none";
            currentIndex = visibleImagesCount;
            updateImagePosition();
        } else if (currentIndex <= 0) {
            imageList.style.transition = "none";
            currentIndex = totalImages;
            updateImagePosition();
        }
        setTimeout(() => {
            imageList.style.transition = "transform 0.5s ease-in-out";
        }, 50);
    });
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        currentIndex++;
        updateImagePosition();
        resetPositionIfOutOfBounds();
    }, 3000); // Change image every 3 seconds
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

// Initialize the slider on load and on resize
window.addEventListener("load", initSlider);
window.addEventListener("resize", initSlider);

function showMovie(imageSrc) {
    const displayImage = document.getElementById('sliderDisplayImage');
    displayImage.src = imageSrc;
}
let newAutoSlideInterval;
let newCurrentIndex = 0;
const maxVisibleImages = 6; // Show up to 6 images
const newImageList = document.querySelector(".new-image-list");
const newSlideButtons = document.querySelectorAll(".new-slide-button");
const newImages = Array.from(document.querySelectorAll(".new-image-item"));
const newTotalImages = newImages.length;

// Initialize the new slider
const initNewSlider = () => {
    // Clear any existing clones (in case of reinitialization)
    newImageList.innerHTML = '';
    newImages.forEach(img => newImageList.appendChild(img));

    // Clone the first and last few images for smooth looping, if there are enough images
    if (newTotalImages > 1) {
        for (let i = 0; i < maxVisibleImages; i++) {
            const cloneFirst = newImages[i % newTotalImages].cloneNode(true);
            const cloneLast = newImages[(newTotalImages - i - 1) % newTotalImages].cloneNode(true);
            newImageList.appendChild(cloneFirst);
            newImageList.insertBefore(cloneLast, newImageList.firstChild);
        }
    }

    // Initial positioning
    updateNewImagePosition();

    newSlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "new-prev-slide" ? -1 : 1;
            newCurrentIndex += direction;

            updateNewImagePosition();

            // Reset position if out of bounds for seamless loop
            resetNewPositionIfOutOfBounds();
            stopNewAutoSlide();
            startNewAutoSlide(); // Restart auto slide after manual change
        });
    });

    // Wishlist icon toggle
    newImageList.addEventListener('click', function (event) {
        if (event.target.classList.contains('wishlist-icon')) {
            event.target.classList.toggle('active');
        }
    });

    // Pause auto-slide on mouse over, resume on mouse out
    newImageList.addEventListener("mouseover", stopNewAutoSlide);
    newImageList.addEventListener("mouseout", startNewAutoSlide);

    startNewAutoSlide();
};

const updateNewImagePosition = () => {
    const offset = -newCurrentIndex * (newImages[0].clientWidth + 15); // Adjust for spacing
    newImageList.style.transform = `translateX(${offset}px)`;
};

const resetNewPositionIfOutOfBounds = () => {
    newImageList.addEventListener("transitionend", () => {
        if (newCurrentIndex >= newTotalImages + maxVisibleImages) {
            newImageList.style.transition = "none";
            newCurrentIndex = maxVisibleImages;
            updateNewImagePosition();
        } else if (newCurrentIndex <= 0) {
            newImageList.style.transition = "none";
            newCurrentIndex = newTotalImages;
            updateNewImagePosition();
        }
        setTimeout(() => {
            newImageList.style.transition = "transform 0.5s ease-in-out";
        }, 50);
    });
};

const startNewAutoSlide = () => {
    newAutoSlideInterval = setInterval(() => {
        newCurrentIndex--;
        updateNewImagePosition();
        resetNewPositionIfOutOfBounds();
    }, 3000); // Change image every 3 seconds
};

const stopNewAutoSlide = () => {
    clearInterval(newAutoSlideInterval);
};

// Initialize the new slider on load and on resize
window.addEventListener("load", initNewSlider);
window.addEventListener("resize", initNewSlider);

function showMovie(imageSrc) {
    const displayImage = document.getElementById('sliderDisplayImage');
    displayImage.src = imageSrc;
}


// scroll bar slider  js 

const movies = {
    "Never Let Go": {
        title: "Never Let Go",
        overview: "A gripping story of resilience, following a mother who stops at nothing to rescue her kidnapped daughter.",
        rating: "7.1",
        releaseDate: "2023-01-12",
        genres: "Horror, Drama",
        poster: "https://image.tmdb.org/t/p/w500/3EpZ2ksjijmdr8BhISP03PYzNFW.jpg"
    },
    "Speak No Evil": {
        title: "Speak No Evil",
        overview: "A chilling thriller about two families whose vacation takes a dark turn as hidden secrets are revealed.",
        rating: "6.8",
        releaseDate: "2022-10-10",
        genres: "Horror, Thriller",
        poster: "https://image.tmdb.org/t/p/w500/fDtkrO2OAF8LKQTdzYmu1Y7lCLB.jpg"
    },
    "The Park Maniac": {
        title: "The Park Maniac",
        overview: "A series of grisly murders in a public park draws the attention of both the media and a determined detective.",
        rating: "5.4",
        releaseDate: "2023-05-23",
        genres: "Drama, Crime, Thriller, Horror",
        poster: "https://image.tmdb.org/t/p/w500/xUIaDutJAWyfWEyZRcqaNWcoR55.jpg"
    },
    "Deadpool & Wolverine": {
        title: "Deadpool & Wolverine",
        overview: "Deadpool teams up with Wolverine in a wild and comedic action-packed adventure.",
        rating: "8.5",
        releaseDate: "2024-02-15",
        genres: "Action, Comedy, Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
    },
    "Beetlejuice Beetlejuice": {
        title: "Beetlejuice Beetlejuice",
        overview: "The mischievous ghost Beetlejuice returns in this hauntingly funny adventure with the afterlife's craziest inhabitants.",
        rating: "7.3",
        releaseDate: "2024-09-30",
        genres: "Comedy, Fantasy, Horror",
        poster: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg"
    },
    "Inside Out 2": {
        title: "Inside Out 2",
        overview: "Join Riley and her emotions once again as new feelings arise in this heartwarming animated adventure.",
        rating: "8.0",
        releaseDate: "2024-11-15",
        genres: "Animation, Family, Adventure, Comedy, Drama",
        poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg"
    },
    "Despicable Me 4": {
        title: "Despicable Me 4",
        overview: "Gru and the Minions return in another comical escapade that’s sure to entertain the whole family.",
        rating: "7.5",
        releaseDate: "2025-06-25",
        genres: "Animation, Family, Comedy, Action",
        poster: "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
    },
    "Brothers": {
        title: "Brothers",
        overview: "Two estranged brothers reunite in this action-packed comedy filled with crime and unexpected twists.",
        rating: "6.9",
        releaseDate: "2023-03-12",
        genres: "Action, Comedy, Crime",
        poster: "https://image.tmdb.org/t/p/w500/Akweo95FGyDpucYVT81h0SbX8Ky.jpg"
    },
    "Bad Boys: Ride or Die": {
        title: "Bad Boys: Ride or Die",
        overview: "The Bad Boys are back for another adrenaline-fueled adventure, pushing boundaries and breaking rules.",
        rating: "7.8",
        releaseDate: "2024-04-10",
        genres: "Action, Comedy",
        poster: "https://image.tmdb.org/t/p/w500/oGythE98MYleE6mZlGs5oBGkux1.jpg"
    },
    "SpongeBob Squarepants: Kreepaway Kamp": {
        title: "SpongeBob Squarepants: Kreepaway Kamp",
        overview: "SpongeBob and friends are in for a spooky time at Kreepaway Kamp in this fun-filled family movie.",
        rating: "6.2",
        releaseDate: "2023-07-15",
        genres: "TV Movie, Family, Comedy, Horror, Animation",
        poster: "https://image.tmdb.org/t/p/w500/blRsgsexoBqnjcEJkV8beKAVT6J.jpg"
    }
};

function displayMovie(movieTitle) {
    const movie = movies[movieTitle];
    if (movie) {
        document.getElementById('sliderDisplayImage').src = movie.poster;
        document.getElementById('sliderDisplayImage').alt = movie.title + ' Poster';
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieOverview').textContent = movie.overview;
        document.getElementById('movieRating').textContent = movie.rating;
        document.getElementById('movieReleaseDate').textContent = movie.releaseDate;
        document.getElementById('movieGenres').textContent = movie.genres;
    }
}

function displayRandomMovie() {
    const movieTitles = Object.keys(movies);
    const randomIndex = Math.floor(Math.random() * movieTitles.length);
    const randomMovieTitle = movieTitles[randomIndex];
    displayMovie(randomMovieTitle);
}

document.addEventListener('DOMContentLoaded', displayRandomMovie);