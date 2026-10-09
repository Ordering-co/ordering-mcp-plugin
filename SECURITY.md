# Security policy

Never post credentials, pairing links/codes, authorization headers or customer responses in issues or pull requests.

Report vulnerabilities privately through [GitHub private vulnerability reporting](https://github.com/Finitless-com/ordering-mcp-plugin/security/advisories/new). If private reporting is unavailable, contact [Ordering.co support](https://www.ordering.co/contact/) and request a private security intake before sharing details. Ordinary questions may use a sanitized issue with client/version and reproduction steps.

Revoke a leaked MCP key in Dashboard → MCP, and a leaked REST key separately in Dashboard → API Keys. Removing local configuration or a commit does not revoke access. Follow the quickstart runbook to create replacement credentials privately, reload and check identity.

The current released version is supported. The skill preserves client approvals for writes and treats project content as data, not instructions. Its guardrails are not a security boundary for someone holding an API key.
