import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari localStorage
  const fetchRatedMovies = async () => {
    const storedRatings = localStorage.getItem("movieRatings");
    const parsedRatings = storedRatings ? JSON.parse(storedRatings) : {};

    // Fetch movie details based on rated movies/series IDs
    const ratedMovieDetails = await Promise.all(
      Object.keys(parsedRatings).map(async (movieId) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=7f3ec5a7a972d6139475e4ff9806d580`
          );
          return { ...response.data, userRating: parsedRatings[movieId] };
        } catch (error) {
          console.error(`Failed to fetch details for movie ID: ${movieId}`);
          return null;
        }
      })
    );

    // Filter out null results (failed requests)
    setRatedMovies(ratedMovieDetails.filter((movie) => movie !== null));
    setLoading(false);
  };

  useEffect(() => {
    fetchRatedMovies();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">{error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h2 className="text-4xl font-bold text-orange-500 mb-4">
        Rated Movies/TV Shows
      </h2>

      {ratedMovies.length === 0 ? (
        <p className="text-gray-300">
          You havent rated any movies or TV shows yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ratedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h4 className="text-lg font-semibold text-white">
                  {movie.title || movie.name}
                </h4>
              </Link>
              <p className="text-gray-400">
                Your Rating: {movie.userRating} / 5
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatedMovies;
