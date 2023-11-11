import React from 'react';
import './App.css';

function App () {

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Chrome Extension</h1>
        <button onClick={handleClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
