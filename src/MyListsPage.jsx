import "./MyListsPage.css";
import MovieCard from "./MovieCard.jsx";

/**
 * MyListsPage component displays the user's watched and favorite movies
 * This is a separate page accessible from the header navigation
 */
function MyListsPage({
  watchedMovies,
  favoriteMovies,
  onToggleWatched,
  onToggleFavorite,
  onNavigateHome,
}) {
  return (
    <div className="my-lists-page">
      {/* Header with back navigation */}
      <div className="lists-header">
        <button className="back-button" onClick={onNavigateHome}>
          &larr; Back to Home
        </button>
        <h1>My Lists</h1>
      </div>

      <div className="lists-container">
        {/* Watched Movies Section */}
        <div className="list-section">
          <h2>Watched Movies</h2>
          <div className="movies-grid">
            {watchedMovies.length > 0 ? (
              watchedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isWatched={true}
                  // Check if this watched movie is also in favorites
                  isFavorite={favoriteMovies.some((m) => m.id === movie.id)}
                  onToggleWatched={() => onToggleWatched(movie)}
                  onToggleFavorite={() => onToggleFavorite(movie)}
                />
              ))
            ) : (
              <p className="empty-message">No watched movies yet</p>
            )}
          </div>
        </div>

        {/* Favorite Movies Section */}
        <div className="list-section">
          <h2>Favorite Movies</h2>
          <div className="movies-grid">
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={true}
                  // Check if this favorite movie is also watched
                  isWatched={watchedMovies.some((m) => m.id === movie.id)}
                  onToggleWatched={() => onToggleWatched(movie)}
                  onToggleFavorite={() => onToggleFavorite(movie)}
                />
              ))
            ) : (
              <p className="empty-message">No favorite movies yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyListsPage;
