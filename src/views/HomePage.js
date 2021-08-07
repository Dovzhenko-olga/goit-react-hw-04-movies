import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import styles from './Pages.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMoviesTrending().then(data => setMovies(data.results));
  }, []);

  return (
    <div className={styles.home}>
    <h1>Trending today</h1>
      {movies && (
          <ul>
          {movies.map(({id, title, name, original_title}) =>
            <li key={id}>
               <Link to={{
                pathname: `/movies/${id}`,
                state: {
                  backUrl: '/',
                },
              }}>
                 {title ?? name ?? original_title}
                </Link>
            </li>)}
        </ul>
       )}
    </div>
  );
}