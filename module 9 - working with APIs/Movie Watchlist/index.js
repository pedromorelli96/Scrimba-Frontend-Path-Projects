const apiKey = "202089d";
let moviesObjectArray = [];

const searchInput = document.getElementById("search-input");
const moviesList = document.getElementById("movies-list");
const emptyMovies = document.getElementById("empty-movies");
const emptySearch = document.getElementById("empty-search");
const moviesSynopsis = document.querySelectorAll(".movie-synopsis");

document.addEventListener("submit", function (e) {
    e.preventDefault();
    moviesObjectArray = [];
    emptyMovies.classList.add("hidden");
    emptySearch.classList.add("hidden");
    getMovieInfo(getMovieIds(searchInput.value));
});

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
                <div 
                    class="movie-add-to-watchlist"
                    data-movieid="${movie.id}"
                >
                    <img
                        src="icons/plus.svg"
                        alt="plus icon"
                        class="plus-icon"
                    />
                    <p class="movie-add-btn">Watchlist</p>
                </div>
            `;
        } else {
            addOrRemoveHtml = `
                <div 
                    class="movie-remove-from-watchlist"
                    data-movieid="${movie.id}"
                >
                    <img
                        src="icons/minus.svg"
                        alt="minus icon"
                        class="minus-icon"
                    />
                    <p class="movie-remove-btn">Watchlist</p>
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

// {
//     "Title":"Blade Runner",
//     "Year":"1982",
//     "Rated":"R",
//     "Released":"25 Jun 1982",
//     "Runtime":"117 min",
//     "Genre":"Action, Drama, Sci-Fi",
//     "Director":"Ridley Scott",
//     "Writer":"Hampton Fancher, David Webb Peoples, Philip K. Dick",
//     "Actors":"Harrison Ford, Rutger Hauer, Sean Young",
//     "Plot":"A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
//     "Language":"English, German, Cantonese, Japanese, Hungarian, Arabic, Korean",
//     "Country":"United States",
//     "Awards":"Nominated for 2 Oscars. 12 wins & 19 nominations total",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     "Ratings":[
//        {
//           "Source":"Internet Movie Database",
//           "Value":"8.1/10"
//        },
//        {
//           "Source":"Rotten Tomatoes",
//           "Value":"89%"
//        },
//        {
//           "Source":"Metacritic",
//           "Value":"84/100"
//        }
//     ],
//     "Metascore":"84",
//     "imdbRating":"8.1",
//     "imdbVotes":"762,768",
//     "imdbID":"tt0083658",
//     "Type":"movie",
//     "DVD":"30 Oct 2001",
//     "BoxOffice":"$32,914,489",
//     "Production":"N/A",
//     "Website":"N/A",
//     "Response":"True"
//  }
