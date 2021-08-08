import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesAPI from '../../services/movie-api';
import styles from './Cast.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesAPI.fetchCredits(movieId).then(setActors);
  }, [movieId]);
  return (
     <>
      {actors && 
        <ul className={styles.list}>
        {actors.cast.map(({ id, name, profile_path, character }) =>
          <li key={id} className={styles.item}>
            <img
                  src={`https://image.tmdb.org/t/p/w185/${profile_path ?? 'tzve3LD534wsCnhOrSqgJ1mnRma.jpg'}`}
                  alt="name"
              />
            <p>{name}</p>
            <p>{`Character: ${character}`}</p>
          </li>)}
        </ul>}
    </>
  );
}