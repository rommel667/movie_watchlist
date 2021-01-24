import React from 'react'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Favorites from './components/Favorites';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';

function App() {

  const { queryType, movies } = useSelector(state => state.query)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Favorites} />
        <Route path="/latest" component={Movies} />
        <Route path="/popular" component={Movies} />
        <Route path="/upcoming" component={Movies} />
        <Route path="/search" component={Movies} />
        <Route path="/details" component={MovieDetails} />
      </Switch>
    </div>
  );
}

export default App;
