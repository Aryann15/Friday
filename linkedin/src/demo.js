import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [chat, setChat] = useState("");
  const [jobDetails, setJobDetails] = useState ("")
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [result,setResult] = useState ("")
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  useEffect(() => {
    // Adding an event listener to listen for messages from the popup
    const handleMessage = (event) => {
      if (event.data && event.data.type === "chat-text") {
        const chat_text = event.data.text;
        setChat(chat_text);
      }
      if (event.data && event.data.type === "job-details-text") {
        const job_details = event.data.text;
        setJobDetails(job_details)
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  async function handleMessages () {
    const formData = new FormData();
    formData.append("text",setChat)
    formData.append("name",name)
    formData.append("topic",topic)
    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.text();
        console.log(topic)
        console.log(result);
        setResult(result)
      } else {
        alert("Error: Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
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
          <button onClick={handleMessages} className="submit-button">Submit</button>
          <h4> job details: {jobDetails} </h4>
          <h4> chat : {chat}</h4>
        </div>
      </header>
    </div>
  );
};

export default App;
