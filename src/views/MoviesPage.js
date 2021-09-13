import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import styles from './Pages.module.css';
import qs from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    autoClose: 3000,
    hideProgressBar: false,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    closeOnClick: true,
};

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const value = (qs.parse(location.search)?.query || '');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.elements.searching.value.trim() === '') {
      return toast('Enter a value to search!', options);
    }
    history.push({
      ...location,
      search: `query=${e.target.elements.searching.value}`,
    });

  };
  
  useEffect(() => {
    if (value === '') {
      return;
    }
    moviesAPI.fetchQuery(value)
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => console.log(error));
  }, [value]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search movies" name="searching" className={styles.input}/>
      <button type="submit" className={styles.button}>Search</button>
      </form>
      {movies && (
        <ul className={styles.trendingList}>
          {movies.map(({id, title, name, original_title, poster_path}) =>
            <li key={id} className={styles.trendingItem}>
               <Link to={{
                pathname: `${url}/${id}`,
                state: {
                  backUrl: location,
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
    </>
  );
}