import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import { axiosWithAuth } from "./helpers/axiosWithAuth";
import "./styles.scss";

import PrivateRoute from './components/PrivateRoute';
import BubblePage  from './components/BubblePage';

function App() {

  const logout = e => {
    e.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/logout', localStorage.getItem('token'))
      .then(res => {
        console.log(res);
        localStorage.setItem('token', '');
        window.location.href = '/login';
      });
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/login" onClick={logout}>logout</a>
        </header>

        <Switch> 
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/bubblePage' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.