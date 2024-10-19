const searchBox = document.querySelector(".search-box");
const searchIcon = document.querySelector("#search-bar i");

// Function to expand the search box
function expandSearchBox() {
    searchBox.classList.add("search-box-expanded");
}

// Function to collapse the search box when it's empty and not focused
function collapseSearchBox() {
    if (!searchBox.value) { // Only collapse if the input is empty
        searchBox.classList.remove("search-box-expanded");
    }
}

// Expand the search box when the user clicks the icon or focuses on the input
searchIcon.addEventListener("click", expandSearchBox);
searchBox.addEventListener("focus", expandSearchBox);

// Collapse the search box when it loses focus and is empty
searchBox.addEventListener("blur", collapseSearchBox);
