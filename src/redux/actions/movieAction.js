import { useState } from "react";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovieDetail({ id }) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_DETAIL_REQUEST", payload: { id } });

      const movieTrailerApi = api.get(
        `movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const relatedMovieApi = api.get(
        `movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movieDetailApi = api.get(
        `movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const movieReviewApi = api.get(
        `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      let [movieDetail, movieReview, relatedMovie, movieTrailer] =
        await Promise.all([
          movieDetailApi,
          movieReviewApi,
          relatedMovieApi,
          movieTrailerApi,
        ]);

      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: {
          movieDetail: movieDetail.data,
          movieReview: movieReview.data,
          relatedMovie: relatedMovie.data,
          movieTrailer: movieTrailer.data,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}
function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      //axios 사용하여 API Call 사용
      const movieGenreApi = api.get(
        `genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const popularMovieApi = api.get(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const topRatedMovieApi = api.get(
        `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const upcomingMovieApi = api.get(
        `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      //if multiple api is required at the same time.
      let [popularMovies, topRatedMovies, upcomingMovies, movieGenre] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upcomingMovieApi,
          movieGenreApi,
        ]);

      dispatch({
        type: "GET_MOVIE_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          movieGenre: movieGenre.data.genres,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}
function getSearchMovie({ search, page }) {
  return async (dispatch) => {
    try {
      const type = search ? "search" : "discover";
      // const sortBy = 
      const pageNum = page ? `${page}` : "1";
      dispatch({ type: "GET_SEARCH_REQUEST" });
      //axios 사용하여 API Call 사용
      // https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate

      const searchMovieApi = api.get(
        `${type}/movie?api_key=${API_KEY}&language=en-US&page=${pageNum}`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            query: search,
            page: page,
          },
        }
      );
      let [searchMovie] = await Promise.all([searchMovieApi]);

      dispatch({
        type: "GET_SEARCH_SUCCESS",
        payload: {
          searchMovie: searchMovie.data,
          loading: false,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

export const movieAction = {
  getMovies,
  getMovieDetail,
  getSearchMovie,
};
