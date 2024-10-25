import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BerandaView from "./BerandaView";
import {
  setTrendingMovies,
  setGenres,
  setMoviesByGenre,
  fetchMovies,
  fetchGenresData,
  fetchMoviesByGenre,
  fetchUpcomingMovies,
  setUpcomingMovies,
} from "../store/action/BerandaAction";

const Beranda = () => {
  const dispatch = useDispatch();

  const {
    trendingMovies,
    movies,
    genres,
    upcomingMovies,
    loading,
    error,
    selectedGenre,
    showGenreDropdown,
  } = useSelector((state) => ({
    trendingMovies: state.trendingMovies,
    movies: state.movies,
    genres: state.genres,
    upcomingMovies: state.upcomingMovies,
    loading: state.loading,
    error: state.error,
    selectedGenre: state.selectedGenre,
    showGenreDropdown: state.showGenreDropdown,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending movies
        const trendingResponse = await fetchMovies();
        dispatch(setTrendingMovies(trendingResponse.results));

        // Fetch genres
        const genresResponse = await fetchGenresData();
        dispatch(setGenres(genresResponse.genres));

        // Fetch upcoming movies
        const upcomingResponse = await fetchUpcomingMovies();
        dispatch(setUpcomingMovies(upcomingResponse.results));

        // Fetch movies for the initially selected genre
        if (selectedGenre) {
          const moviesByGenreResponse = await fetchMoviesByGenre(selectedGenre);
          dispatch(setMoviesByGenre(moviesByGenreResponse.results));
        }
      } catch (error) {
        console.error("Failed to fetch movies or genres", error);
      }
    };

    fetchData();
  }, [dispatch, selectedGenre]);

  const handleGenreSelect = async (genreId) => {
    dispatch({ type: "SET_SELECTED_GENRE", payload: genreId });
    try {
      const moviesByGenreResponse = await fetchMoviesByGenre(genreId);
      dispatch(setMoviesByGenre(moviesByGenreResponse.results));
    } catch (error) {
      console.error("Failed to fetch movies by genre", error);
    }
  };

  return (
    <BerandaView
      trendingMovies={trendingMovies}
      movies={movies}
      upcomingMovies={upcomingMovies}
      onGenreSelect={handleGenreSelect}
      genres={genres}
      showGenreDropdown={showGenreDropdown}
      setShowGenreDropdown={() => dispatch({ type: "TOGGLE_GENRE_DROPDOWN" })}
      loading={loading}
      error={error}
      selectedGenre={selectedGenre} // Pass the selectedGenre to the view
      setSelectedGenre={(id) =>
        dispatch({ type: "SET_SELECTED_GENRE", payload: id })
      } // Function to update the selected genre
    />
  );
};

export default Beranda;
