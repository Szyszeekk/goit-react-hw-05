import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    navigate(`?query=${query}`, { replace: true });

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTg5NWU5NGZlN2VlOGYzZTJjYzBlNWMzZjE5NjJiMiIsIm5iZiI6MTcyNjkzNjk2NC41MjgxNCwic3ViIjoiNjZhNjRhOTNiNDFiNjU0NjllYjE2ZjZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i0mu6mgh6mofODCsdsjf8wiXnkT0jnW9PjTAzZMdAV4",
      },
    };

    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to load search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
