import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const PopularMovies = ({ item }) => {
  const { movieGenre, loading } = useSelector((state) => state.movie);
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
    <div className="movies">
      
      <div
        className="movies-poster"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
            ")",
        }
      }
      ><span role="image" aria-label="No IMAGE"></span>
        <div className="gradient">
          <div className="movies-info">
            <div className="movies-summary">
              <img
                className="movies-picture"
                width={50}
                alt="No image"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
              />
              <div className="movies-summary-title">
                <div className="movies-title">
                  {item.title}
                  <br />
                  <div className="movie-release">{item.release_date}</div>
                </div>
              </div>
            </div>
            {movieGenre.length ? (
              <div className="mt-2">
                {item.genre_ids.map((id) => (
                  <Badge bg="danger" className="badge-style">
                    {movieGenre.find((item) => item.id == id).name}
                  </Badge>
                ))}
              </div>
            ) : null}
            <div className="m-1 overflow">{item.overview}</div>
            <div className="sub-info">
              <div>
                <img
                  width={25}
                  src="https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png"
                />{" "}
                {item.vote_average}
              </div>
              <div>
                <img
                  width={25}
                  src="https://toppng.com/uploads/preview/business-group-comments-people-group-business-icon-11562873610sqakpnccus.png"
                />{" "}
                {item.vote_count}
              </div>
              <div className="under-18">
                {item.adult ? "Over 18" : "under 18"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
