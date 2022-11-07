import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const MovieCard = ({ item }) => {
  const { movieGenre } = useSelector((state) => state.movie);
  return (
    <div
      className="card"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/${item.poster_path}` +
          ")",
      }}
    >
      <div className="overLay">
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg="danger">
              {movieGenre.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <span>{item.adult ? "Over 18" : "Under 18"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
