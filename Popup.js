// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    
    var url = new URL(tab.url);
    var domain = url.hostname;
    

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
});
};
/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */


/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
// function getSavedBackgroundColor(url, callback) {
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
//   // for chrome.runtime.lastError to ensure correctness even when the API call
//   // fails.
//   chrome.storage.sync.get(url, (items) => {
//     callback(chrome.runtime.lastError ? null : items[url]);
//   });
// }

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
// function saveBackgroundColor(url, color) {
//   var items = {};
//   items[url] = color;
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
//   // optional callback since we don't need to perform any action once the
//   // background color is saved.
//   chrome.storage.sync.set(items);
// }

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    
    var dropdown = document.getElementById('ppi-auto-fill-dropdown');

    // Load the saved background color for this page and modify the dropdown
    // value, if needed.
    // getSavedBackgroundColor(url, (savedColor) => {
    //   if (savedColor) {
    //     changeBackgroundColor(savedColor);
    //     dropdown.value = savedColor;
    //   }
    // });

    // Ensure the background color is changed and saved when the dropdown
    // selection changes.
    dropdown.addEventListener('change', () => {
      chrome.tabs.getSelected(null, function(tab) {
        console.log('tab: '+tab);
        chrome.tabs.sendRequest(tab.id, dropdown.value, function(response) {
       
    });
   });

      //saveBackgroundColor(url, dropdown.value);
    });

    var clearentButton = document.getElementById('btnClearentTestCard');
    clearentButton.addEventListener('click', ()=> {      
  
        
        chrome.tabs.getSelected(null, function(tab) {        
        chrome.tabs.sendRequest(tab.id, '', function(response) {
          
        });
      });
  });
});
});
