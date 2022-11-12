const apiKey = "202089d";
let moviesObjectArray = [];
let watchlist = [];
const watchlistFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"));

if (watchlistFromLocalStorage) {
    watchlist = watchlistFromLocalStorage;
}

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

async function getMovieIds(title) {
    try {
        if (!title) {
            toggleMovieList();

            throw "empty search";
        }

        let movieIds = [];
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}&type=movie`
        );
        const data = await response.json();
        if (data.Response !== "False") {
            for (const movie of data.Search) {
                movieIds.push(movie.imdbID);
            }
            return movieIds;
        } else {
            toggleMovieList();

            throw "no movie found";
        }
    } catch (error) {
        console.error(error);
        console.error("Failed to get movies data from OMDb API");
    }
}

async function getMovieInfo(movieIds) {
    try {
        for (const id of await movieIds) {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&type=movie`
            );
            const data = await response.json();
            createMovieObject(id, data);
        }
        moviesList.classList.remove("hidden");
        renderMovieList();
    } catch (error) {
        console.error(error);
        console.error("Failed to get movie info from OMDb API");
    }
}

function renderMovieList() {
    let moviesHmtl = ``;
    let addOrRemoveHtml = ``;

    moviesObjectArray.forEach((movie) => {
        if (!movie.inWatchlist) {
            addOrRemoveHtml = `
                <div class="movie-add-to-watchlist" data-movieid="${movie.id}">
                    <img
                        src="icons/plus.svg"
                        alt="plus icon"
                        class="plus-icon"
                        data-movieid="${movie.id}"
                    />
                    <p 
                        class="movie-add-btn"
                        data-movieid="${movie.id}"
                    >
                        Watchlist
                    </p>
                </div>
            `;
        } else {
            addOrRemoveHtml = `
                <div class="movie-remove-from-watchlist" data-movieid="${movie.id}">
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
            `;
        }

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
                            
                            ${addOrRemoveHtml}
                        </div>
                        
                        ${truncateMoviesSynopsis(movie.plot)}
                    </div>
                </div>
            </div>
        `;
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

document.addEventListener("submit", function (e) {
    e.preventDefault();
    moviesObjectArray = [];
    emptyMovies.classList.add("hidden");
    emptySearch.classList.add("hidden");
    getMovieInfo(getMovieIds(searchInput.value));
});

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
