import browser from "webextension-polyfill";

const isDirectoryListing: () => boolean = () => {
  if (document.contentType !== "text/html") return false;
  const header = document.getElementById('header');
  return !!header && header.tagName === 'H1' && header.textContent.startsWith('Index of');
}
(() => {
  if (isDirectoryListing()) {
    const fileIconUrl = browser.runtime.getURL("file.svg"),
      folderIconUrl = browser.runtime.getURL("folder.svg"),
      root = document.documentElement,
      link = document.createElement("link");
    root.id = "EnhancedDirectoryView";
    root.style.setProperty("--file-icon-url", `url("${fileIconUrl}")`);
    root.style.setProperty("--folder-icon-url", `url("${folderIconUrl}")`);
    link.rel = "icon";                     // the modern form; "shortcut icon" is obsolete
    link.type = "image/svg+xml";
    link.href = folderIconUrl;
    document.head.appendChild(link);
  }
})();
