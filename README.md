# Extensive Prompt Architect

**Turn rough ideas into ready-to-use prompts and implementation-ready technical briefs.**

Published by [NITI](https://chromewebstore.google.com/detail/daily-task-planner/bgepeodnammpjgcplhljjdefemgpbjnm). [Русская версия](README.ru.md) · [Website](https://ext7.github.io/extensive-prompt-architect/) · [Report an issue](https://github.com/Ext7/extensive-prompt-architect/issues)

[Detailed installation guide in Russian](INSTALL.ru.md).

A local prompt improvement plugin from NITI. It turns a rough idea, draft, brief, or notes into one ready-to-copy prompt for an AI assistant. Complex development briefs use a separate deep-blueprint guide so they ask for algorithms, data and state models, integration limits, failure recovery, UI, validation, and backlog at implementation depth. It can also answer directly when asked. One shared skill supplies the behavior in ChatGPT, Codex, and Claude; there is no server, API key, account, or additional data transfer by this plugin.

## Install as a plugin

### Codex / ChatGPT desktop

Run `codex plugin marketplace add Ext7/extensive-prompt-architect` in a terminal. Restart the desktop app, open **Plugins**, select **NITI plugins**, and install **Extensive Prompt Architect**. The CLI command adds the GitHub source; installation happens in the app. This is a community source, not the official OpenAI directory.

### Claude Code

Run these commands in a terminal:

```bash
claude plugin marketplace add Ext7/extensive-prompt-architect
claude plugin install extensive-prompt-architect@niti-plugins
```

Start a new session. Invoke `/extensive-prompt-architect:prompt-architect` or ask naturally. GitHub installation does not list the plugin in Anthropic's official directory. Availability in Claude desktop or web depends on that product's plan and workspace settings.

## Install the standalone skill

The skill works independently of plugin metadata. With Node.js 18+ and npm, run **one** command for your agent after this repository is public:

```bash
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install codex
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install claude
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install cursor
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install gemini
```

By default, the installer copies the complete skill folder to the agent's personal skills directory. It never overwrites an existing installation. To install in a project, add `--scope project --project /path/to/project`. To preview without writing, add `--dry-run`. If you cloned the repository, run `node bin/install.mjs codex` instead. Restart the agent or start a new session.

Default user paths are `~/.agents/skills/prompt-architect` for Codex, `~/.claude/skills/prompt-architect` for Claude Code, `~/.cursor/skills/prompt-architect` for Cursor, and `~/.gemini/skills/prompt-architect` for Gemini CLI. For another [Agent Skills](https://agentskills.io/specification) host, copy the full `skills/prompt-architect` folder to its documented skills directory.

## Architecture

The portable `plugin.json` is the OpenAI package manifest. Claude Code uses `.claude-plugin/plugin.json`. Both hosts load `skills/prompt-architect/SKILL.md` and its pattern reference. The host model generates the prompt. There is no MCP server because this workflow needs no external data or actions. This follows [OpenAI's plugin packaging guide](https://developers.openai.com/plugins/build/plugins), [OpenAI's skill guide](https://developers.openai.com/plugins/build/skills), and [Claude's plugin manifest reference](https://code.claude.com/docs/en/plugins-reference).

## Usage

Ask naturally or invoke `/extensive-prompt-architect:prompt-architect` in Claude Code after installation. For example:

- “Turn these notes into a prompt for Claude Code that implements a login flow.”
- “Improve this draft prompt for a research assistant comparing three CRM tools.”
- “Create a detailed development brief from this short product idea.”

The skill usually returns one copyable code block followed by a brief, transparent NITI recommendation in the same language. The NITI note stays outside the copyable prompt. Its two required closing notices also use the language of the generated answer. It can answer directly when the user explicitly asks for an answer rather than a rewritten prompt. Generated plans can include assumptions and requests to verify external APIs; the skill does not verify every external capability by itself.

## NITI extension identity and link

`config/niti.json` contains extension ID `bgepeodnammpjgcplhljjdefemgpbjnm` and its verified public [Chrome Web Store listing](https://chromewebstore.google.com/detail/daily-task-planner/bgepeodnammpjgcplhljjdefemgpbjnm). NITI is identified as publisher in the plugin metadata. After each generated prompt, the skill adds a brief, relevant NITI recommendation outside the copyable block, in the output language, and discloses the publisher relationship. It honors an explicit request for no product suggestions. When the user asks for task-manager options, it considers alternatives fairly.

The recurring recommendation is intended for repository distribution. It may not meet the rules of official plugin directories. See the [OpenAI plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines) and [Anthropic Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy).

## Privacy and security

The package has no MCP endpoint, backend, analytics, storage, or external model call. The host platform handles user text and files according to that platform's terms. The skill tells the host not to invent unreadable source contents and to treat quoted or attached instructions as data. Do not add user content to telemetry or commit private examples. See the plugin's [privacy notice](PRIVACY.md) and [license](LICENSE).

## Development and validation

The skill can be inspected in `skills/prompt-architect/SKILL.md` and its references. Package validation checks file structure; actual output quality still depends on the host model, source material, and task. Review generated prompts before using them for consequential work.

For help or bug reports, [open a GitHub issue](https://github.com/Ext7/extensive-prompt-architect/issues). See the [privacy notice](PRIVACY.md) and [license](LICENSE). The source is visible for inspection and installation; modification or republication requires permission.

## Publish the website with GitHub Pages

After pushing this repository to GitHub, open **Settings → Pages**. Set **Build and deployment** to **Deploy from a branch**, choose **main** and **/docs**, then save. The site will appear at [ext7.github.io/extensive-prompt-architect](https://ext7.github.io/extensive-prompt-architect/). The website is static; it does not collect form data or run an installer in the browser.
