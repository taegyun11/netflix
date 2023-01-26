import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { movieGenre } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`./movies/${item.id}`);
  };
  return (
    <div
      className="card"
      onClick={moveToDetail}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/${item.poster_path}` +
          ")",
      }}
    >
      <div className="overLay">
        <h2 className="overflow_card">{item.title}</h2>
        <div className="ml-1">
          {item.genre_ids.map((id) => (
            <Badge className="badge-style1" bg="danger">
              {movieGenre.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div className="mt-3 margin-left">
          <span>
            <img
              width={20}
              src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
            />{" "}
            {item.vote_average}
            {" "}
          </span>
          <span className="under-18">
            {item.adult ? "Over 18" : "Under 18"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;