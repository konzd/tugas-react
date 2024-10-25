import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BerandaView = ({
  trendingMovies = [],
  movies = [],
  upcomingMovies = [],
  onGenreSelect,
  genres = [],
  showGenreDropdown,
  setShowGenreDropdown,
  loading,
  error,
  selectedGenre,
  setSelectedGenre,
}) => {
  const movieListRef = useRef(null);
  const trendingListRef = useRef(null);
  const upcomingListRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (genres.length > 0 && !selectedGenre) {
      const randomIndex = Math.floor(Math.random() * genres.length);
      const randomGenre = genres[randomIndex];
      setSelectedGenre(randomGenre.id);
      onGenreSelect(randomGenre.id);
    }
  }, [genres, selectedGenre, onGenreSelect, setSelectedGenre]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="p-4 relative bg-black text-white font-roboto"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* Daftar Trending Movies */}
      <h2 className="text-3xl font-bold text-center text-orange-500 mt-8 mb-4">
        Trending Movies
      </h2>

      {/* Container for Trending Movies */}
      <div className="relative">
        {/* Scroll Buttons for Trending Movies */}
        {showButtons && (
          <>
            <button
              onClick={() => scroll(trendingListRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll(trendingListRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        <div
          className="flex overflow-x-hidden space-x-4 py-4 justify-center" // Centered the trending movies
          ref={trendingListRef}
        >
          {trendingMovies.length > 0
            ? trendingMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative min-w-[200px] m-2 rounded overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer bg-gray-800"
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-0 w-full text-white text-center">
                      <h3 className="text-sm font-bold">
                        {movie.title || movie.name}
                      </h3>
                      <p className="text-xs">Rating: {movie.vote_average}</p>
                    </div>
                  </Link>
                </div>
              ))
            : !loading && <p>Tidak ada trending movies</p>}
        </div>
      </div>

      {/* Daftar Film Berdasarkan Genre */}
      <h2 className="text-3xl font-bold text-center text-orange-500 mt-8 mb-4">
        Film Berdasarkan Genre
      </h2>

      {/* Pemilihan Genre */}
      <div className="text-center mt-6 mb-4 relative">
        <button
          onClick={() => setShowGenreDropdown((prev) => !prev)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {selectedGenre
            ? genres.find((g) => g.id === selectedGenre)?.name
            : "Select Genre"}
        </button>
        {showGenreDropdown && (
          <div className="absolute z-20 flex flex-row justify-center items-center mt-2 bg-black text-white rounded shadow-lg p-2">
            {genres.length > 0 ? (
              genres.map((genre) => (
                <div
                  key={genre.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => {
                    onGenreSelect(genre.id);
                    setSelectedGenre(genre.id);
                    setShowGenreDropdown(false);
                  }}
                >
                  {genre.name}
                </div>
              ))
            ) : (
              <p className="text-center">Genre tidak tersedia</p>
            )}
          </div>
        )}
      </div>
      <br />

      {/* Container for Genre Movies */}
      <div className="relative">
        <div className="mt-6 mb-4" /> {/* Spacer between genre and movies */}
        {/* Scroll Buttons for Genre Movies */}
        {showButtons && (
          <>
            <button
              onClick={() => scroll(movieListRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll(movieListRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <div
          className="flex overflow-x-hidden space-x-4 py-4 justify-center mx-4" // Centered and added horizontal margin for genre movies
          ref={movieListRef}
        >
          {movies.length > 0
            ? movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative min-w-[200px] m-2 rounded overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer bg-gray-800"
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-0 w-full text-white text-center">
                      <h3 className="text-sm font-bold">
                        {movie.title || movie.name}
                      </h3>
                      <p className="text-xs">Rating: {movie.vote_average}</p>
                    </div>
                  </Link>
                </div>
              ))
            : !loading && <p>Tidak ada film yang tersedia untuk genre ini</p>}
        </div>
      </div>

      {/* Daftar Upcoming Movies */}
      <h2 className="text-3xl font-bold text-center text-orange-500 mt-8 mb-4">
        Upcoming Movies
      </h2>

      {/* Container for Upcoming Movies */}
      <div className="relative">
        {/* Scroll Buttons for Upcoming Movies */}
        {showButtons && (
          <>
            <button
              onClick={() => scroll(upcomingListRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll(upcomingListRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white transition-all p-2 rounded mx-2 z-10 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <div
          className="flex overflow-x-hidden space-x-4 py-4 justify-center mx-4" // Centered and added horizontal margin for upcoming movies
          ref={upcomingListRef}
        >
          {upcomingMovies.length > 0
            ? upcomingMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative min-w-[200px] m-2 rounded overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer bg-gray-800"
                >
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-0 w-full text-white text-center">
                      <h3 className="text-sm font-bold">
                        {movie.title || movie.name}
                      </h3>
                      <p className="text-xs">Rating: {movie.vote_average}</p>
                    </div>
                  </Link>
                </div>
              ))
            : !loading && <p>Tidak ada upcoming movies</p>}
        </div>
      </div>
    </div>
  );
};

export default BerandaView;
