"use strict";
import browser from "webextension-polyfill";

const fileIconUrl = browser.runtime.getURL("file.svg"), folderIconUrl = browser.runtime.getURL("folder.svg");

const isDirectoryListing: () => boolean = () => document.contentType === "text/html" && document.getElementById("header") !== null;
const enhanceDirectoryView: () => void = () => {
  const root = document.documentElement;
  if (!isDirectoryListing() && root.id === "EnhancedDirectoryView") return root.removeAttribute("id");
  root.id = "EnhancedDirectoryView";
  root.style.setProperty("--file-icon-url", `url("${fileIconUrl}")`);
  root.style.setProperty("--folder-icon-url", `url("${folderIconUrl}")`);
  const header = document.getElementById("header");
  if (!header) return;
  if (header.textContent.trim() === "") header.textContent = "~";
}

enhanceDirectoryView();
window.addEventListener("popstate", enhanceDirectoryView);
