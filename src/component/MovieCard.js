import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { movieGenre } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const moveToDetail=()=>{
    navigate(`./movies/${item.id}`)
    
  }
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
        <h2>{item.title}</h2>
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
