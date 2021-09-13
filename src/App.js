import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar/AppBar';
import { css } from "@emotion/react";
import {PulseLoader} from "react-spinners";
import { ToastContainer } from 'react-toastify';
import styles from './App.module.css';
// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import NotFoundPage from './views/NotFoundPage';
// import MovieDetailsPage from './views/MovieDetailsPage';


const HomePage = lazy(() => import('./views/HomePage.js' /* webpackChunkName: "HomePage" */));
const MoviesPage = lazy(() => import('./views/MoviesPage.js' /* webpackChunkName: "MoviesPage" */));
const NotFoundPage = lazy(() => import('./views/NotFoundPage.js' /* webpackChunkName: "NotFoundPage" */));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js' /* webpackChunkName: "MovieDetailsPage" */));
const override = css`
  display: block;
  margin: 25px auto;
  border-color: red;
`;

export default function App() {
  return (
    <Container>
      <AppBar />
      
      <Suspense fallback={<PulseLoader color="#079ada" css={override} size={15} />}>
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
      <ToastContainer className={styles.toast}/>
    </Container>
  );
}
