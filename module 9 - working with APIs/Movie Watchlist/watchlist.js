// NEED TO REVIEW EVERYTHING IN THIS FILE

const apiKey = "202089d";
let moviesObjectArray = [];
let watchlist = [];
const watchlistFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"));

const searchInput = document.getElementById("search-input");
const moviesList = document.getElementById("movies-list");
const emptyMovies = document.getElementById("empty-movies");
const emptySearch = document.getElementById("empty-search");
const moviesSynopsis = document.querySelectorAll(".movie-synopsis");
const toast = document.getElementById("toast");

function truncateMoviesSynopsis(synopsis) {
    if (synopsis.length > 150) {
        let truncated = synopsis.substring(0, 150);

        return `
            <p class="movie-synopsis">
                ${truncated}...
                <span class="read-more">
                    Read more
                </span>
            </p>
        `;
    }
    return `
        <p class="movie-synopsis">
            ${synopsis}
        </p>
    `;
}

function createMovieObject(id, movie) {
    let watchlistFlag = false;

    if (watchlistFromLocalStorage) {
        const found = watchlist.some((movie) => movie.id === id);
        if (found) watchlistFlag = true;
    }

    moviesObjectArray.push({
        id: id,
        title: movie.Title,
        rating: movie.imdbRating,
        runtime: movie.Runtime,
        genre: movie.Genre,
        plot: movie.Plot,
        poster: movie.Poster,
        inWatchlist: watchlistFlag,
    });
}

function toggleMovieList() {
    moviesList.classList.add("hidden");
    emptySearch.classList.remove("hidden");
}

function showToast(action, movieTitle) {
    let toastMessage = ``;
    if (action === "add") {
        toastMessage = `${movieTitle} added to watchlist`;
    } else {
        toastMessage = `${movieTitle} removed from watchlist`;
    }
    toast.textContent = toastMessage;

    toast.className = "show";

    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

if (watchlistFromLocalStorage) {
    watchlist = watchlistFromLocalStorage;
}

moviesList.addEventListener("click", function (e) {
    if (e.target.dataset.movieid) {
        // Use dataset id to find movie object
        const index = moviesObjectArray.findIndex(
            (movie) => movie.id === e.target.dataset.movieid
        );

        // Decide to add to/remove from movie watchlist
        // Call add/remove toast based on inWatchlist boolean
        if (moviesObjectArray[index].inWatchlist) {
            watchlist = watchlist.filter(
                (movie) => movie.id !== moviesObjectArray[index].id
            );
            showToast("remove", moviesObjectArray[index].title);
        } else {
            watchlist.push(moviesObjectArray[index]);
            showToast("add", moviesObjectArray[index].title);
        }

        // Update inWatchlist boolean to be its oposite
        moviesObjectArray[index].inWatchlist =
            !moviesObjectArray[index].inWatchlist;

        // Update localStorage
        if (watchlist.length === 0) {
            localStorage.clear();
        } else {
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }

        renderMovieList();
    }
});
