import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [selectedText, setSelectedText] = useState("");
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  useEffect(() => {
    // Adding an event listener to listen for messages from the popup
    const handleMessage = (event) => {
      if (event.data && event.data.type === "selected-text") {
        const text = event.data.text;

        setSelectedText(text);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="extension-title">Friday</h1>
        <button className="cta-button">Click me!</button>
        <div className="input-container">
          <input
            type="text"
            placeholder="Your name"
            required={true}
            className="input-field"
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Your thoughts"
            className="input-field"
            onChange={handleTopicChange}
          />
          <button className="submit-button">Submit</button>
          <h4> Selected Text: {selectedText}</h4>
        </div>
      </header>
    </div>
  );
};

export default App;
