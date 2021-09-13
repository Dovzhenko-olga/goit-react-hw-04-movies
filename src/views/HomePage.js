import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import styles from './Pages.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const {pathname} = useLocation();

  useEffect(() => {
    moviesAPI.fetchMoviesTrending().then(data => setMovies(data.results));
  }, []);

  return (
    <div className={styles.home}>
    <h1>Trending today</h1>
      {movies && (
          <ul className={styles.trendingList}>
          {movies.map(({id, title, name, original_title, poster_path}) =>
            <li key={id} className={styles.trendingItem}>
               <Link to={{
                pathname: `/movies/${id}`,
                state: {
                  backUrl: pathname,
                },
              }}>
                <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${poster_path ?? 'tzve3LD534wsCnhOrSqgJ1mnRma.jpg'}`}
              alt={title ?? name ?? original_title} />
                 <p className={styles.name}>{title ?? name ?? original_title}</p>
                </Link>
            </li>)}
        </ul>
       )}
    </div>
  );
}