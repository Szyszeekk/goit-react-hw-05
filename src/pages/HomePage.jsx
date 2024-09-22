import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTg5NWU5NGZlN2VlOGYzZTJjYzBlNWMzZjE5NjJiMiIsIm5iZiI6MTcyNjkzNjk2NC41MjgxNCwic3ViIjoiNjZhNjRhOTNiNDFiNjU0NjllYjE2ZjZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i0mu6mgh6mofODCsdsjf8wiXnkT0jnW9PjTAzZMdAV4",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trending Movies Today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default HomePage;
