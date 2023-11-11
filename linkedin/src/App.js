import React from 'react';
import './App.css';

function App () {

  const handleClick =() => {
    alert("welcome mr stark!")
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Friday</h1>
        <button onClick={handleClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
