import React, {Component} from 'react';
import './App.css';
import {ScoreBoard} from "../components/score-board/score-board";

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Oversikt over gruppenes besvarelser</h1>
        </header>
        <main>
          <ScoreBoard/>
        </main>
      </div>
    )
  }
}

export default App;
