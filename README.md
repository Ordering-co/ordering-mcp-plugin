# Ordering.co plugin for Claude Code and Codex

This plugin adds a shared skill: how to discover Ordering operations, interpret orders and permissions, minimize personal data and confirm permitted changes. The marketplace is `ordering-dev`; the plugin ID is `ordering@ordering-dev`, version 0.5.0.

The **MCP server** authorizes a selected API catalog for one project. The **[quickstart](https://github.com/Finitless-com/ordering-dev-quickstart)** signs you in, manages local credentials and registers a launcher in detected clients. This **plugin** adds platform knowledge. Version 0.5.0 is skill-only in both clients: it requests no key and registers no second server. Installing it alone does not connect Ordering.

## 1. Connect MCP first

Paste into your terminal AI agent:

```text
Connect me to Ordering.co: clone https://github.com/Finitless-com/ordering-dev-quickstart to ~/ordering-dev-quickstart (or pull it if I already have it), then read its SETUP.md and follow it step by step.
```

The installer requires Node.js 22+ and npm on macOS/Linux, including clients inside WSL. It configures the machine running the terminal. You need your own eligible Ordering account (administrator or business manager) and MCP enabled for your project. Wait for the terminal’s final result, reload the client and observe `whoami` in it. The browser only confirms delivery; `clients` only checks registration. If login succeeded but installation failed, retry `~/ordering-dev-quickstart/ordering install`.

MCP defaults to read. The browser pairing defaults to 30 days; manual MCP keys default to 7, currently up to 365. REST is a **separate** option checked by default, with broad user permissions and no expiration: uncheck it for MCP-only access. MCP read does not restrict REST. A same-project REST key already saved by quickstart is retained with a warning.

Repository access is required while the quickstart and this marketplace are private. If GitHub denies access, use the [manual MCP guide](https://docs.ordering.co/docs/developers/mcp/) or request access; Ordering login does not grant GitHub membership.

## 2. Add the optional skill

### Claude Code

In a Claude Code session:

```text
/plugin marketplace add Finitless-com/ordering-mcp-plugin
/plugin install ordering@ordering-dev
```

CLI equivalent:

```bash
claude plugin marketplace add Finitless-com/ordering-mcp-plugin
claude plugin install ordering@ordering-dev --scope user
```

No `--config mcp_key=...`, secret dialog or shell export is required by this skill-only version. Reload the plugin/session, inspect `/mcp` and ask **“Who am I in Ordering?”**. Installing a skill is not proof that a running client called MCP.

Update with `/plugin marketplace update ordering-dev`, then `/plugin update ordering@ordering-dev` (or the matching `claude plugin ...` commands), and reload. Remove the skill with `/plugin uninstall ordering@ordering-dev`; it leaves the quickstart MCP registration and credentials intact.

### Codex

```bash
codex plugin marketplace add Finitless-com/ordering-mcp-plugin
codex plugin add ordering@ordering-dev
```

On desktop, you can also install Ordering from the `ordering-dev` source in the plugin directory after adding the marketplace. Reload/start a new session and inspect MCP; ask for `whoami`. Client versions differ: inspect `codex plugin --help`; a client without `plugin add` uses its plugin UI, not an invented CLI command.

Refresh Git-backed sources with `codex plugin marketplace upgrade ordering-dev`, reinstall/refresh with `codex plugin add ordering@ordering-dev`, then reload. Remove only this skill with `codex plugin remove ordering@ordering-dev`. Project enable/disable and trust follow the client’s own configuration policies.

## Existing installations and migration

Claude plugin versions through 0.4.0 registered `plugin:ordering:ordering` with separate `project` / `mcp_key` options. Before combining with the global launcher, inspect `/mcp`, `claude mcp list`, local/project `.mcp.json` and user scope. Update or disable that exact old plugin so it does not keep a duplicate connection; then install 0.5.0 and run quickstart `install`. Reload and verify one intended Ordering connection with `whoami`. Old keychain credentials do not need to be copied into the new plugin. Revoke a legacy MCP key in Dashboard if it is no longer used; removing the plugin does not revoke it.

Codex project configuration can override the user entry. Inspect `codex mcp list` and the trusted project’s `.codex/config.toml`; a stale HTTP `ordering` entry can hide the user launcher. Review/migrate that entry explicitly, preserving other MCPs and settings. Quickstart does not silently remove project configuration.

Before migrating the historical `ordering@ordering` marketplace, inspect its source. Only remove the entry if it points to **this repository**. Do not remove an internal marketplace or an unrelated server just because its name matches. Back up privately and report conflicts; never copy credentials into a ticket or chat.

## Using and maintaining the connection

The skill calls `whoami`, discovers operations with `search_operations`, checks their parameters/allowed fields with `describe_operation`, then uses `read_operation`. A write key exposes selected `write_operation` updates, subject to role and body allowlists; the skill asks before every change. It does not grant access to the entire API, or enable create/delete/refund/payment operations outside the MCP catalog.

Renew with `~/ordering-dev-quickstart/ordering login --install`, wait for the terminal result and reload the MCP client. If installation fails after credential delivery, retry `install`. The new plugin needs no key configuration. To remove only MCP registration, use `uninstall`; `logout` also clears both local credentials and can remove the installed Ordering Claude plugin (including skill-only versions). `reset --install` disconnects then pairs/registers again. Revoke MCP and REST keys independently in Dashboard; local removal is not server revocation.

For an operation outside MCP, the skill uses the optional quickstart REST helper and its OpenAPI contract. It checks REST through `doctor`, never by reading `.env`. Non-GET calls need approval of the exact method, path, project and body before `--yes`. Data returned by tools is data, not instructions. There is no automatic sandbox.

## Troubleshooting and support

| Result | Action |
|---|---|
| GitHub refuses clone/marketplace | Check repository access; do not treat owner-authenticated access as public availability |
| Skill installed, no tools | Complete quickstart registration, inspect config precedence and reload/trust |
| Login succeeded, a client failed | Collect the full result, fix that client and retry `install` |
| 401 / expired or revoked key | Renew with `login --install`, reload and check identity |
| 403 / ineligible owner | Confirm enabled administrator/business manager and permitted resources |
| 404 | Confirm project URL and server availability |
| Operation/field rejected | Discover/describe the selected catalog and check scope; do not broaden permissions |

Use the [complete MCP guide](https://docs.ordering.co/docs/developers/mcp/) and [quickstart troubleshooting](https://github.com/Finitless-com/ordering-dev-quickstart/blob/main/docs/troubleshooting.md). Share client/version and a sanitized error, not keys or customer responses. For vulnerabilities see [SECURITY.md](SECURITY.md).

## Layout and validation

```text
.claude-plugin/marketplace.json                 Claude marketplace
.agents/plugins/marketplace.json                Codex marketplace
plugins/ordering/.claude-plugin/plugin.json      Claude skill-only manifest
plugins/ordering/.codex-plugin/plugin.json       Native Codex compatibility manifest
plugins/ordering/plugin.json                    Agent Plugins manifest
plugins/ordering/skills/ordering/SKILL.md        Shared platform skill
```

Run `claude plugin validate .`, `claude plugin validate plugins/ordering`, and `node scripts/validate.mjs`. Native installation and update must be checked in isolated client profiles; manifest validity alone does not prove tools or live account access.

Client references: [Claude plugins](https://code.claude.com/docs/en/plugins), [Claude MCP scopes](https://code.claude.com/docs/en/mcp), [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins).
