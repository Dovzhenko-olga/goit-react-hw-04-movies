import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import qs from 'query-string';

// fetchQuery

export default function MoviesPage() {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [value, setValue] = useState(qs.parse(search)?.query || '');
  const [movies, setMovies] = useState(null);

  const searchQuery = (e) => {
    setValue(e.target.value);
    history.push({
      pathname,
      search: `?query=${e.target.value}`,
    });
  };

  useEffect((value) => {
    moviesAPI.fetchQuery(value).then(console.log);
  }, [value]);

  return (
    <>
      <input type="text" value={value} onChange={searchQuery}/>
      <button type="submit">Search</button>
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
    </>
  );
}