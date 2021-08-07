import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import NotFoundPage from './views/NotFoundPage';
import MovieDetailsPage from './views/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <AppBar />
      
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
    </Container>
  );
}
