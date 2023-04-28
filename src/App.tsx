import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

const Home =() => (
  <>
    <h1>Connect 4</h1>
    <h2>Companion App</h2>
    <Button 
      variant="outline-primary">Play
    </Button>
    <Card>
      <Card.Header>
        Leaderboard
      </Card.Header>
      <Card.Body>
        Play a game to see your leaderboard...
      </Card.Body>
    </Card>
  </>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
