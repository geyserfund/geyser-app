#!/usr/bin/env node

const DEFAULT_BASE_URL = 'https://us.sentry.io'
const DEFAULT_ORG = 'geyser'
const DEFAULT_PROJECT = 'geyser-app'
const DEFAULT_ENVIRONMENT = 'production'
const DEFAULT_LIMIT = 100
const BULK_UPDATE_CHUNK_SIZE = 100

// Paste a local token here if you prefer not to export SENTRY_AUTH_TOKEN.
// Keep this empty before committing. Required scope: event:write.
const SENTRY_AUTH_TOKEN = ''

const noiseGroups = [
  {
    key: 'service-worker',
    label: 'Service worker registration/update noise',
    queries: ['ServiceWorker', '"Service Worker"', 'sw.js', '"Background Sync is disabled"', 'newestWorker'],
    patterns: ['serviceworker', 'service worker', 'sw.js', 'background sync is disabled', 'newestworker', 'workbox-window'],
  },
  {
    key: 'tawk',
    label: 'Tawk third-party script noise',
    queries: ['Tawk', 'twk', '$_Tawk', 'BufferLoader', '"Unable to store cookie"', '"websocket error"'],
    patterns: ['tawk', 'twk-', '$_tawk', 'bufferloader', 'unable to store cookie', 'websocket error'],
  },
  {
    key: 'chunk-load',
    label: 'Chunk, dynamic import, and CSS preload noise',
    queries: [
      '"Failed to fetch dynamically imported module"',
      '"error loading dynamically imported module"',
      '"Importing a module script failed"',
      '"Unable to preload CSS"',
      'ChunkLoadError',
    ],
    patterns: [
      'failed to fetch dynamically imported module',
      'error loading dynamically imported module',
      'importing a module script failed',
      'unable to preload css',
      'chunkloaderror',
    ],
  },
  {
    key: 'webview-tolowercase',
    label: 'Android WebView anonymous toLowerCase noise',
    queries: ['toLowerCase browser.name:"Chrome Mobile WebView"', '"reading \'toLowerCase\'"'],
    patterns: ['tolowercase'],
    requireAny: ['chrome mobile webview', 'htmldocument.<anonymous>', '<anonymous>'],
  },
  {
    key: 'project-lookup',
    label: 'Expected project not-found/permission lookups',
    queries: ['"You do not have permission to view this project"', '"Project not found for name:"'],
    patterns: ['you do not have permission to view this project', 'project not found for name:'],
  },
  {
    key: 'network-load',
    label: 'Generic browser network load noise',
    queries: ['"Failed to fetch"', '"Load failed"', '"NetworkError when attempting to fetch resource"'],
    patterns: [
      'typeerror: failed to fetch',
      'apolloerror: failed to fetch',
      'typeerror: load failed',
      'apolloerror: load failed',
      'networkerror when attempting to fetch resource',
    ],
  },
  {
    key: 'local-storage',
    label: 'Browser localStorage access noise',
    queries: ['localStorage', '"Failed to access storage"'],
    patterns: ['localstorage.getitem', 'localstorage.setitem', 'window.localstorage.getitem', 'failed to access storage'],
  },
]

const keepVisiblePatterns = [
  'stripe',
  'sk_live_',
  'acct_',
  'webassembly',
  'lexical',
  'userverificationmodal',
  'sumsub',
  'reviewanswer',
  'removechild',
]

const parseArgs = (argv) => {
  const options = {
    apply: false,
    baseUrl: process.env.SENTRY_BASE_URL || DEFAULT_BASE_URL,
    environment: process.env.SENTRY_ENVIRONMENT || DEFAULT_ENVIRONMENT,
    groupKeys: [],
    limit: Number(process.env.SENTRY_ISSUE_LIMIT || DEFAULT_LIMIT),
    org: process.env.SENTRY_ORG || DEFAULT_ORG,
    project: process.env.SENTRY_PROJECT || DEFAULT_PROJECT,
    token: SENTRY_AUTH_TOKEN || process.env.SENTRY_AUTH_TOKEN || process.env.SENTRY_TOKEN || '',
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--apply') {
      options.apply = true
    } else if (arg === '--base-url') {
      options.baseUrl = argv[index + 1] || options.baseUrl
      index += 1
    } else if (arg === '--environment') {
      options.environment = argv[index + 1] || options.environment
      index += 1
    } else if (arg === '--group') {
      options.groupKeys.push(argv[index + 1])
      index += 1
    } else if (arg === '--limit') {
      options.limit = Number(argv[index + 1] || DEFAULT_LIMIT)
      index += 1
    } else if (arg === '--org') {
      options.org = argv[index + 1] || options.org
      index += 1
    } else if (arg === '--project') {
      options.project = argv[index + 1] || options.project
      index += 1
    } else if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!Number.isFinite(options.limit) || options.limit < 1 || options.limit > 100) {
    throw new Error('--limit must be a number between 1 and 100')
  }

  return options
}

const printHelp = () => {
  console.log(`
Usage:
  SENTRY_AUTH_TOKEN=... yarn sentry:ignore-noise
  SENTRY_AUTH_TOKEN=... yarn sentry:ignore-noise -- --apply

Options:
  --apply                 Mutate Sentry issues. Without this, the script only prints a dry run.
  --base-url <url>        Sentry base URL. Defaults to ${DEFAULT_BASE_URL}.
  --environment <name>    Sentry environment. Defaults to ${DEFAULT_ENVIRONMENT}.
  --group <key>           Run only one group. Can be repeated.
  --limit <1-100>         Page size per Sentry issue search. Defaults to ${DEFAULT_LIMIT}.
  --org <slug>            Organization slug. Defaults to ${DEFAULT_ORG}.
  --project <slug>        Project slug. Defaults to ${DEFAULT_PROJECT}.

Groups:
${noiseGroups.map((group) => `  ${group.key.padEnd(18)} ${group.label}`).join('\n')}
`)
}

