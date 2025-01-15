/* CacheBuster component */
import { PropsWithChildren, useState } from 'react'
import { useEffect } from 'react'

import { __development__ } from '@/shared/constants/index.ts'

import packageJson from '../../package.json'

// Declare global property to avoid TypeScript error
declare global {
  // eslint-disable-next-line no-var
  var appVersion: string
}

global.appVersion = packageJson.version

const semverGreaterThan = (versionA: string, versionB: string) => {
  const versionsA = versionA.split(/\./g)

  const versionsB = versionB.split(/\./g)
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift())

    const b = Number(versionsB.shift())

    if (a === b) continue

    return a > b || isNaN(b)
  }

  return false
}

export const CacheBuster: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true)

  const refreshCacheAndReload = async () => {
    if (window.caches) {
      // Service worker cache should be cleared with caches.delete()
      const keys = await window.caches.keys()
      await Promise.all(keys.map((key) => window.caches.delete(key)))
    }

    window.location.reload()
  }

  useEffect(() => {
    fetch('/meta.json', {
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
        'X-Custom-No-Cache': 'true',
      },
    })
      .then((response) => response.json())
      .then((meta) => {
        console.log('checking meta', meta)

        const latestVersion = meta.version
        const currentVersion = global.appVersion

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion)
        if (shouldForceRefresh) {
          refreshCacheAndReload()
          console.log(`We have a new version - ${latestVersion}. Should force refresh`)
          setLoading(false)
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`)
          setLoading(false)
        }
      })
  }, [])

  if (__development__) {
    return <>{children}</>
  }

  return <>{loading ? <div>Loading...</div> : children}</>
}
