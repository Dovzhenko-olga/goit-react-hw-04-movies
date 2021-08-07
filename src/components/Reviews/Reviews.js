// fetchReviews
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesAPI from '../../services/movie-api';
import styles from './Review.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI.fetchReviews(movieId).then(setReviews);
  }, [movieId]);
  return (
     <>
      {reviews && (reviews.results.length > 0
        ? (<ul className={styles.list}>
          {reviews.results.map(({ id, author, content }) =>
            <li key={id} className={styles.item}>{`Author: ${author}`} <br /> {content}</li>)}
        </ul>)
        : <p className={styles.notice}>We don't have any reviews for this movie.</p>)}
    </>
  );
}