import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    // Add an event listener to listen for messages from the popup
    const handleMessage = (event) => {
      // Check if the message is from the popup and has the expected type
      if (event.data && event.data.type === "selected-text") {
        const text = event.data.text;

        // Handle the selected text in your React component
        setSelectedText(text);
      }
    };

    window.addEventListener("message", handleMessage);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // Empty dependency array ensures the effect runs once during component mount

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
          />
          <input
            type="text"
            placeholder="Your thoughts"
            className="input-field"
          />
          <button className="submit-button">Submit</button>
          <h4> Selected Text: {selectedText}</h4>
        </div>
      </header>
    </div>
  );
};

export default App;
