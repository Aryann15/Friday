import React, { useEffect, useState, useRef } from "react";

const CoverLetterHelper = () => {
  const [jobDetails, setJobDetails] = useState("");
  const [result, setResult] = useState("");
  const [resume, setResume] = useState("");
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    setResume(event.target.files[0]);
    setFilename(selectedFile ? selectedFile.name : "");
  };

  const handleUploadButtonClick = () => {
    console.log("Upload button pressed");
    fileInputRef.current.click(); 
  };

  useEffect(() => {
    const handleJobDetails = (event) => {
      if (event.data && event.data.type === "job-details-text") {
        const job_details = event.data.text;
        setJobDetails(job_details);
      }
    };
    window.addEventListener("message", handleJobDetails);
    return () => {
      window.removeEventListener("message", handleJobDetails);
    };
  }, []);
  async function handleLetter() {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_details", jobDetails);
    try {
      const response = await fetch("http://localhost:5000/coverLetter", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.text();
        console.log(jobDetails);
        console.log(resume);
        setResult(result);
      } else {
        alert("Error: Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="input-container">
      <label htmlFor="pdf-upload">
        <button onClick={handleUploadButtonClick}>
          Upload
        </button>
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
        {resume ? (
          <div>
            <p>File uploaded successfully!</p>
            <button onClick={handleLetter}>Generate Cover Letter</button>
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
