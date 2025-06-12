import "./Search.css";
import React, { useState } from "react";



function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };
  return (
    <div className="search-section">
      <form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && ( 
                <button
                  className="clear-search"
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear Search"
                >
                  <span className="close">&times;</span>
                </button>
              )}


          </div>

          <button type="submit" className="search-button">
            <span style={{ fontSize: "20px" }}>&#128269;</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
