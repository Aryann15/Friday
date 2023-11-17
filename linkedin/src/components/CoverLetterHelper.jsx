import React, { useEffect, useState } from "react";

const CoverLetterHelper = () => {
  const [jobDetails, setJobDetails] = useState("");
  const [result, setResult] = useState("");
  const [resume, setResume] = useState("");
  const handleFileUpload = (event) => {
    setResume (event.target.files[0])
  }
  return (
    <div className="input-container">
      <label htmlFor="csv-upload">
        <button variant="contained" component="span" onClick= {handleFileUpload}>
          Upload
        </button>
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          style={{ display: "none" }}
        />
        {resume ? (
          <div>
            <p>File uploaded successfully!</p>
            <button >Generate Cover Letter</button>
          </div>
        ) : (
          <div>
            <p>Upload your resume please </p>
          </div>
        )}
      </label>
    </div>
  );
};
export default CoverLetterHelper;
