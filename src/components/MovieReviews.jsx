import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTg5NWU5NGZlN2VlOGYzZTJjYzBlNWMzZjE5NjJiMiIsIm5iZiI6MTcyNjkzNjk2NC41MjgxNCwic3ViIjoiNjZhNjRhOTNiNDFiNjU0NjllYjE2ZjZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.i0mu6mgh6mofODCsdsjf8wiXnkT0jnW9PjTAzZMdAV4>",
    },
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, options);
        setReviews(response.data.results);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;
  if (reviews.length === 0) return <div>No reviews found.</div>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
