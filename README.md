# Ordering plugin for Claude Code and Codex

Connects Claude Code or Codex to your Ordering project through the Ordering MCP
server. It includes a skill that knows the platform: order statuses, user
levels, how to filter and paginate, and which operation answers each question.

It reads orders, businesses, menus, users, reports and the rest of what your
role can see in the Dashboard. With a key that has the `write` scope, it can
also make a few changes:

- enable, disable or snooze menus, categories, products and options, and
  change their names and prices;
- open or close a business, and change its schedule and contact data;
- change the status of an order;
- update offers.

It asks before each change. It cannot create or delete anything.

## Before you start

You need:

- **Your project code**: the one in your Dashboard and API URLs, for example
  `myrestaurant`.
- **An MCP key** (`ord_mcp_…`): create it in the Ordering Dashboard, MCP page.
  It is shown once. Only administrators and business managers can create one.
  It expires (7 days by default, 1 year at most) and you can revoke it at any
  time.
- **The MCP server turned on for your project.** The Dashboard's MCP page tells
  you whether it is.

The key gives the AI client the same read access you have in the Dashboard.
Treat it like a password.

## Claude Code

```text
/plugin marketplace add Finitless-com/ordering-mcp-plugin
/plugin install ordering@ordering
```

When the plugin is enabled, Claude Code asks for the project code and the MCP
key. The key goes to your system keychain.

From the command line instead:

```bash
claude plugin marketplace add Finitless-com/ordering-mcp-plugin
claude plugin install ordering@ordering --config project=myrestaurant --config mcp_key=ord_mcp_...
```

The CLI does not prompt, which is why the values go in `--config`. That leaves
the key in your shell history, so prefer the `/plugin` flow.

Then ask: **"Who am I in Ordering?"** and **"List the last 5 orders"**.

- **Updates.** Third-party marketplaces do not update by themselves. Run
  `/plugin marketplace update ordering`, or turn on auto-update in
  `/plugin` → Marketplaces → ordering.
- **A new key.** Update the plugin's `mcp_key` in `/plugin`.
- **Another project.** Update its `project`.

## Codex

The skill comes as a Codex plugin. Add the marketplace and install it:

```bash
codex plugin marketplace add Finitless-com/ordering-mcp-plugin
```

Then install `ordering` from `/plugins`.

The MCP server is added once with its own command. Its URL carries your project
code and the key is read from an environment variable, and Codex plugins cannot
ask for either:

```bash
export ORDERING_MCP_KEY=ord_mcp_...          # add it to your shell profile
codex mcp add ordering --url https://api.ordering.co/mcp/myrestaurant --bearer-token-env-var ORDERING_MCP_KEY
```

Then ask: **"Who am I in Ordering?"**

## Troubleshooting

| What you see | What it means |
|---|---|
| 404 from the MCP server | The MCP is not turned on for that project, or the project code is wrong |
| "An MCP token is required" / "Invalid MCP token" | The key is missing, mistyped or revoked |
| "This MCP token expired" | Create a new key in the Dashboard and update it in the plugin |
| "The owner of this MCP token cannot use the MCP server" | Your user is disabled or is not an administrator or business manager |
| A call rejected by the API | Your role does not allow that data: the MCP has exactly your Dashboard permissions |

## Layout

```text
.claude-plugin/marketplace.json          Claude Code marketplace
.agents/plugins/marketplace.json         Codex marketplace
plugins/ordering/
  .claude-plugin/plugin.json             Claude Code plugin: MCP server + userConfig
  plugin.json                            Codex (Agent Plugins) manifest
  skills/ordering/SKILL.md               the skill, shared by both
```

Check it with `claude plugin validate .` and
`claude plugin validate plugins/ordering`.
