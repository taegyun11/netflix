import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from '@fortawesome/free-solid-svg-icons'

const PopularMovies = ({ item }) => {
  const { movieGenre } = useSelector((state) => state.movie);

  return (
    <div className="movies">
      <div
        className="movies-poster"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
            ")",
        }}
      >
        <div className="gradient">
          <div className="movies-info">
            <img
              className="movies-picture"
              width={50}
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
            />
            <span className="movies-title">
              {item.title}
            </span>
            <br/>
            Release Date : {item.release_date}
            <div>

              {item.genre_ids.map((id) => (
                <Badge bg="danger" className="badge-style">
                  {movieGenre.find((item) => item.id == id).name}
                </Badge>
              ))}
            </div>
            <div>
              <div className="m-1 overflow">{item.overview}</div>
            </div>
            <div>
              <span> {item.vote_average}</span>
              <span>IMDB {item.vote_count}</span>
              {item.adult ? "Over 18" : "under 18"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
