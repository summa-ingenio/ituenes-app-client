// Importing necessary dependencies and styles
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Functional component for the iTunes Search App
function App() {
  // State variables to manage search term, media type, search results, and favorites
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");
  const [results, setResults] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Function to perform an asynchronous search using the iTunes API
  const search = async () => {
    try {
      const response = await fetch(
        `https://itunes-app-sever-66f04d5c397b.herokuapp.com/api/search?term=${term}&media=${media}`,
        { mode: "cors" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log(data);
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add an item to the favorites list
  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  // Function to remove an item from the favorites list
  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.trackId !== id)
    );
  };

  // JSX structure for the component
  return (
    <div className="container mt-4">
      <h1 className="mb-4">iTunes Search App</h1>
      <div className="mb-3">
        {/* Input for search term */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter search term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {/* Dropdown for selecting media type */}
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          <option value="all">All</option>
          <option value="music">Music</option>
          <option value="movie">Movie</option>
          {/* ... other media type options ... */}
        </select>
        {/* Button to trigger the search */}
        <button className="btn btn-primary ml-2" onClick={search}>
          Search
        </button>
      </div>
      {/* Display search results */}
      <div className="search-results">
        <h2>Search Results</h2>
        {results ? (
          <ul className="list-group">
            {/* Map through and display each search result */}
            {results.map((item) => (
              <li
                key={item.trackId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.trackName}
                {/* Button to add item to favorites */}
                <button
                  className="btn btn-success"
                  onClick={() => addToFavorites(item)}
                >
                  Add to Favorites
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {/* Display favorites list */}
      <div className="favorites">
        <h2>Favorites</h2>
        <ul className="list-group">
          {/* Map through and display each favorite item */}
          {favorites.map((item) => (
            <li
              key={item.trackId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.trackName}
              {/* Button to remove item from favorites */}
              <button
                className="btn btn-danger"
                onClick={() => removeFromFavorites(item.trackId)}
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Export the component as the default export
export default App;
