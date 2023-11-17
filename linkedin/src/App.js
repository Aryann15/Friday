// App.js

import React, { useState } from 'react';
import ChatHelp from './components/ChatHelp';
import CoverLetterHelper from './components/CoverLetterHelper';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [selectedSubHeading, setSelectedSubHeading] = useState('');

  const handleSubHeadingClick = (text) => {
    setSelectedSubHeading(text);
    if (text === 'Chat Help') {
      setContent(<ChatHelp />);
    } else if (text === 'Cover Letter') {
      setContent(<CoverLetterHelper />);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Friday</h1>
        <div className='sub-headers'>
          <h2
            className={`sub-header ${selectedSubHeading === 'Chat Help' ? 'selected' : ''}`}
            onClick={() => handleSubHeadingClick('Chat Help')}
          >
            Chat
          </h2>
          <h2
            className={`sub-header ${selectedSubHeading === 'Cover Letter' ? 'selected' : ''}`}
            onClick={() => handleSubHeadingClick('Cover Letter')}
          >
            Job Details
          </h2>
        </div>
        <div className="content-container">
          {content}
        </div>
      </header>
    </div>
  );
}

export default App;
