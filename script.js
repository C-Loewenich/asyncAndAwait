showError = function (errorText, parentTagID) {
  const displayTag = document.getElementById(parentTagID);
  const newError = document.createElement("p");
  displayTag.appendChild(newError);
  newError.innerHTML = errorText;
};

async function getGenresArray(apiUrl) {
  try {
    console.log("requesting genres list");
    const getGenres = await getData(apiUrl);
    console.log("genres list received");

    getGenres.genres.forEach((element) => {
      const genreList = document.getElementById("genreList");
      const newLi = document.createElement("li");
      genreList.appendChild(newLi);
      newLi.innerHTML = `Genre name: ${element.name} - ID: ${element.id}`;
    });
  } catch (err) {
    showError(`Sorry!!! The Genre list could not be Generated - Error: ${err}`);
  }
}

async function getMyTopMovie(apiUrl) {
  try {
    const getTopMovie = await getData(apiUrl);
    const myTopMovie = document.getElementById("myTopMovie");
    myTopMovie.innerHTML = getTopMovie.original_title;
  } catch {
    showError(`Error - My top movie`);
  }
}

async function get2022TopRated(apiUrl) {
  try {
    const getTopRated = await getData(apiUrl);
    for (let i = 0; i < 10; i++) {
      const topRatedList = document.getElementById("topRated");
      const newLi = document.createElement("li");
      topRatedList.appendChild(newLi);
      newLi.innerHTML = getTopRated.results[i].title;
    }
  } catch {
    showError(`Error - Problems to display top rated movies`, "topRated");
  }
}

async function getTop10OfArray(parantTagID, apiUrl) {
  try {
    const dataArray = await getData(apiUrl);
    for (let i = 0; i < 10; i++) {
      const parant = document.getElementById(parantTagID);
      const newLi = document.createElement("li");
      parant.appendChild(newLi);
      newLi.innerHTML = dataArray.results[i].title;
    }
  } catch {
    showError(`Error - Problems to display top rated movies`, parantTagID);
  }
}

async function logMovieVote() {
  try {
    let movieData = await getData(
      `https://api.themoviedb.org/3/movie/45269?api_key=${API_KEY}`
    );
    console.log(`Vote count ${movieData.vote_count}`);
  } catch {
    console.log("ups something went wrong");
  }
}

getGenresArray(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
);

getMyTopMovie("https://api.themoviedb.org/3/movie/45269?api_key=" + API_KEY);

get2022TopRated(
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022`
);

getTop10OfArray(
  "topRatedAction",
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022&with_genres=28`
);

getTop10OfArray(
  "topRated1975",
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=1975`
);

logMovieVote();
