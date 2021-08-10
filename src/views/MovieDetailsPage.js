import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import { Link, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
// import Cast from '../components/Cast/Cast';
// import Reviews from '../components/Reviews/Reviews';
import styles from './Pages.module.css';

const Cast = lazy(() => import('../components/Cast/Cast.js' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() => import('../components/Reviews/Reviews.js' /* webpackChunkName: "Reviews" */));

export default function MovieDetailsPage() {
  const history = useHistory();
  const { state } = useLocation();
  const { url, path } = useRouteMatch();
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onBackClick = () => {
    history.push(state.backUrl);
  };

    return (
    <>
      {movie && <>
        <button type="button" className={styles.button} onClick={onBackClick}>&#8701; Go back</button>
        <div className={styles.movie}>
          <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path ?? 'tzve3LD534wsCnhOrSqgJ1mnRma.jpg'}`}
              alt={movie.title ?? movie.name ?? movie.original_title} />
         
          
          <div className={styles.description}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p>User Score: {movie.vote_average * 10}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul className={styles.genresList}>
              {movie.genres.map(({ id, name }) =>
                <li key={id} className={styles.genresItem}>
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
                  backUrl: state.backUrl,
                },
              }}>Cast</Link>
            </li>
            <li>
              <Link to={{
                pathname: `${url}/reviews`,
                state: {
                  backUrl: state.backUrl,
                },
              }}>Reviews</Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div>...</div>}>
        <Route path={`${path}/cast`} exact>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
        </Suspense>
        </>}
    </>
  );
}