// chrome.commands.onCommand.addListener(function (command) {
//   if (command === "copyText") {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "copyText" });
//     });
//   }
// });
console.log("Background script loaded!");

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
});
