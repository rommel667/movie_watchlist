import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Favorites from './components/Favorites';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';

function App() {
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
