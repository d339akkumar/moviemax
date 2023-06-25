import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import SearchIcon from "./search.svg";
import "./App.css";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState(false); const a = "eb2";
  const b = "892";
  const c = "1a";
  const d = `https://www.omdbapi.com?apikey=${a}${b}${c}`;

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`${d}&s=${searchTerm}`);
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
      setSearchError(false);
    } else {
      setMovies([]);
      setSearchError(true);
    }
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${d}&s=${title}`);
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
      setSearchError(false);
      console.log(process.env.API_URL);
    } else {
      setMovies([]);
      setSearchError(true);
    }
  };

  return (
    <div className="app">
      <div className="nav-bar">
        <h1>MovieMax</h1>
        <form onSubmit={handleSearch}>
          <div className="search">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies"
            />
            <button type="submit">
              <img src={SearchIcon} alt="search" />
            </button>
          </div>
        </form>
      </div>
      {searchError ? (
        <div className="empty">
          <h2>No movies found for "{searchTerm}"</h2>
        </div>
      ) : movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;