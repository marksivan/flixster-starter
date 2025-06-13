import "./Sort.css";
import { useState, useEffect } from "react";

/**
 * Sort component provides options to sort movies by different criteria
 */
function Sort({ onSortChange }) {


  // Fetch genres when component mounts (for potential future use)
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Handle sort change
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  // Generate year options (current year down to 1990)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }

  return (
    <div className="sort-section">
      {/* Sort Options */}
      <div className="sort-menu">
        <form>
          <label htmlFor="sort-movies">Sort By</label>
          <select id="sort-movies" onChange={handleSortChange}>
            <option value="">Select...</option>
            <option value="vote_average">Rating (High to Low)</option>
            <option value="release_date">Release Date (Newest)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Sort;