const normalizeBaseUrl = (baseUrl) => baseUrl.replace(/\/$/, '')

const getIssueText = (issue) =>
  [
    issue.shortId,
    issue.title,
    issue.culprit,
    issue.permalink,
    issue.type,
    issue.metadata?.type,
    issue.metadata?.value,
    issue.metadata?.filename,
    issue.metadata?.function,
    ...(issue.tags || []).map((tag) => `${tag.key}:${tag.value}`),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

const includesAny = (text, patterns) => patterns.some((pattern) => text.includes(pattern.toLowerCase()))

const matchesNoiseGroup = (issue, group) => {
  const text = getIssueText(issue)

  if (includesAny(text, keepVisiblePatterns)) {
    return false
  }

  if (!includesAny(text, group.patterns)) {
    return false
  }

  if (group.requireAny && !includesAny(text, group.requireAny)) {
    return false
  }

  return true
}

const parseNextCursor = (linkHeader) => {
  if (!linkHeader) {
    return null
  }

  const nextPart = linkHeader
    .split(',')
    .map((part) => part.trim())
    .find((part) => part.includes('rel="next"') && part.includes('results="true"'))

  if (!nextPart) {
    return null
  }

  const cursorMatch = nextPart.match(/[?&]cursor=([^&>]+)/)

  return cursorMatch ? decodeURIComponent(cursorMatch[1]) : null
}

const requestSentry = async ({ body, method = 'GET', options, pathname, query }) => {
  const url = new URL(`${normalizeBaseUrl(options.baseUrl)}${pathname}`)

  Object.entries(query || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item))
    } else if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${options.token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const responseText = await response.text()
    throw new Error(`${method} ${url.pathname} failed with ${response.status}: ${responseText}`)
  }

  const text = await response.text()

  return {
    data: text ? JSON.parse(text) : null,
    nextCursor: parseNextCursor(response.headers.get('link')),
  }
}

const listIssuesForQuery = async ({ group, options, queryText }) => {
  const issues = []
  let cursor = null

  do {
    const query = {
      query: `is:unresolved environment:${options.environment} ${queryText}`,
      limit: options.limit,
      cursor,
    }

    const response = await requestSentry({
      options,
      pathname: `/api/0/projects/${options.org}/${options.project}/issues/`,
      query,
    })

    issues.push(...response.data.filter((issue) => matchesNoiseGroup(issue, group)))
    cursor = response.nextCursor
  } while (cursor)

  return issues
}

const collectIssues = async ({ groups, options }) => {
  const byId = new Map()
  const groupMatches = new Map(groups.map((group) => [group.key, []]))

  for (const group of groups) {
    for (const queryText of group.queries) {
      const issues = await listIssuesForQuery({ group, options, queryText })

      for (const issue of issues) {
        if (!byId.has(issue.id)) {
          byId.set(issue.id, { issue, groups: new Set() })
        }

        byId.get(issue.id).groups.add(group.key)
      }
    }
  }

  for (const { issue, groups: matchedGroups } of byId.values()) {
    for (const groupKey of matchedGroups) {
      groupMatches.get(groupKey).push(issue)
    }
  }

  return { issues: Array.from(byId.values()), groupMatches }
}

const chunk = (items, size) => {
  const chunks = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

const ignoreIssues = async ({ issues, options }) => {
  const issueIds = issues.map(({ issue }) => issue.id)

  for (const issueIdChunk of chunk(issueIds, BULK_UPDATE_CHUNK_SIZE)) {
    await requestSentry({
      method: 'PUT',
      options,
      pathname: `/api/0/projects/${options.org}/${options.project}/issues/`,
      query: {
        id: issueIdChunk,
        status: 'unresolved',
      },
      body: {
        status: 'ignored',
        statusDetails: {},
      },
    })
  }
}

const printSummary = ({ groups, groupMatches, issues, options }) => {
  const mode = options.apply ? 'APPLY' : 'DRY RUN'

  console.log(`\nSentry issue cleanup (${mode})`)
  console.log(`Project: ${options.org}/${options.project}`)
  console.log(`Environment: ${options.environment}`)
  console.log(`Matched unique issues: ${issues.length}\n`)

  for (const group of groups) {
    const matches = groupMatches.get(group.key) || []
    console.log(`${group.key}: ${matches.length} issue(s)`)

    matches.slice(0, 12).forEach((issue) => {
      console.log(`  - ${issue.shortId || issue.id}: ${issue.title}`)
    })

    if (matches.length > 12) {
      console.log(`  ...and ${matches.length - 12} more`)
    }
  }

  console.log('')
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))

  if (!options.token) {
    throw new Error('Missing SENTRY_AUTH_TOKEN. Provide a token with event:write scope.')
  }

  const selectedGroups = options.groupKeys.length
    ? noiseGroups.filter((group) => options.groupKeys.includes(group.key))
    : noiseGroups

  const unknownGroups = options.groupKeys.filter((groupKey) => !noiseGroups.some((group) => group.key === groupKey))

  if (unknownGroups.length) {
    throw new Error(`Unknown group(s): ${unknownGroups.join(', ')}`)
  }

  const { issues, groupMatches } = await collectIssues({ groups: selectedGroups, options })

  printSummary({ groups: selectedGroups, groupMatches, issues, options })

  if (!options.apply) {
    console.log('No Sentry issues were changed. Re-run with --apply to ignore the matched issues.')
    return
  }

  if (!issues.length) {
    console.log('No matching issues to update.')
    return
  }

  await ignoreIssues({ issues, options })
  console.log(`Ignored ${issues.length} Sentry issue(s).`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
