(() => {
  function decodeBase64Utf8(base64) {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand("copy"); } finally { textarea.remove(); }
  }

  document.addEventListener("click", async (event) => {
    const button = event.target && event.target.closest ? event.target.closest(".mcc-copy-button") : null;
    if (!button) return;
    const encoded = button.getAttribute("data-mcc-code");
    if (!encoded) return;
    const originalText = button.textContent;
    try {
      await copyText(decodeBase64Utf8(encoded));
      button.textContent = "Copied";
      button.classList.add("mcc-copied");
    } catch (error) {
      button.textContent = "Failed";
      button.classList.add("mcc-copy-failed");
      console.error("Markdown Code Copy failed to copy code block:", error);
    }
    window.setTimeout(() => {
      button.textContent = originalText || "Copy";
      button.classList.remove("mcc-copied", "mcc-copy-failed");
    }, 1200);
  });
})();
