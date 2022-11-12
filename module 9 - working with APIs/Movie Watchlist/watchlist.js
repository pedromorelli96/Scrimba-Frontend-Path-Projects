let moviesObjectArray = [];
let watchlist = [];
const watchlistFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"));
const emptyMovies = document.getElementById("empty-movies");
const moviesList = document.getElementById("movies-list");
const moviesSynopsis = document.querySelectorAll(".movie-synopsis");
const toast = document.getElementById("toast");

// First run - verify if there is any movie saved at all
if (watchlistFromLocalStorage) {
    watchlist = watchlistFromLocalStorage;
    populateMoviesObjectArray();
    renderMovieList();
    toggleMovieList(true);
} else {
    emptyMovies.classList.remove("hidden");
}

function createMovieObject(movie) {
    moviesObjectArray.push({
        id: movie.id,
        title: movie.title,
        rating: movie.rating,
        runtime: movie.runtime,
        genre: movie.genre,
        plot: movie.plot,
        poster: movie.poster,
        inWatchlist: movie.inWatchlist,
    });
}

function populateMoviesObjectArray() {
    watchlist.forEach((movie) => createMovieObject(movie));
}

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

function renderMovieList() {
    let moviesHmtl = ``;

    moviesObjectArray.forEach((movie) => {
        if (movie.inWatchlist) {
            moviesHmtl += `
                <div class="movie-card">
                    <div class="movie-img">
                        <img
                            src="${movie.poster}"
                            alt="${movie.title} cover poster"
                        />
                    </div>
                    <div class="movie-info">
                        <div class="movie-info-header">
                            <p class="movie-title">${movie.title}</p>
                            <p class="movie-rating">⭐ ${movie.rating}</p>
                        </div>
                        <div class="movie-info-stats">
                            <div class="movie-properties">
                                <p class="movie-duration">${movie.runtime}</p>
                                <p class="movie-tags">
                                    ${movie.genre}
                                </p>
                                
                                <div class="movie-remove-from-watchlist" data-movieid="${
                                    movie.id
                                }">
                                    <img
                                        src="icons/minus.svg"
                                        alt="minus icon"
                                        class="minus-icon"
                                        data-movieid="${movie.id}"
                                    />
                                    <p 
                                        class="movie-remove-btn"
                                        data-movieid="${movie.id}"
                                    >
                                        Watchlist
                                    </p>
                                </div>
                            </div>
                            
                            ${truncateMoviesSynopsis(movie.plot)}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    moviesList.innerHTML = moviesHmtl;
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

function toggleMovieList(showMovies) {
    if (showMovies) {
        moviesList.classList.remove("hidden");
        emptyMovies.classList.add("hidden");
    } else {
        moviesList.classList.add("hidden");
        emptyMovies.classList.remove("hidden");
    }
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
            toggleMovieList(false);
        } else {
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }

        renderMovieList();
    }
});
