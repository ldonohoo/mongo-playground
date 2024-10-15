import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  const [movies, setMovies] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // fetch movie data
    axios.get('http://localhost:5001/api/movies')
      .then(response => {
        setMovies(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (

    <div className="App">
      <h1>bad movies!</h1>
      <ul>
        { isLoading ? 
          <>
            {[...Array(10)].map((_, index) => (
              <div key={index} style={{ marginBottom: '1px' }}>

                <Skeleton count={1} height={15} width={400} style={{ margin: '1px 0' }} />
              </div>
            ))}
          </> :
          <>
          {movies.map(movie => (
            <li key={movie._id}>
              {movie.title} - IMDb Rating: {movie.imdb.rating}
            </li>
          ))}
          </>
        } 
        
      </ul>
    </div>
  );
}

export default App;
