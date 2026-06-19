import * as vscode from "vscode";

/**
 * Markdown Code Copy
 * Adds a Copy button above every fenced code block in VS Code's Markdown Preview.
 * Runtime dependencies: none.
 */
export function activate(_context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: MarkdownItLike) {
      const defaultFence =
        md.renderer.rules.fence ||
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const renderedFence = defaultFence(tokens, idx, options, env, self);
        const encodedCode = Buffer.from(token.content ?? "", "utf8").toString("base64");
        const lang = (token.info ?? "").trim().split(/\s+/)[0] ?? "";
        const langSpan = lang ? `<span class="mcc-lang">${escapeHtml(lang)}</span>` : "";

        return `<div class="mcc-code-block">
  <div class="mcc-toolbar">
    ${langSpan}<button class="mcc-copy-button" type="button" data-mcc-code="${encodedCode}" aria-label="Copy code">Copy</button>
  </div>
  ${renderedFence}
</div>`;
      };

      return md;
    },
  };
}

export function deactivate() {}

/**
 * Escapes a string for safe insertion into HTML text or attribute context.
 * Hand-rolled (zero runtime dependencies). `&` must be replaced first to avoid
 * double-escaping the entities produced by the later replacements.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type MarkdownItLike = {
  renderer: {
    rules: {
      fence?: MarkdownFenceRenderer;
      [key: string]: unknown;
    };
  };
};

type MarkdownFenceRenderer = (
  tokens: MarkdownToken[],
  idx: number,
  options: unknown,
  env: unknown,
  self: MarkdownRendererSelf
) => string;

type MarkdownToken = { content?: string; info?: string; [key: string]: unknown };

type MarkdownRendererSelf = {
  renderToken(tokens: MarkdownToken[], idx: number, options: unknown): string;
};
