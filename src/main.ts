
"use strict";

import browser from "webextension-polyfill";

const HEADER_MAX_CHARS = 65;
const LINK_MAX_CHARS = 60;

const fileIconUrl = browser.runtime.getURL("file.svg");
const folderIconUrl = browser.runtime.getURL("folder.svg");

function isDirectoryListing(): boolean {
  // contentType alone is also true for any local .html file;
  // #header only exists on Chrome's generated listing page.
  return (
    document.contentType === "text/html" &&
    document.getElementById("header") !== null
  );
}

function truncate(text: string, max: number): string {
  const trimmed = text.trim();
  return trimmed.length <= max ? trimmed : trimmed.slice(0, max) + "…";
}

function enhanceDirectoryView(): void {
  const root = document.documentElement;

  if (!isDirectoryListing()) {
    if (root.id === "EnhancedDirectoryView") root.removeAttribute("id");
    return; // not our page — do nothing, touch nothing
  }

  root.id = "EnhancedDirectoryView";
  root.style.setProperty("--file-icon-url", `url("${fileIconUrl}")`);
  root.style.setProperty("--folder-icon-url", `url("${folderIconUrl}")`);

  const header = document.getElementById("header");
  if (!header) return;

  header.textContent =
    header.textContent.trim() === ""
      ? "~"
      : truncate(header.textContent, HEADER_MAX_CHARS);
  // header.style.width = "100%";

  document.querySelectorAll("a").forEach((link) => {
    if ((link.textContent?.length ?? 0) > LINK_MAX_CHARS) {
      link.textContent = truncate(link.textContent!, LINK_MAX_CHARS);
    }
  });
}

enhanceDirectoryView();
window.addEventListener("popstate", enhanceDirectoryView);
