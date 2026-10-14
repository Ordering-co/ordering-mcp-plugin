# Contributing

Keep changes focused on the skill and its client packaging. Do not add literal credentials or a second MCP registration to the plugin. Use fictitious examples, minimize personal data and preserve explicit approval before writes.

Validate with `node scripts/validate.mjs`, `claude plugin validate .` and `claude plugin validate plugins/ordering`. Test native install/update in a temporary profile so other plugins and MCPs are preserved. Report OS/client versions and distinguish registration from a runtime or authenticated tool call. CI uses fixtures and no account credentials; forks must not require production secrets.

This project is distributed under the [MIT License](LICENSE). Report security problems privately as described in SECURITY.md.
