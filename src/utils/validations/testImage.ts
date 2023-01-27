export const testImage = (url: string, timesT?: number) =>
  new Promise((resolve, reject) => {
    const timeout = timesT || 0
    const img = new Image()
    img.src = url

    img.onerror = function () {
      if (timeout < 10) {
        return setTimeout(async () => {
          const test = await testImage(url, timeout + 1)
          resolve(test)
        }, 1000)
      }

      return resolve(false)
    }

    img.onabort = function () {
      if (timeout < 5) {
        return setTimeout(async () => {
          const test = await testImage(url, timeout + 1)
          resolve(test)
        }, 1000)
      }

      return resolve(false)
    }

    img.onload = function () {
      resolve('success')
    }
  })
