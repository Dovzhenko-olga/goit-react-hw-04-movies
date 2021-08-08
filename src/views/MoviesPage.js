import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import qs from 'query-string';

export default function MoviesPage() {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [value, setValue] = useState(qs.parse(search)?.query || '');
  const [movies, setMovies] = useState('');
  
  
  const handleChange = e => {
    
    setValue(e.target.value);
    history.push({
      pathname,
      search: `?query=${e.target.value}`,
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

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   if (value.trim() === '') {
  //     return alert('Enter a value to search.');
  //   }
  //   handleChange(value);
  //   setValue('')
  // }

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <input type="text" value={value} placeholder="Search movies" onChange={handleChange}/>
      <button type="submit">Search</button>
      {/* </form> */}
      {movies && (
          <ul>
          {movies.map(({id, title, name, original_title}) =>
            <li key={id}>
               <Link to={{
                pathname: `/movies/${id}`,
                state: {
                  backUrl: pathname,
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