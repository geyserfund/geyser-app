export const checkMacaroonPermissions = (macaroon: string): string => {
  // Buffer can be used server-side and atob client side
  // const utf8Encoded = Buffer.from(macaroon, 'base64').toString('utf8');
  try {
    const utf8Encoded = atob(macaroon)

    const chunks = utf8Encoded
      .split('\n')
      .map((line) => line.replace(/[^\x0-\x7F]/g, ' ').split('   ')) // Remove ASCII control characters and split on triple space
      .flat()
      .map((chunk) => chunk.replace(/[^a-z ]/gi, '').trim())
      .filter((chunk) => chunk.includes('read') || chunk.includes('write'))
      .map((chunk) => chunk.split('  '))

    const requiredPermissions: { [key: string]: string[] } = {
      address: ['read', 'write'],
      invoices: ['read', 'write'],
      onchain: ['read'],
    }

    const permissions = chunks.reduce((prev: any, chunk: any) => {
      const newPrev = { ...prev }
      const keyParts = chunk.filter(
        (word: string) => !['read', 'write'].includes(word),
      )
      const key = keyParts.join('')
      newPrev[key] = chunk.slice(keyParts.length)
      return newPrev
    }, {})

    // 1. check that permissions contains all required permissions
    const missingPermissions: string[] = []

    Object.keys(requiredPermissions).forEach((key) => {
      const required = requiredPermissions[key]
      if (!required) {
        return
      }

      if (!permissions[key]) {
        missingPermissions.push(`${key}: ${required.join()}`)
      } else {
        const missingPermission = required
          .filter((permission) => !permission.includes(permission))
          .join()
        if (missingPermission) {
          missingPermissions.push(`${key}: ${missingPermission}`)
        }
      }
    })

    if (missingPermissions.length > 0) {
      return `macaroon is missing the following permissions: ${JSON.stringify(
        missingPermissions,
      )}`
    }

    const extraPermissions: string[] = []

    Object.keys(permissions).forEach((key) => {
      if (!requiredPermissions[key]) {
        extraPermissions.push(`${key}: ${permissions[key].join()}`)
      } else {
        const required = requiredPermissions[key]
        if (required) {
          const extraPermission = permissions[key]
            .filter((permission: string) => !required.includes(permission))
            .join()
          if (extraPermission) {
            missingPermissions.push(`${key}: ${extraPermission}`)
          }
        }
      }
    })
    if (extraPermissions.length > 0) {
      return `macaroon has the following unnecessary permissions: ${JSON.stringify(
        extraPermissions,
      )}. Make sure you did not paste an admin macaroon`
    }

    return ''
  } catch (error) {
    return 'invalid macaroon, please add a valid invoice macaroon'
  }
}
