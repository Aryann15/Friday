console.log('Popup script loaded');

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === "selected-text") {
    const selectedText = request.text;
    console.log(selectedText)
    window.postMessage({ type: "selected-text", text: selectedText }, "*");
  }
});