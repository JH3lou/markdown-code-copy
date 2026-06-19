# Changelog

All notable changes to **Markdown Code Copy** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] — 2026-06-19

First stable release. No functional changes to the extension since 0.1.0 — this
release promotes the extension to a stable 1.0.0 under Semantic Versioning.

### Added

- Project documentation: `CHANGELOG.md` and `CONTRIBUTING.md`.

### Changed

- Promoted to a stable `1.0.0` release; the extension's behavior is unchanged
  from 0.1.0.

## [0.1.0] — 2026-06-19

_Initial release._

### Added

- **One-click copy** on every fenced code block in the built-in Markdown
  Preview.
- **Language label** taken from the fence info string (`ts`, `bash`, …).
- **Clear feedback** — an affirmative "Copied" state, with a graceful "Failed"
  fallback.
- **Theme-aware styling** using VS Code theme variables, so the UI fits light,
  dark, and high-contrast themes.
- **Byte-for-byte fidelity** — the block's source is stored as UTF-8 base64 and
  decoded on copy, sidestepping quote/HTML escaping and special-character
  corruption.
- **Reliable delegated copy** — a single event-delegated listener handles many
  blocks and survives preview re-renders.

[Unreleased]: https://github.com/JH3lou/markdown-code-copy/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/JH3lou/markdown-code-copy/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/JH3lou/markdown-code-copy/releases/tag/v0.1.0
