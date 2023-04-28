import React from 'react';
import logo from './logo.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App m-3">
      <h1>
        Connect 4
      </h1>
      <h2>
        Companion App
      </h2>
      <hr/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/setup" element={<Setup/>}/>
          <Route path="/play" element={<Play/>}/>
        </Routes>
    </div>
  );
}

export default App;
