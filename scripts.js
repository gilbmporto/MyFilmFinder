//Not meant to be seen ;S

function _0x4000(_0x40ceed,_0x18f527){const _0x5d1c7a=_0x5d1c();return _0x4000=function(_0x400086,_0x3dc481){_0x400086=_0x400086-0x142;let _0x2b37e2=_0x5d1c7a[_0x400086];return _0x2b37e2;},_0x4000(_0x40ceed,_0x18f527);}const _0x1759a1=_0x4000;function _0x5d1c(){const _0x3d39dc=['16432493tLMvRa','1892606SZxEHZ','39436TiDdCA','1EmVfeT','1225422XKZodR','f0f803eebc678edb9aa85f3128210ca5','1272ItGZxU','49473axuAAg','https://api.themoviedb.org/3','21SvcIYP','1691886jLDhTL','3055910kzFUMG','45XIrqUm'];_0x5d1c=function(){return _0x3d39dc;};return _0x5d1c();}(function(_0x17cb28,_0x363f40){const _0x17b463=_0x4000,_0x319189=_0x17cb28();while(!![]){try{const _0x1353cc=-parseInt(_0x17b463(0x14c))/0x1*(-parseInt(_0x17b463(0x14a))/0x2)+parseInt(_0x17b463(0x146))/0x3+parseInt(_0x17b463(0x14b))/0x4*(-parseInt(_0x17b463(0x148))/0x5)+-parseInt(_0x17b463(0x14d))/0x6*(parseInt(_0x17b463(0x145))/0x7)+parseInt(_0x17b463(0x142))/0x8*(parseInt(_0x17b463(0x143))/0x9)+parseInt(_0x17b463(0x147))/0xa+-parseInt(_0x17b463(0x149))/0xb;if(_0x1353cc===_0x363f40)break;else _0x319189['push'](_0x319189['shift']());}catch(_0x505435){_0x319189['push'](_0x319189['shift']());}}}(_0x5d1c,0x78bee));const tmdbKey=_0x1759a1(0x14e),tmdbBaseUrl=_0x1759a1(0x144);

//Not meant to be seen ;S

const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  let requestParams = `?api_key=${tmdbKey}&language=en`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, {cache: 'no-cache'});
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres
    }
  } catch (err) {
    console.log(err);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  let randomNumPage = Math.ceil(Math.random() * 5);
  console.log(randomNumPage);
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&language=en&page=${randomNumPage}&sort_by=popularity.desc`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, {cache: 'no-cache'});
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      let movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  console.log(movieId);
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}&language=en`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  console.log(urlToFetch);

  try {
    let response = await fetch(urlToFetch, {cache: 'no-cache'});
    if (response.ok) {
      let movieInfo = await response.json();
      console.log(movieInfo);
      return movieInfo;
    }
  } catch (err) {
    console.log('This is the error: ' + err);
  }
 };

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  didUserLikeIt = false;
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies = await getMovies();
  console.log(movies);
  let randomMovie = getRandomMovie(movies);
  console.log(randomMovie);
  console.log(randomMovie.id);
  let info = await getMovieInfo(randomMovie);
  console.log(info);
  displayMovie(info);
};

//Helper Functions below:

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

//Displays the container for the User Favorites List
const showtheOtherDivs = () => {
  const favoriteMoviesDiv = document.getElementById('favoriteMoviesDiv')
  const seenMoviesDivContainer = document.getElementById('SeenMoviesDiv');

  seenMoviesDivContainer.removeAttribute('hidden');
  favoriteMoviesDiv.removeAttribute('hidden');
}

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie

const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

//Create HTML for movie release date
const createMovieReleaseDate = (releaseDate) => {
    const releaseDateElement = document.createElement('h3');
    releaseDateElement.setAttribute('id', 'movieReleaseDate');
    releaseDateElement.innerHTML = `Data: ${releaseDate}`;

    return releaseDateElement;
}

//Create HTML for movie vote average
const createMovieVoteAverage = (voteAverage) => {
  const notaFormatoCorreto = (Number(voteAverage)).toFixed(2);
  const voteAverageElement = document.createElement('h3');
  voteAverageElement.setAttribute('id', 'movieVoteAVerage');
  voteAverageElement.innerHTML = `Nota: ${notaFormatoCorreto}`

  return voteAverageElement;
}

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

// Create HTML for movie Favorites List
const createFavoriteMoviesList = (movieTitle) => {
  const newTitleToAddToList = document.createElement('p');
  newTitleToAddToList.setAttribute('id', `${movieTitle}`);
    newTitleToAddToList.innerHTML = movieTitle;

    return newTitleToAddToList;
  }


// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

var didUserLikeIt = false;
var theCurrentMovie;
var listOfSelectedMovies = [];
// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const favoriteMoviesListDiv = document.getElementById('SeenMoviesDiv')
    const favoriteMoviesListArticle = document.getElementById('favoriteMoviesList');

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const thisMovieReleaseDate = createMovieReleaseDate(movieInfo.release_date);
    const thisMovieVoteAverage = createMovieVoteAverage(movieInfo.vote_average);
    const overviewText = createMovieOverview(movieInfo.overview);
    const listOfFavoriteMovies = createFavoriteMoviesList(movieInfo.title);
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(thisMovieVoteAverage);
    movieTextDiv.appendChild(thisMovieReleaseDate);
    movieTextDiv.appendChild(overviewText);
    favoriteMoviesListDiv.appendChild(listOfFavoriteMovies);

    showBtns();
    showtheOtherDivs();

    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;

    //Add functionality of saving liked movie inside an array and display it
    theCurrentMovie = movieInfo.title;
    console.log(theCurrentMovie);
    
    //Callback function for checking if the movie already exists inside the Favorite List
    function checkIfItsAlreadyThere(x) {
      return x == `<p>${theCurrentMovie}</p>`;
    };

    favoriteBtn.addEventListener('click', () => {
      if (listOfSelectedMovies == false) {
        listOfSelectedMovies.push(`<p>${theCurrentMovie}</p>`);
        console.log(listOfSelectedMovies);
        favoriteMoviesListArticle.innerHTML = listOfSelectedMovies.join('');
      } else if (listOfSelectedMovies.some(checkIfItsAlreadyThere)) {
        console.log('Você já favoritou esse filme!');
      } else {
        listOfSelectedMovies.push(`<p>${theCurrentMovie}</p>`);
        favoriteMoviesListArticle.innerHTML = listOfSelectedMovies.join('');
      }
    
    });

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;