#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillName = 'prompt-architect';
const source = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'skills', skillName);
const locations = {
  codex: { user: ['.agents', 'skills'], project: ['.agents', 'skills'] },
  claude: { user: ['.claude', 'skills'], project: ['.claude', 'skills'] },
  cursor: { user: ['.cursor', 'skills'], project: ['.cursor', 'skills'] },
  gemini: { user: ['.gemini', 'skills'], project: ['.gemini', 'skills'] },
};

function usage() {
  return `Usage: epa-install <codex|claude|cursor|gemini> [--scope user|project] [--project PATH] [--dry-run]

Copies the complete ${skillName} skill into one agent's skills directory.
Defaults to user scope. Project scope defaults to the current directory.
Existing installations are never overwritten.
`;
}

function fail(message) {
  console.error(`Error: ${message}\n\n${usage()}`);
  process.exitCode = 1;
}

function parse(args) {
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(usage());
    return null;
  }
  const agent = args[0];
  if (!Object.hasOwn(locations, agent)) {
    fail(`Unknown agent: ${agent}`);
    return null;
  }
  let scope = 'user';
  let project;
  let dryRun = false;
  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--scope' || arg === '--project') {
      const value = args[++i];
      if (!value || value.startsWith('--')) {
        fail(`Missing value for ${arg}`);
        return null;
      }
      if (arg === '--scope') scope = value;
      else project = value;
    } else {
      fail(`Unknown option: ${arg}`);
      return null;
    }
  }
  if (!['user', 'project'].includes(scope)) {
    fail(`Unknown scope: ${scope}`);
    return null;
  }
  if (project && scope !== 'project') {
    fail('--project requires --scope project');
    return null;
  }
  return { agent, scope, project, dryRun };
}

const options = parse(process.argv.slice(2));
if (options) {
  const base = options.scope === 'user' ? homedir() : resolve(options.project ?? process.cwd());
  const destination = join(base, ...locations[options.agent][options.scope], skillName);
  if (!existsSync(join(source, 'SKILL.md'))) {
    fail(`Skill source is missing: ${source}`);
  } else if (options.scope === 'project' && (!existsSync(base) || !statSync(base).isDirectory())) {
    fail(`Project directory does not exist: ${base}`);
  } else if (existsSync(destination)) {
    fail(`Already installed at ${destination}. Remove it yourself before reinstalling.`);
  } else {
    const items = readdirSync(source);
    console.log(`Source: ${source}`);
    console.log(`Destination: ${destination}`);
    console.log(`Files: ${items.join(', ')}`);
    if (options.dryRun) {
      console.log('Dry run: no files changed.');
    } else {
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(source, destination, { recursive: true, errorOnExist: true, force: false });
      console.log(`Installed for ${options.agent}. Start a new agent session to use it.`);
    }
  }
}
