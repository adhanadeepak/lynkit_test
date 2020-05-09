import React from 'react';

import 'App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from 'Pages/Login';
import PrivateRoutes from 'Routes/PrivateRoutes';
import Home from 'Pages/Home';
import Register from 'Pages/Login/Registeration';


window.validateEmail = function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

window.validatePassword = function (val){
    let re=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return re.test(val);
};

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
            <Route  path={`/login`} exact component={Login}/>
            <Route  path={`/register`} exact component={Register}/>
            <PrivateRoutes>
                <Route  path={`/`} exact component={Home} />
            </PrivateRoutes>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
