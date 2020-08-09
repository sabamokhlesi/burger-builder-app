import React from 'react';
import './App.css';
import Nav from './components/nav/nav'
import BurgerBuilder from './components/burger-builder/burger-builder'
import CheckOut from './components/check-out/check-out'
import {Route,Switch} from 'react-router-dom'
import Orders from './components/orders/orders'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route path='/orders' component={Orders}/>
        <Route path='/checkOut' component= {CheckOut}/>
        <Route path='/' exact component= {BurgerBuilder}/>
      </Switch>
    </div>
  );
}

export default App;
