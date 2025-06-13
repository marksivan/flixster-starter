import "./MovieCard.css";
import Modal from "./Modal.jsx";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function MovieCard({
  movie,
  isWatched = false,
  isFavorite = false,
  onToggleWatched,
  onToggleFavorite,
  isSidebar = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent opening the modal
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  const toggleWatched = (e) => {
    e.stopPropagation(); // Prevent opening the modal
    if (onToggleWatched) {
      onToggleWatched(movie);
    }
  };

  return (
    <div className={`movie-card ${isSidebar ? "sidebar-card" : ""}`}>
      <div className="card-content" onClick={openModal}>
        <img src={posterUrl} alt={movie.title} />
        <h5>{movie.title}</h5>
        {!isSidebar && <p>⭐ {movie.vote_average.toFixed(2)}</p>}

        <div className="card-actions">
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? "❤️" : "♡"}
          </button>

          <button
            className={`watched-btn ${isWatched ? "active" : ""}`}
            onClick={toggleWatched}
            aria-label={isWatched ? "Mark as unwatched" : "Mark as watched"}
          >
            {isWatched ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {showModal && <Modal movie={movie} onClose={closeModal} />}
    </div>
  );
}

export default MovieCard;
