const apiKey = "202089d";
let moviesObjectArray = [];

const searchInput = document.getElementById("search-input");
const moviesList = document.getElementById("movies-list");
const emptyMovies = document.getElementById("empty-movies");
const emptySearch = document.getElementById("empty-search");
const moviesSynopsis = document.querySelectorAll(".movie-synopsis");

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
    moviesObjectArray.push({
        id: id,
        title: movie.Title,
        rating: movie.imdbRating,
        runtime: movie.Runtime,
        genre: movie.Genre,
        plot: movie.Plot,
        poster: movie.Poster,
        inWatchlist: false,
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

document.addEventListener("submit", function (e) {
    e.preventDefault();
    moviesObjectArray = [];
    emptyMovies.classList.add("hidden");
    emptySearch.classList.add("hidden");
    getMovieInfo(getMovieIds(searchInput.value));
});

moviesList.addEventListener("click", function (e) {
    if (e.target.dataset.movieid) {
        const index = moviesObjectArray.findIndex(
            (movie) => movie.id === e.target.dataset.movieid
        );

        moviesObjectArray[index].inWatchlist =
            !moviesObjectArray[index].inWatchlist;

        // add confirmation toast here
        // https://www.w3schools.com/howto/howto_js_snackbar.asp

        renderMovieList();
    }
});
