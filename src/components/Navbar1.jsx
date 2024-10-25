import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchResultsRef = useRef(null);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjNlYzVhN2E5NzJkNjEzOTQ3NWU0ZmY5ODA2ZDU4MCIsIm5iZiI6MTcyOTUyMjA2Ni4yMDM3NjEsInN1YiI6IjY3MDQ4M2FiNWFlMDFkMDkwZTFkMzA2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E_zvGMwHWpWigbfb_3qYIyizsvuyX9ta_C-CJTs1GyU";

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchedMovies([]);
      setIsSearchVisible(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearchVisible(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7f3ec5a7a972d6139475e4ff9806d580&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`, // Add the authorization header here
          },
        }
      );
      setSearchedMovies(response.data.results);
    } catch (err) {
      setError("Error fetching movie data");
      console.error("Error fetching movie data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="navbar bg-black text-orange-500 w-full relative z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-orange-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-orange-500">
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/rated" className="text-orange-500">
                {" "}
                Rated Movies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          <span className="text-white">Corn</span>
          <span className="bg-orange-500 text-black px-2 rounded-lg">Hut</span>
        </Link>
      </div>

      <div className="navbar-end flex items-center space-x-4 relative">
        <div className="relative z-50">
          <input
            type="text"
            className="input input-bordered text-white bg-black border-gray-600 placeholder-gray-500"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {isSearchVisible && searchedMovies.length > 0 && (
            <div
              ref={searchResultsRef}
              className="absolute top-12 right-0 bg-black text-white p-4 rounded shadow-lg w-64 z-50"
            >
              <ul>
                {searchedMovies.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex items-center py-2 hover:bg-gray-800"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-auto mr-4"
                    />
                    <Link
                      to={`/movies/${movie.id}`}
                      className="block text-white hover:bg-orange-500 hover:text-black p-2 rounded"
                    >
                      {movie.title} ({movie.release_date})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar1;
