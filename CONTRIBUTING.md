# Contributing to Markdown Code Copy

Thanks for your interest in improving Markdown Code Copy! This is a deliberately
tiny extension, and contributions that keep it small, fast, and dependency-free
are very welcome.

## Guiding principles

These are non-negotiable — please read them before opening a PR:

- **No runtime dependencies.** The `dependencies` field in `package.json` stays
  empty. The preview-side JS/CSS is hand-written, never a bundled library.
  `devDependencies` (TypeScript, types, `vsce`) are fine.
- **Performance & reliability first.** Inject the smallest possible script and
  style. Copy is handled by one event-delegated listener — not per-button
  handlers or polling.
- **Byte-for-byte fidelity.** What the user copies must be exactly what was in
  the fence. Don't reintroduce quote/HTML escaping issues that the base64 path
  avoids.
- **Theme-aware styling only.** Style with VS Code theme variables so the UI
  works across light, dark, and high-contrast themes. No hard-coded colors.

## Getting started

```bash
git clone https://github.com/JH3lou/markdown-code-copy.git
cd markdown-code-copy
npm install
npm run compile        # or: npm run watch for incremental builds
```

Then press **F5** in VS Code to launch an Extension Development Host with the
extension loaded.

## Project structure

```txt
markdown-code-copy/
├─ src/extension.ts   # extendMarkdownIt: wraps each fence, emits the toolbar
├─ media/copy.js      # preview-side: decode base64 + copy to clipboard
├─ media/copy.css     # GitHub-style header bar + button states (theme vars)
├─ demo.md            # sample document
└─ package.json       # contributes markdownItPlugins + previewScripts/Styles
```

## Testing your changes

There is no automated test suite yet, so verify manually:

1. Launch the Extension Development Host (**F5**).
2. Open [`demo.md`](demo.md) and the Markdown Preview
   (**Ctrl/Cmd + Shift + V**).
3. Confirm each fenced block shows a header bar with the correct language label
   and a **Copy** button.
4. Click **Copy** and paste elsewhere — the result must be byte-for-byte
   identical to the fence contents, including blank lines, quotes, and special
   characters.
5. Check the **Copied** confirmation appears and resets.
6. Re-render the preview (edit the doc) and confirm copy still works.
7. Try a light, a dark, and a high-contrast theme.

## Submitting a pull request

1. Branch off `main`.
2. Keep the change focused; one concern per PR.
3. Run `npm run compile` and confirm there are no TypeScript errors.
4. Manually test as described above.
5. Write a clear PR description explaining what changed and why.

## Reporting bugs

Open an issue with:

- Your VS Code version (requires `^1.90.0`).
- A minimal Markdown snippet that reproduces the problem.
- What you expected vs. what happened.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
