import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'
import { SitemapStream, streamToPromise } from 'sitemap'

dotenv.config()

const SITE_ORIGIN = 'https://geyser.fund'
const FALLBACK_API_ENDPOINT = 'https://api.geyser.fund'
const API_ENDPOINT = process.env.SITEMAP_API_ENDPOINT || process.env.VITE_APP_API_ENDPOINT || FALLBACK_API_ENDPOINT
const GRAPHQL_ENDPOINT = API_ENDPOINT.endsWith('/graphql')
  ? API_ENDPOINT
  : `${API_ENDPOINT.replace(/\/$/, '')}/graphql`
const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDirectory = join(__dirname, 'public')
const sitemapsDirectory = join(publicDirectory, 'sitemaps')

/**
 * @typedef {Object} SitemapPageRecord
 * @property {string} url
 * @property {string | undefined} [lastmod]
 * @property {boolean} indexable
 */

const staticSitemapRecords = [
  { url: '/', indexable: true },
  { url: '/campaigns', indexable: true },
  { url: '/fundraisers', indexable: true },
  { url: '/impact-funds', indexable: true },
  { url: '/grants', indexable: true },
  { url: '/launchpad', indexable: true },
  { url: '/about', indexable: true },
  { url: '/terms-and-conditions', indexable: true },
  { url: '/privacy-policy', indexable: true },
]

const impactFundsSitemapQuery = `
  query SitemapImpactFunds {
    impactFunds(status: LIVE) {
      name
    }
  }
`

const dedupeSitemapRecords = (records) => {
  const dedupedRecordsMap = new Map()

  for (const record of records) {
    if (!record.indexable) {
      continue
    }

    const existingRecord = dedupedRecordsMap.get(record.url)
    if (!existingRecord) {
      dedupedRecordsMap.set(record.url, record)
      continue
    }

    if (!existingRecord.lastmod && record.lastmod) {
      dedupedRecordsMap.set(record.url, record)
      continue
    }

    if (existingRecord.lastmod && record.lastmod && new Date(record.lastmod) > new Date(existingRecord.lastmod)) {
      dedupedRecordsMap.set(record.url, record)
    }
  }

  return [...dedupedRecordsMap.values()]
}

const graphqlFetch = async (query, variables = {}) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`)
  }

  const responseBody = await response.json()
  if (responseBody.errors?.length > 0) {
    throw new Error(JSON.stringify(responseBody.errors))
  }

  return responseBody.data
}

const getImpactFundRecords = async () => {
  const data = await graphqlFetch(impactFundsSitemapQuery)
  const impactFunds = data?.impactFunds || []

  return impactFunds
    .filter((fund) => Boolean(fund?.name))
    .map((fund) => ({
      url: `/impact-funds/${encodeURIComponent(fund.name)}`,
      indexable: true,
    }))
}

const buildUrlSetXml = async (records) => {
  const sitemapStream = new SitemapStream({ hostname: SITE_ORIGIN })

  for (const record of dedupeSitemapRecords(records)) {
    sitemapStream.write({
      url: record.url,
      lastmod: record.lastmod,
      changefreq: 'daily',
    })
  }

  sitemapStream.end()
  const xmlBuffer = await streamToPromise(sitemapStream)
  return xmlBuffer.toString()
}

const buildSitemapIndexXml = (entries) => {
  const body = entries
    .map((entry) => {
      return [
        '<sitemap>',
        `<loc>${entry.loc}</loc>`,
        `<lastmod>${entry.lastmod}</lastmod>`,
        '</sitemap>',
      ].join('')
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`
}

const writeSitemap = async (filename, records) => {
  const xml = await buildUrlSetXml(records)
  await writeFile(join(sitemapsDirectory, filename), xml)

  return {
    loc: `${SITE_ORIGIN}/sitemaps/${filename}`,
    lastmod: new Date().toISOString(),
  }
}

const run = async () => {
  await mkdir(sitemapsDirectory, { recursive: true })

  let impactFundRecords = []

  try {
    impactFundRecords = await getImpactFundRecords()
  } catch (error) {
    console.warn('Unable to fetch impact fund records for sitemap generation', { error: String(error) })
  }

  const entries = []
  entries.push(await writeSitemap('static-pages.xml', staticSitemapRecords))
  await rm(join(sitemapsDirectory, 'projects.xml'), { force: true })

  if (impactFundRecords.length > 0) {
    entries.push(await writeSitemap('impact-funds.xml', impactFundRecords))
  }

  const sitemapIndexXml = buildSitemapIndexXml(entries)
  await writeFile(join(publicDirectory, 'sitemap.xml'), sitemapIndexXml)

  console.info('Sitemap generation completed', {
    apiEndpoint: API_ENDPOINT,
    graphqlEndpoint: GRAPHQL_ENDPOINT,
    sectionCount: entries.length,
    impactFundCount: impactFundRecords.length,
  })
}

run().catch((error) => {
  console.error('Sitemap generation failed', error)
  process.exitCode = 1
})
