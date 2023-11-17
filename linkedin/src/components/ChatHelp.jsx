import React, { useEffect, useState } from "react";
// import "./ChatHelp.css";

const ChatHelp = () => {
  const [chat, setChat] = useState("");
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === "chat-text") {
        const chat_text = event.data.text;
        setChat(chat_text);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  async function handleMessages() {
    const formData = new FormData();
    formData.append("text", chat);
    formData.append("name", name);
    formData.append("topic", topic);
    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.text();
        console.log(topic);
        console.log(result);
        setResult(result);
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
        <div className="input-container">
          <input
            type="text"
            placeholder="Your name as in linkedin profile"
            required={true}
            className="input-field"
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Topic of discussion"
            className="input-field"
            onChange={handleTopicChange}
          />
          {name ? (
            topic ? (
              chat ? (
                <button onClick={handleMessages} className="submit-button">
                  Submit
                </button>
              ) : (
                <div>
                  <p>Please select the conversation</p>
                </div>
              )
            ) : (
              <div>
                <p>Please enter your topic</p>
              </div>
            )
          ) : (
            <div>
              <p>Please enter your name</p>
            </div>
          )}
          {result && (
            <div className="result">
              <p>{result}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default ChatHelp;
