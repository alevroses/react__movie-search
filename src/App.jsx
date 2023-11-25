import { useState } from "react";
import "./stylesheets/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const URL =
    "https://api.themoviedb.org/3/search/movie";
  const API_KEY =
    "914cefac3a3d234c58ef46903ce7ebd3";

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${URL}?query=${search}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("An error occurred!!!", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the name of your movie"
          value={search}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="search-button">
          Search
        </button>
      </form>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { App };
