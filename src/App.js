import React from 'react';
import logo from './logo.svg';
import './App.css';
import Adapter from './Adapter'

function App() {
  Adapter.ownedGames('76561198062849350').then(console.log)
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
