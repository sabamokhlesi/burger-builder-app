import React from 'react';
import './App.css';
import Nav from './components/nav/nav'
import BurgerBuilder from './components/burger-builder/burger-builder'
import {Route,Switch,Redirect} from 'react-router-dom'
import Logout from './components/Authenticating/logout/logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './components/hoc/asyncComponent/asyncComponent'


const asyncCheckout = asyncComponent(() => {
  return import('./components/check-out/check-out');
});

const asyncOrders = asyncComponent(() => {
  return import('./components/orders/orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./components/Authenticating/auth');
});

class App extends React.Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render () {
    let routes = (
      <Switch>
        
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkOut" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Nav/>
        {routes}
        
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(App);
