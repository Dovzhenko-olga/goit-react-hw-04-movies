import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import styles from './Pages.module.css';

export default function MovieDetailsPage() {
  const history = useHistory();
  const {state} = useLocation();
  const { url, path } = useRouteMatch();
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onBackClick = () => {
    history.push({
      pathname: state?.backUrl || '/',
      // search: `query=${state.value}`,
    });
    // console.log(history);
    // console.log(state);
  };
  
  return (
    <>
      {movie && <>
        <button type="button" className={styles.button} onClick={onBackClick}>&#8701; Go back</button>
        <div className={styles.movie}>
          <img className={styles.poster} src={movie.homepage + movie.poster_path} alt={movie.title ?? movie.name ?? movie.original_title} />
          <div className={styles.description}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p>User Score: {movie.vote_average}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres.map(({ id, name }) =>
                <li key={id}>
                  {name}
                </li>)}
            </ul>
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>Additional information</p>
          <ul>
            <li>
              <Link to={{
                pathname: `${url}/cast`,
                state: {
                  backUrl: url,
                },
              }}>Cast</Link>
            </li>
            <li>
              <Link to={{
                pathname: `${url}/reviews`,
                state: {
                  backUrl: url,
                },
              }}>Reviews</Link>
            </li>
          </ul>
        </div>
        
        <Route path={`${path}/cast`} exact>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
        </>}
    </>
  );
}