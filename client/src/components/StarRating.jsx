import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="fas fa-star text-warning"></span>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <span key={i} className="fas fa-star-half-alt text-warning"></span>
      );
    } else {
      stars.push(<span key={i} className="far fa-star text-warning"></span>);
    }
  }
  return <React.Fragment>{stars}</React.Fragment>;
};

export default StarRating;
