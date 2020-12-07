import React from "react";
import { Modal, Card, Button, Row } from "react-bootstrap";

const Highlight = ({
  showHighlight,
  setShowHighlight,
  conf,
  highlightMovie,
  highlightTrailer,
  availableGenres,
}) => {
  const highlightGenres = availableGenres
    .filter((genre) => highlightMovie.genre_ids.includes(genre.id))
    .map((genre) => genre.name);

  return (
    <Modal
      show={showHighlight}
      onHide={() => setShowHighlight(false)}
      centered
      dialogClassName="highlight"
    >
      <Card.Img
        src={
          conf.base_url + conf.backdrop_sizes[2] + highlightMovie.backdrop_path
        }
      />
      <Card.ImgOverlay className="highlight-overlay">
        <Row className="highlight-header px-2 justify-content-between">
          <Card.Title className="highlight-title">
            {highlightMovie.title
              ? highlightMovie.title
              : highlightMovie.original_title
              ? highlightMovie.original_title
              : highlightMovie.original_name}
          </Card.Title>
          <div>
            <Card.Title className="highlight-score">
              {highlightMovie.vote_average}
              <span className="max-score">/ 10</span>
            </Card.Title>
          </div>
        </Row>
        <div>
          <Card.Text className="highlight-year">
            <span>Year: </span>
            {highlightMovie.release_date
              ? highlightMovie.release_date.split("-")[0]
              : highlightMovie.first_air_date.split("-")[0]}
          </Card.Text>
          <Card.Text className="highlight-genres">
            {highlightGenres.map((genre) => (
              <>
                <a
                  key={genre.id}
                  className="highlight-genre"
                  href={"#" + genre.toLowerCase().split(" ").join("-")}
                  onClick={() => setShowHighlight(false)}
                >
                  {"#" + genre}
                </a>{" "}
              </>
            ))}
          </Card.Text>
        </div>
        <Card.Text className="highlight-overview">
          {highlightMovie.overview}
        </Card.Text>

        <Button
          disabled={!highlightTrailer}
          variant="outline-light"
          className="highlight-trailer"
          href={`https://www.youtube.com/watch?v=${highlightTrailer}`}
          target="_blank"
        >
          {highlightTrailer ? "See Trailer" : "Trailer Not Available"}
        </Button>
      </Card.ImgOverlay>
    </Modal>
  );
};

export default Highlight;
