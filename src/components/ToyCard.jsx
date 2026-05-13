import React from "react";

// Displays a single toy's details with like and donate actions
function ToyCard({ toy, onDonate, onLike }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => onLike(toy.id, toy.likes)}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={() => onDonate(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
