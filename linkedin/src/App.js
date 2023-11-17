import React, { useState } from 'react';
import './App.css';
import ChatHelp from './components/ChatHelp';
function App() {
  const [content, setContent] = useState('');
  const handleSubHeadingClick = (text) => {
    if (text === 'Chat Help') {
      setContent(<ChatHelp />);
    } else if (text === 'Cover Letter') {
      setContent('These are the job details.');
    }
  };

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
