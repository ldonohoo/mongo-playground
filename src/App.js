import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch top-rated movies from the backend API
    axios.get('http://localhost:5001/api/top-rated-movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Top Rated Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.title} - IMDb Rating: {movie.imdb.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
