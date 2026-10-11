import browser from "webextension-polyfill";

const isDirectoryListing: () => boolean = () => {
  if (document.contentType !== "text/html") return false;
  const header = document.getElementById('header');
  return header instanceof HTMLHeadingElement && header.textContent.startsWith('Index of');
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
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = folderIconUrl;
    document.head.appendChild(link);
  }
})();
