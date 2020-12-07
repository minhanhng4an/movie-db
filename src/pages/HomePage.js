import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import api from "../apiService";
import MovieList from "../components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlight from "../components/Highlight";
import HomeCarousel from "../components/HomeCarousel";
import PublicNavbar from "../components/PublicNavbar";

const HomePage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHighlight, setLoadingHighlight] = useState(false);
  const [movies, setMovies] = useState([]);
  const [conf, setConf] = useState();
  const [highlightId, setHighlightId] = useState(undefined);
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightTrailer, setHighlightTrailer] = useState(undefined);
  const [genres, setGenres] = useState([]);
  const [availableGenreIds, setAvailableGenreIds] = useState(new Set());
  const [availableGenres, setAvailableGenres] = useState([]);

  const highlightMovie = movies.filter((movie) => movie.id === highlightId)[0];

  const handleScroll = () => {
    if (window.scrollY > 400) {
      document.querySelector(".public-nav").classList.add("nav-scroll");
    } else {
      document.querySelector(".public-nav").classList.remove("nav-scroll");
    }
  };

  const getData = async (service, endpoint) => {
    try {
      const response = await service.get(endpoint);
      const data = await response.data;

      if (response.status === 200) {
        return data;
      } else {
        setErrorMsg(`FETCH MOVIES ERROR: ${data.message}`);
      }
    } catch (error) {
      setErrorMsg(`FETCH MOVIES ERROR: ${error.message}`);
    }
    return;
  };

  const fetchGenres = useCallback(async () => {
    setLoading(true);
    const data = await getData(api, "/genre/movie/list");
    setGenres(data.genres);

    setAvailableGenreIds(
      movies
        .map((movie) => movie.genre_ids)
        .reduce(
          (accumulator, currentValue) =>
            new Set([...accumulator, ...currentValue]),
          new Set()
        )
    );

    setLoading(false);
  }, [movies]);

  const fetchTrailer = useCallback(async () => {
    setLoadingHighlight(true);

    const data = await getData(api, `/movie/${highlightId}/videos`);

    try {
      const trailers = data.results.filter((video) =>
        video.type.toLowerCase().includes("trailer")
      );

      setHighlightTrailer(trailers[trailers.length - 1].key);
    } catch {
      setHighlightTrailer(undefined);
    }

    setLoadingHighlight(false);
  }, [highlightId]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const data = await getData(api, "/trending/movies/week");
    setMovies(data.results);

    setLoading(false);
  }, []);

  const fetchConfig = useCallback(async () => {
    setLoading(true);

    const data = await getData(api, "/configuration");
    setConf(data.images);

    setLoading(false);
  }, [movies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    fetchTrailer();
  }, [fetchTrailer]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    setAvailableGenres(
      genres.filter((genre) => availableGenreIds.has(genre.id))
    );
  }, [genres, availableGenreIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", function () {
      window.scrollTo(window.scrollX, window.scrollY - 50);
    });
    return () => {
      window.removeEventListener("hashchange");
    };
  }, []);

  return (
    <>
      {!loading && (
        <>
          <PublicNavbar availableGenres={availableGenres} />

          <Container fluid className="page-body">
            <HomeCarousel
              loading={loading}
              movies={movies}
              conf={conf}
              setHighlightId={setHighlightId}
              setShowHighlight={setShowHighlight}
            />
            {genres.map((genre) => (
              <MovieList
                key={genre.id}
                loading={loading}
                movies={movies}
                conf={conf}
                genre={genre}
                setHighlightId={setHighlightId}
                setShowHighlight={setShowHighlight}
              />
            ))}

            {showHighlight && !loadingHighlight && (
              <Highlight
                showHighlight={showHighlight}
                setShowHighlight={setShowHighlight}
                conf={conf}
                highlightMovie={highlightMovie}
                highlightTrailer={highlightTrailer}
                availableGenres={availableGenres}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default HomePage;
