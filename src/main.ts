"use strict";

import browser from "webextension-polyfill";

const fileIconUrl = browser.runtime.getURL("file.svg");
const folderIconUrl = browser.runtime.getURL("folder.svg");

document.documentElement.style.setProperty("--file-icon-url", `url("${fileIconUrl}")`);
document.documentElement.style.setProperty("--folder-icon-url", `url("${folderIconUrl}")`);
// Get header element and trim the text content
const header = document.getElementById("header")!;
try {
  header.textContent = header.textContent.trim();
  // Set the header text content to ~ if it is empty
  if (header.textContent === "") {
    header.textContent = "~";
  }

  // Set the width of the header to 100% in order to fill the space
  header.style.width = "100%";

  // Set the length of the header to 65 characters
  if (header.textContent.length > 65) {
    header.textContent = header.textContent.slice(0, 65) + "...";
  }

  // Shorten the text content of links that are too long
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    if (link.textContent.length > 60) {
      link.textContent = link.textContent.slice(0, 60) + "...";
    }
  });
} catch (e) {
  // "permissions": [ "<all_urls>" ]
}
