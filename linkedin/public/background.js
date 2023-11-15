console.log("Hello from background script");

// background.js

chrome.contextMenus.create({
  id: "friday",
  title: "Ask Friday",
  contexts: ["selection", "link"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText.trim();
})
