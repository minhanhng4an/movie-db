import React from "react";
import { Carousel, Button } from "react-bootstrap";

const HomeCarousel = ({
  loading,
  conf,
  movies,
  setHighlightId,
  setShowHighlight,
}) => {
  return (
    <Carousel id="trending">
      {!loading &&
        movies.map((movie) => (
          <Carousel.Item
            key={movie.id}
            className="carousel-item"
            interval={10000}
          >
            <img
              className="d-block w-100"
              src={conf.base_url + conf.backdrop_sizes[3] + movie.backdrop_path}
              alt={movie.id}
            />

            <Carousel.Caption className="carousel-overlay carousel-text">
              <h3>
                {movie.title
                  ? movie.title
                  : movie.original_title
                  ? movie.original_title
                  : movie.original_name}
              </h3>
              <p>{movie.overview}</p>
              <Button
                variant="outline-light"
                onClick={() => {
                  setHighlightId(movie.id);
                  setShowHighlight(true);
                }}
              >
                See More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default HomeCarousel;
