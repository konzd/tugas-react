import axios from "axios";

// Ganti dengan token Anda
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjNlYzVhN2E5NzJkNjEzOTQ3NWU0ZmY5ODA2ZDU4MCIsIm5iZiI6MTcyOTUyMjA2Ni4yMDM3NjEsInN1YiI6IjY3MDQ4M2FiNWFlMDFkMDkwZTFkMzA2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_zvGMwHWpWigbfb_3qYIyizsvuyX9ta_C-CJTs1GyU";

// Ekspor konstanta action types
export const FETCH_TRENDING_MOVIES = "SET_TRENDING_MOVIES";
export const FETCH_GENRES = "SET_GENRES";
export const FETCH_MOVIES_BY_GENRE = "SET_MOVIES_BY_GENRE";
export const SET_EXISTING_RATINGS = "SET_EXISTING_RATINGS";

// Fungsi untuk mengambil trending movies
export const fetchMovies = async () => {
  const API_URL = "https://api.themoviedb.org/3/trending/all/week";

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    throw error;
  }
};

// Fungsi untuk mengambil genre
export const fetchGenresData = async () => {
  const API_URL = "https://api.themoviedb.org/3/genre/movie/list";

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch genres", error);
    throw error;
  }
};

// Fungsi untuk mengambil existing ratings dari API
export const fetchExistingRatings = async (movieId) => {
  // Ganti dengan endpoint yang sesuai
  const API_URL = `/api/ratings/${movieId}`;

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch existing ratings", error);
    throw error;
  }
};

// Action untuk set trending movies
export const setTrendingMovies = (movies) => ({
  type: FETCH_TRENDING_MOVIES,
  payload: movies,
});

// Action untuk set genres
export const setGenres = (genres) => ({
  type: FETCH_GENRES,
  payload: genres,
});

// Action untuk set existing ratings
export const setExistingRatings = (ratings) => ({
  type: SET_EXISTING_RATINGS,
  payload: ratings,
});

// Fungsi untuk mengambil movie berdasarkan genre
export const fetchMoviesByGenre = async (genreId) => {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movies by genre", error);
    throw error;
  }
};

// Action untuk set movies by genre
export const setMoviesByGenre = (movies) => ({
  type: FETCH_MOVIES_BY_GENRE,
  payload: movies,
});

// Action Types
export const SET_UPCOMING_MOVIES = "SET_UPCOMING_MOVIES";

// Action to set upcoming movies
export const setUpcomingMovies = (movies) => ({
  type: SET_UPCOMING_MOVIES,
  payload: movies,
});

// Fetch upcoming movies from API
export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=7f3ec5a7a972d6139475e4ff9806d580&language=en-US&page=1"
  );
  const data = await response.json();
  return data;
};
