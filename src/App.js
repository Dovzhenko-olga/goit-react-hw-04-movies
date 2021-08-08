import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar/AppBar';
// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import NotFoundPage from './views/NotFoundPage';
// import MovieDetailsPage from './views/MovieDetailsPage';


const HomePage = lazy(() => import('./views/HomePage.js' /* webpackChunkName: "HomePage" */));
const MoviesPage = lazy(() => import('./views/MoviesPage.js' /* webpackChunkName: "MoviesPage" */));
const NotFoundPage = lazy(() => import('./views/NotFoundPage.js' /* webpackChunkName: "NotFoundPage" */));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js' /* webpackChunkName: "MovieDetailsPage" */));

export default function App() {
  return (
    <Container>
      <AppBar />
      
      <Suspense fallback={<div>...</div>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          
          <Route>
            <NotFoundPage />
          </Route>
          </Switch>
        </Suspense>
    </Container>
  );
}
