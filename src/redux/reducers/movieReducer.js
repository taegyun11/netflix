let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  movieGenre: [],
  loading: true,
};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_FAILURE":
      return { ...state, loading: false };
    case "GET_MOVIES_REQUEST":
      return { ...state, loading: true };
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