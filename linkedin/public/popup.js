// popup.js
console.log('Popup script loaded');


chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === "chat-text") {
    const chat = request.text;
    console.log("chat " + chat)
    window.postMessage({ type: "chat-text", text: chat }, "*");
  }
  if (request.type === "job-details-text") {
    const job_details = request.text;
    console.log("job details " + job_details)
    window.postMessage({ type: "job-details-text", text: job_details }, "*");
}
});