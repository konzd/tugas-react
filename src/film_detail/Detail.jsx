import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(() => {
    const storedRatings = localStorage.getItem("movieRatings");
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    return parsedRatings[id] || 0;
  });
  const [similarMovies, setSimilarMovies] = useState([]); // State for similar movies

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7f3ec5a7a972d6139475e4ff9806d580`
      );
      setMovie(response.data);
      setLoading(false);
      fetchSimilarMovies(response.data.genres); // Fetch similar movies based on genres
    } catch (error) {
      setError("Failed to load movie details");
      setLoading(false);
    }
  };

  // Fetch similar movies
  const fetchSimilarMovies = async (genres) => {
    if (genres.length > 0) {
      try {
        const genreIds = genres.map((genre) => genre.id).join(",");
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=7f3ec5a7a972d6139475e4ff9806d580&with_genres=${genreIds}&page=1`
        );
        // Filter out the current movie from the similar movies
        const filteredMovies = response.data.results.filter(
          (movie) => movie.id !== parseInt(id)
        );
        setSimilarMovies(filteredMovies);
      } catch (error) {
        console.error("Failed to fetch similar movies:", error);
      }
    }
  };

  // Handle rating
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  // Handle submit rating
  const handleSubmit = async () => {
    const storedRatings = localStorage.getItem("movieRatings");
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
    parsedRatings[id] = rating;
    localStorage.setItem("movieRatings", JSON.stringify(parsedRatings));

    const mediaType = movie.title ? "movie" : "tv"; // Jika ada title, berarti movie, kalau tidak maka tv series
    const apiUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/rating`;

    // Kirim rating ke API
    try {
      await axios.post(
        apiUrl,
        { value: rating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjNlYzVhN2E5NzJkNjEzOTQ3NWU0ZmY5ODA2ZDU4MCIsIm5iZiI6MTcyOTUyMjA2Ni4yMDM3NjEsInN1YiI6IjY3MDQ4M2FiNWFlMDFkMDkwZTFkMzA2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_zvGMwHWpWigbfb_3qYIyizsvuyX9ta_C-CJTs1GyU`,
          },
        }
      );

      console.log("Rating submitted successfully.");
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating.");
    }
  };

  // Handle delete rating
  const handleDeleteRating = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/rating`;

    // Hapus rating dari API
    try {
      await axios.delete(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjNlYzVhN2E5NzJkNjEzOTQ3NWU0ZmY5ODA2ZDU4MCIsIm5iZiI6MTcyOTUyMjA2Ni4yMDM3NjEsInN1YiI6IjY3MDQ4M2FiNWFlMDFkMDkwZTFkMzA2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_zvGMwHWpWigbfb_3qYIyizsvuyX9ta_C-CJTs1GyU`,
        },
      });

      console.log("Rating deleted successfully.");

      // Hapus rating dari localStorage
      const storedRatings = localStorage.getItem("movieRatings");
      const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};
      delete parsedRatings[id]; // Hapus rating dari objek
      localStorage.setItem("movieRatings", JSON.stringify(parsedRatings));

      // Update state untuk mengosongkan rating
      setRating(0);
    } catch (error) {
      console.error("Error deleting rating:", error);
      setError("Failed to delete rating.");
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">{error}</p>;

  return (
    <div className="bg-black min-h-screen flex flex-col w-full">
      {/* Background Image */}
      <div
        className="relative bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          height: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <Link
        to="/"
        className="text-white text-lg mb-4 inline-block p-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition mx-4 mt-4 z-10"
      >
        &larr; Back to Home
      </Link>

      <div className="max-w-6xl mx-auto mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full">
        <div className="flex flex-col md:flex-row w-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 h-auto rounded-lg shadow-md mb-4 md:mb-0 transition-transform transform hover:scale-105"
          />
          <div className="ml-0 md:ml-6 text-gray-300 w-full md:w-2/3">
            <h2 className="text-4xl font-bold mb-2 text-orange-500">
              {movie.title || movie.name}
            </h2>
            <p className="text-sm mb-2">Release Date: {movie.release_date}</p>
            <p className="text-sm mb-2">Your Rating: {rating} / 5</p>
            <p className="text-sm mb-2">
              Runtime: {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
            </p>
            <p className="text-sm mb-2">
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-sm mb-4">{movie.overview}</p>
            {/* Star Rating Input */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-orange-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)} // Update rating on click
                >
                  ★
                </span>
              ))}
            </div>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition mt-2 mr-4"
            >
              Submit Rating
            </button>
            {/* Delete Rating Button */}
            <button
              onClick={handleDeleteRating}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition mt-2"
            >
              Delete Rating
            </button>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Similar Movies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarMovies.map((similarMovie) => (
              <Link
                key={similarMovie.id}
                to={`/movie/${similarMovie.id}`}
                className="bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="text-sm font-bold text-white">
                  {similarMovie.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
