// popup.js
console.log('Popup script loaded');


chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === "chat-text") {
    const chat = request.text;
    console.log("chat " + chat)
  }
  if (request.type === "job-details-text") {
    const job_details = request.text;
    console.log("job details " + job_details)}
});