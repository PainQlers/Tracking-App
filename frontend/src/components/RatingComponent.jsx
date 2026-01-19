import { useState } from 'react';
import { trackingAPI } from '../services/api';
import '../styles/RatingComponent.css';

export default function RatingComponent({ trackingId, initialRating = 0, onRatingSubmit }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(initialRating > 0);

  const handleRating = async (value) => {
    if (hasVoted || isLoading) return;

    setIsLoading(true);
    try {
      await trackingAPI.vote(trackingId, value);
      setRating(value);
      setHasVoted(true);
      onRatingSubmit?.(value);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rating-component">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star ${
              star <= (hoverRating || rating) ? 'active' : ''
            } ${hasVoted ? 'voted' : ''}`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => !hasVoted && setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={hasVoted || isLoading}
            title={hasVoted ? 'You have already voted' : `Rate ${star}`}
          >
            ★
          </button>
        ))}
      </div>
      {hasVoted && <span className="voted-text">Voted: {rating}/5</span>}
    </div>
  );
}
