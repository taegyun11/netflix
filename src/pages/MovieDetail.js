import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";
import { Badge } from "react-bootstrap";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieDetail, loading, movieGenre } = useSelector(
    (state) => state.movie
  );
  let { id } = useParams();
  useEffect(() => {
    dispatch(movieAction.getMovieDetail({ id }));
  }, []);
  console.log("movie GEnre", movieGenre);
  if (loading) {
    return (
      <ClipLoader
        color="#ffff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="movie-detail-page">
      <div>
        <img
          className="detail-page-picture"
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`}
        />
      </div>
      <div>
        <div>
          {movieDetail.genres.map(genre=>(
            <Badge bg="danger" key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>
        <h1>{movieDetail.title}</h1>
      </div>
    </div>
  );
};

export default MovieDetail;
