const apiKey = "202089d";

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

async function getMovieInfo(movieIds) {
    try {
        for (const id of await movieIds) {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&type=movie`
            );
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error("Failed to get movie info from OMDb API");
        console.error(error);
    }
}

getMovieInfo(getMovies("Blade Runner"));
