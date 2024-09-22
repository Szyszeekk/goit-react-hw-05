import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTg5NWU5NGZlN2VlOGYzZTJjYzBlNWMzZjE5NjJiMiIsIm5iZiI6MTcyNjkzNjk2NC41MjgxNCwic3ViIjoiNjZhNjRhOTNiNDFiNjU0NjllYjE2ZjZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i0mu6mgh6mofODCsdsjf8wiXnkT0jnW9PjTAzZMdAV4",
    },
  };

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (err) {
        setError("Failed to load cast.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;
  if (cast.length === 0) return <div>No cast found.</div>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p>
              {actor.name} as {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
