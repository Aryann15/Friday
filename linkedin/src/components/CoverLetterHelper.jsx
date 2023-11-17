import React, { useEffect, useState } from "react";

const CoverLetterHelper = () => {
  const [jobDetails, setJobDetails] = useState("");
  const [result, setResult] = useState("");
  const [resume, setResume] = useState("");
  const handleFileUpload = (event) => {
    setResume (event.target.files[0])
  }
  useEffect(() => {
    const handleJobDetails = (event) => {
      if (event.data && event.data.type === "job-details-text") {
        const job_details = event.data.text;
        setJobDetails(job_details)
      }
    };
    window.addEventListener("message", handleJobDetails);
    return () => {
      window.removeEventListener("message", handleJobDetails);
    };
  }, []);


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
