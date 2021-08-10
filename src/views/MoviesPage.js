import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import qs from 'query-string';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const value = (qs.parse(location.search)?.query || '');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.elements.searching.value.trim() === '') {
      return alert('Enter a value to search.');
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
        <input type="text" placeholder="Search movies" name="searching"/>
      <button type="submit">Search</button>
      </form>
      {movies && (
          <ul>
          {movies.map(({id, title, name, original_title}) =>
            <li key={id}>
               <Link to={{
                pathname: `${url}/${id}`,
                state: {
                  backUrl: location,
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