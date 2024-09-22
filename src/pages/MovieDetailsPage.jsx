import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../css/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTg5NWU5NGZlN2VlOGYzZTJjYzBlNWMzZjE5NjJiMiIsIm5iZiI6MTcyNjkzNjk2NC41MjgxNCwic3ViIjoiNjZhNjRhOTNiNDFiNjU0NjllYjE2ZjZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i0mu6mgh6mofODCsdsjf8wiXnkT0jnW9PjTAzZMdAV4",
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found!</div>;

  return (
    <>
      <Link to={`/movies`} className={css.link}>
        Go back
      </Link>
      <div className={css.container}>
        <div>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          )}
        </div>
        <div>
          <h1>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
