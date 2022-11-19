import React from "react";

const PopularMovies = ({ item }) => {
  return (
    <div
      className="movies-poster"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
          ")",
      }}
    >
      {item.title}
    </div>
  );
};

export default PopularMovies;
