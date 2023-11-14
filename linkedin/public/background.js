
// console.log("Background script loaded!");


// // chrome.commands.onCommand.addListener((command) => {
// //   console.log(`Command "${command}" triggered`);
// // });

// browser.commands.onCommand.addListener((command) => {
//   if (command === "copy_to_console") {
//     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//       chrome.tabs.executeScript(
//         tabs[0].id, 
//         {code: 'window.getSelection().toString();'},
//         (selection) => {
//           console.log(selection[0]);
//         }
//       );    
//     });    
//   }
// });



chrome.contextMenus.create({
  id: "friday",
  title: "Ask Friday",
  contexts : ['selection', 'link']

})

chrome.contextMenus.onClicked.addListener((info,tab)=>{
   console.log(info.selectionText.trim())
})