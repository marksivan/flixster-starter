import "./MovieList.css";
import MovieCard from "./MovieCard.jsx";
import { useState, useEffect } from "react";

/**
 * MovieList component fetches and displays a grid of movies
 * Handles pagination, searching, sorting, and filtering
 */
function MovieList({
  page = 1,
  searchTerm = "",
  sortBy = "",
  filters = {},
  watchedMovies = [],
  favoriteMovies = [],
  onToggleWatched,
  onToggleFavorite,
}) {
  // state to stores the movies fetched from the API
  const [movies, setMovies] = useState([]);
  // state to track if data is currently being loaded
  const [isLoading, setIsLoading] = useState(true);
  // state to store any error that might occur during the API fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        // Determine which API endpoint to use based on whether we're searching or browsing
        let apiURL = searchTerm
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

        // Add filters to the API request if they're specified
        if (filters.genre) {
          apiURL += `&with_genres=${filters.genre}`;
        }

        if (filters.year) {
          apiURL += `&primary_release_year=${filters.year}`;
        }

        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        let results = data.results;

        // Sort the results client-side based on the selected sort option
        // Note: The API doesn't support all our sorting options, so we handle it here
        if (sortBy) {
          results = [...results].sort((a, b) => {
            switch (sortBy) {
              case "vote_average":
                return b.vote_average - a.vote_average; // Higher ratings first
              case "release_date":
                return new Date(b.release_date) - new Date(a.release_date); // Newest first
              case "title":
                return a.title.localeCompare(b.title); // Alphabetical A-Z
              default:
                return 0;
            }
          });
        }

        // Handle pagination - either replace movies (page 1) or append to existing list (page > 1)
        if (page === 1) {
          setMovies(results);
        } else {
          // When loading more pages, combine with existing movies and re-sort the entire list
          const combinedMovies = [...movies, ...results];

          if (sortBy) {
            combinedMovies.sort((a, b) => {
              switch (sortBy) {
                case "vote_average":
                  return b.vote_average - a.vote_average;
                case "release_date":
                  return new Date(b.release_date) - new Date(a.release_date);
                case "title":
                  return a.title.localeCompare(b.title);
                default:
                  return 0;
              }
            });
          }

          setMovies(combinedMovies);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchTerm, sortBy, filters]); // Re-run when any of these change

  if (isLoading && page === 1) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">An error occurred: {error}</div>;
  }

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            // Check if this movie is in the watched or favorites lists
            isWatched={watchedMovies.some((m) => m.id === movie.id)}
            isFavorite={favoriteMovies.some((m) => m.id === movie.id)}
            onToggleWatched={onToggleWatched}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <div className="no-results">No movies found matching your criteria</div>
      )}
    </div>
  );
}

export default MovieList;
