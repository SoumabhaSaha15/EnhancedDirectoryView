"use strict";
import browser from "webextension-polyfill";

const fileIconUrl = browser.runtime.getURL("file.svg");
const folderIconUrl = browser.runtime.getURL("folder.svg");

function isDirectoryListing(): boolean {
  return (
    document.contentType === "text/html" &&
    document.getElementById("header") !== null
  );
}

function enhanceDirectoryView(): void {
  const root = document.documentElement;

  if (!isDirectoryListing()) {
    if (root.id === "EnhancedDirectoryView") root.removeAttribute("id");
    return;
  }

  root.id = "EnhancedDirectoryView";
  root.style.setProperty("--file-icon-url", `url("${fileIconUrl}")`);
  root.style.setProperty("--folder-icon-url", `url("${folderIconUrl}")`);
  const header = document.getElementById("header");
  if (!header) return;

  if (header.textContent.trim() === "") header.textContent = "~";
}

enhanceDirectoryView();
window.addEventListener("popstate", enhanceDirectoryView);
