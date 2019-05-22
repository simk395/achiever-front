import React from 'react';
import {Switch, Route } from 'react-router-dom'
import Landing from './containers/Landing'
import User from './containers/User'
import NotFound from './components/404'
import './css/style.css';

function App() {
  return (
    <div className="app bg bg-full">
      <Switch>
        <Route path='/user/steamid=:id' component={User}/>
        <Route path='/404' component={NotFound}/>
        <Route path='/' component={Landing}/>
      </Switch>
    </div>
  );
}

export default App;
