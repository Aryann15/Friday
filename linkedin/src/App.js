import React, { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');


  return (
    <div className="App">
      <header className="App-header">
        <h1>Friday</h1>
        <div>
          <h2 onClick={() => handleSubHeadingClick('Chat Help')}>Chat</h2>
          <h2 onClick={() => handleSubHeadingClick('Cover Letter')}>Job Details</h2>
        </div>
        <div>
          {content && <p>{content}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
