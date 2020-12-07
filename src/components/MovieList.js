import React from "react";
import { Card, CardDeck } from "react-bootstrap";

const MovieList = ({
  movies,
  conf,
  genre,
  setHighlightId,
  setShowHighlight,
}) => {
  const moviesByGenre = movies.filter((movie) =>
    movie.genre_ids.includes(genre.id)
  );
  return (
    <>
      {moviesByGenre.length > 0 && (
        <>
          <h1
            className="section-title"
            id={genre.name.toLowerCase().split(" ").join("-")}
          >
            {genre.name}
          </h1>
          <CardDeck className=" deck justify-content-start">
            {moviesByGenre.map((movie) => (
              <Card
                key={movie.id}
                className="movie"
                onClick={() => {
                  setHighlightId(movie.id);
                  setShowHighlight(true);
                }}
              >
                <Card.Img
                  variant="top"
                  src={conf.base_url + conf.poster_sizes[3] + movie.poster_path}
                />
              </Card>
            ))}
          </CardDeck>
        </>
      )}
    </>
  );
};

export default MovieList;
