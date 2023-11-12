import React from 'react';
import './App.css'

function App () {

  const handleClick =() => {
    alert("welcome mr stark!")
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="extension-title">Friday Extension</h1>
        <button onClick={handleClick} className="cta-button">
          Click me!
        </button>
        <div className="input-container">
          <input type="text" placeholder="Your name" required={true} className="input-field" />
          <input type="text" placeholder="Your thoughts" className="input-field" />
          <button className="submit-button">Submit</button>
        </div>
      </header>
    </div>
  );
  
  }
export default App;
