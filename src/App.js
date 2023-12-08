import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.trackId !== id)
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">iTunes Search App</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          <option value="all">All</option>
          <option value="musicArtist">Music</option>
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="musicVideo">Music Video</option>
          <option value="audiobook">Audiobook</option>
          <option value="shortFilm">Short Film</option>
          <option value="tvShow">TV Show</option>
          <option value="software">Software</option>
          <option value="ebook">EBook</option>
        </select>
        <button className="btn btn-primary ml-2" onClick={search}>
          Search
        </button>
      </div>
      <div className="search-results">
        <h2>Search Results</h2>
        <ul className="list-group">
          {results.map((item) => (
            <li
              key={item.trackId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.trackName}
              <button
                className="btn btn-success"
                onClick={() => addToFavorites(item)}
              >
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="favorites">
        <h2>Favorites</h2>
        <ul className="list-group">
          {favorites.map((item) => (
            <li
              key={item.trackId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.trackName}
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

export default App;
