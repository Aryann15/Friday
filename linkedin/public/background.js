console.log("Hello from background script");

chrome.contextMenus.create({
  id: "friday@chat",
  title: "Ask Friday@chat",
  contexts: ["selection", "link"],
})

chrome.contextMenus.create({
  id: "friday@job",
  title: "Ask Friday@job",
  contexts: ["selection", "link"],
})

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId === "friday@chat") {
    // Handle Friday@chat click
    const selectedText = info.selectionText;
    chrome.runtime.sendMessage({ 
      type: 'chat-text', 
      text: selectedText,
      source: "friday@chat" 
    });
  }

  if (info.menuItemId === "friday@job") {
    // Handle Friday@job click
    const selectedText = info.selectionText;
    chrome.runtime.sendMessage({ 
      type: 'job-details-text', 
      text: selectedText,
      source: "friday@job" 
    });  
  }
})