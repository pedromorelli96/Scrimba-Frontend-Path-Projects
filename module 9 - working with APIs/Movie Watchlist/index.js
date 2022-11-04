const apiKey = "202089d";
const moviesObjectArray = [];

async function getMovies(title) {
    try {
        let movieIds = [];
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}&type=movie`
        );
        const data = await response.json();
        for (const movie of data.Search) {
            movieIds.push(movie.imdbID);
        }
        return movieIds;
    } catch (error) {
        console.error("Failed to get movies data from OMDb API");
        console.error(error);
    }
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
    });
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
    } catch (error) {
        console.error("Failed to get movie info from OMDb API");
        console.error(error);
    }
}

// getMovieInfo(getMovies("Blade Runner"));
// console.log(moviesObjectArray);

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
