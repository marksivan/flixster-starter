import "./App.css";
import Search from "./Search.jsx";
import Sort from "./Sort.jsx";
import MovieList from "./MovieList.jsx";
import MyListsPage from "./MyListsPage.jsx";
import { useState, useEffect } from "react";

// Main App component that manages the overall state and navigation

function App() {
  // State for movie browsing and pagination
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
  });

  // State for tracking watched and favorite movies
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // State for navigation between home and my-lists pages
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "my-lists"

  function increasePageNumber() {
    setPage(page + 1);
  }

  function handleSearch(term) {
    setPage(1);
    setSearchTerm(term);
  }

  function handleSortChange(sortOption) {
    setSortBy(sortOption);
  }

  function handleFilterChange(filterOption) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterOption.type]: filterOption.value,
    }));
    setPage(1); // Reset to page 1 when filters change
  }

  // Toggle a movie's watched status (add if not in list, remove if already in list)
  function toggleWatched(movie) {
    setWatchedMovies((prevWatchedMovies) => {
      const isAlreadyWatched = prevWatchedMovies.some((m) => m.id === movie.id);

      if (isAlreadyWatched) {
        return prevWatchedMovies.filter((m) => m.id !== movie.id);
      } else {
        return [...prevWatchedMovies, movie];
      }
    });
  }

  // Toggle a movie's favorite status (add if not in list, remove if already in list)
  function toggleFavorite(movie) {
    setFavoriteMovies((prevFavoriteMovies) => {
      const isAlreadyFavorite = prevFavoriteMovies.some(
        (m) => m.id === movie.id
      );

      if (isAlreadyFavorite) {
        return prevFavoriteMovies.filter((m) => m.id !== movie.id);
      } else {
        return [...prevFavoriteMovies, movie];
      }
    });
  }

  // Load saved movies from localStorage when the app first loads
  useEffect(() => {
    const savedWatchedMovies = localStorage.getItem("watchedMovies");
    const savedFavoriteMovies = localStorage.getItem("favoriteMovies");

    if (savedWatchedMovies) {
      setWatchedMovies(JSON.parse(savedWatchedMovies));
    }

    if (savedFavoriteMovies) {
      setFavoriteMovies(JSON.parse(savedFavoriteMovies));
    }
  }, []);

  // Save movies to localStorage whenever the watched or favorite lists change
  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [watchedMovies, favoriteMovies]);

  // Function to navigate to My Lists page
  function navigateToMyLists() {
    setCurrentPage("my-lists");
  }

  // Function to navigate back to Home page
  function navigateToHome() {
    setCurrentPage("home");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="title">🎥 Flixster</h1>
          <button className="my-lists-button" onClick={navigateToMyLists}>
            My Lists
          </button>
        </div>

        {currentPage === "home" && (
          <div className="controls-row">
            <Search onSearch={handleSearch} />
            <Sort
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </header>

      <main className="app-main">
        {currentPage === "home" ? (
          <div className="main-content">
            <div className="movie-container">
              <MovieList
                page={page}
                searchTerm={searchTerm}
                sortBy={sortBy}
                filters={filters}
                watchedMovies={watchedMovies}
                favoriteMovies={favoriteMovies}
                onToggleWatched={toggleWatched}
                onToggleFavorite={toggleFavorite}
              />
            </div>
            <div className="load-more">
              <button onClick={increasePageNumber}>Load More</button>
              <p className="page-number"> Page {page}</p>
            </div>
          </div>
        ) : (
          <MyListsPage
            watchedMovies={watchedMovies}
            favoriteMovies={favoriteMovies}
            onToggleWatched={toggleWatched}
            onToggleFavorite={toggleFavorite}
            onNavigateHome={navigateToHome}
          />
        )}
      </main>

      <footer>
        <div className="App-footer">
          <p>© 2025 MST</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
