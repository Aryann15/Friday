import React, { useEffect, useState } from "react";

const CoverLetterHelper = () => {
    const [jobDetails, setJobDetails] = useState ("")
    const [result,setResult] = useState ("")
    const [resume,setResume] = useState ("")
  
    return (
          <div className="input-container">
            <input
              type="text"
              placeholder="Job details"
              required={true}
              className="input-field"
              onChange={handleNameChange}
            />
            <button onClick={handleMessages} className="submit-button">Submit</button>
          </div>
    );
  };
  
  export default App;
  