import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const claude = read('plugins/ordering/.claude-plugin/plugin.json');
const codex = read('plugins/ordering/.codex-plugin/plugin.json');
const agent = read('plugins/ordering/plugin.json');
for (const manifest of [claude, codex, agent]) {
  assert.equal(manifest.name, 'ordering');
  assert.equal(manifest.version, claude.version);
  assert.equal(manifest.mcpServers, undefined, 'skill-only plugin must not register a duplicate server');
  assert.equal(manifest.userConfig, undefined, 'skill-only plugin must not request credentials');
}
for (const path of ['.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json']) {
  const marketplace = read(path);
  assert.equal(marketplace.name, 'ordering-dev');
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, 'ordering');
  const source = marketplace.plugins[0].source;
  assert.equal(typeof source === 'string' ? source : source.path, './plugins/ordering');
}
assert.ok(existsSync(new URL('../plugins/ordering/skills/ordering/SKILL.md', import.meta.url)));
assert.equal(codex.skills, './skills/');
console.log('PASS: matching versions, marketplace paths and skill-only manifests without credential inputs or MCP servers');
