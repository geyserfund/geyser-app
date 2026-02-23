#!/usr/bin/env node

import { execSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const projectRoot = process.cwd();
const tsBuildInfoFile = '/tmp/geyser-app-prepush-affected.tsbuildinfo';
const fullCheckCommand = `yarn exec tsc --noEmit --incremental --tsBuildInfoFile ${tsBuildInfoFile}`;

const run = (command) => execSync(command, { cwd: projectRoot, encoding: 'utf8' }).trim();

const runFullTypecheck = (reason) => {
  console.log(`[typecheck-affected] Running full typecheck (${reason})`);
  execSync(fullCheckCommand, { cwd: projectRoot, stdio: 'inherit' });
};

const getUpstreamRef = () => {
  try {
    return run('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}');
  } catch {
    return null;
  }
};

const getChangedFiles = () => {
  const upstreamRef = getUpstreamRef();
  if (!upstreamRef) {
    runFullTypecheck('no upstream branch configured');
    return null;
  }

  const mergeBase = run(`git merge-base HEAD ${upstreamRef}`);
  const changed = run(`git diff --name-only --diff-filter=ACMR ${mergeBase}...HEAD`);
  if (!changed) {
    return [];
  }

  return changed
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);
};

const requiresFullTypecheck = (changedFiles) => {
  const isTsConfig = (file) => /(^|\/)tsconfig.*\.json$/u.test(file);
  const isTypeDeclaration = (file) => file.endsWith('.d.ts');
  const isGlobalTypeOrTooling =
    changedFiles.includes('package.json') ||
    changedFiles.includes('yarn.lock') ||
    changedFiles.includes('.yarnrc.yml') ||
    changedFiles.some(isTsConfig) ||
    changedFiles.some(isTypeDeclaration);

  return isGlobalTypeOrTooling;
};

const isTsSource = (file) => /\.(ts|tsx|mts|cts)$/u.test(file);

const checkAffectedFiles = (changedFiles) => {
  const configPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, 'tsconfig.json');
  if (!configPath) {
    throw new Error('Could not find tsconfig.json');
  }

  const readResult = ts.readConfigFile(configPath, ts.sys.readFile);
  if (readResult.error) {
    const message = ts.formatDiagnosticsWithColorAndContext([readResult.error], {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => projectRoot,
      getNewLine: () => '\n',
    });
    throw new Error(message);
  }

  const parsed = ts.parseJsonConfigFileContent(readResult.config, ts.sys, projectRoot);
  const includedFiles = new Set(parsed.fileNames.map((file) => path.resolve(file)));
  const affectedFiles = changedFiles
    .filter(isTsSource)
    .map((file) => path.resolve(projectRoot, file))
    .filter((file) => includedFiles.has(file));
  const declarationRoots = parsed.fileNames.filter((file) => file.endsWith('.d.ts')).map((file) => path.resolve(file));
  const rootNames = Array.from(new Set([...affectedFiles, ...declarationRoots]));

  if (affectedFiles.length === 0) {
    console.log('[typecheck-affected] No changed TypeScript files in tsconfig scope. Skipping.');
    return;
  }

  const options = {
    ...parsed.options,
    noEmit: true,
    incremental: true,
    tsBuildInfoFile,
  };

  const program = ts.createIncrementalProgram({
    rootNames,
    options,
    projectReferences: parsed.projectReferences,
  });

  const diagnostics = ts.getPreEmitDiagnostics(program.getProgram());
  if (diagnostics.length > 0) {
    const output = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => projectRoot,
      getNewLine: () => '\n',
    });
    console.error(output);
    process.exitCode = 1;
    return;
  }

  console.log(`[typecheck-affected] Typecheck passed for ${affectedFiles.length} file(s).`);
};

try {
  const changedFiles = getChangedFiles();
  if (changedFiles === null) {
    process.exit(0);
  }

  if (changedFiles.length === 0) {
    console.log('[typecheck-affected] No changed files.');
    process.exit(0);
  }

  if (requiresFullTypecheck(changedFiles)) {
    runFullTypecheck('project config or global type files changed');
    process.exit(0);
  }

  checkAffectedFiles(changedFiles);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[typecheck-affected] Failed: ${message}`);
  process.exit(1);
}
