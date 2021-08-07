const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5752f36ae61b15c643aae0dd2c8a004b';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMoviesTrending() {
  return (fetchMovies(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`));
}

export function fetchMovieById(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchCredits(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
}

export function fetchQuery(value) {
  return fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${value}`);
}