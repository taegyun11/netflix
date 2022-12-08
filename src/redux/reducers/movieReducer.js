let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  movieGenre: [],
  movieDetail: {},
  movieReview: {},
  loading: true,
  relatedMovie: {},
  movieTrailer: {},
  searchMovie: {},


};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_FAILURE":
      return { ...state, loading: false };
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };
    case "GET_MOVIE_DETAIL_REQUEST":
      return { ...state, loading: true };
    case "GET_SEARCH_REQUEST":
      return { ...state, loading: true };
    case "GET_SEARCH_SUCCESS":
      return { ...state, searchMovie: payload.searchMovie, loading: false };

    case "GET_MOVIE_DETAIL_SUCCESS":
      return {
        ...state,
        movieDetail: payload.movieDetail,
        movieReview: payload.movieReview,
        relatedMovie: payload.relatedMovie,
        movieTrailer: payload.movieTrailer,
        loading: false,
      };
    case "GET_MOVIE_SUCCESS":
      return {
        ...state,
        popularMovies: payload.popularMovies,
        topRatedMovies: payload.topRatedMovies,
        upcomingMovies: payload.upcomingMovies,
        movieGenre: payload.movieGenre,
        loading: false,
      };
    default:
      return { ...state };
  }
}
export default movieReducer;
