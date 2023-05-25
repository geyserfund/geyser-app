export const testImage = (url: string, timesT?: number) =>
  new Promise<void>((resolve, reject) => {
    const timeout = timesT || 0
    const img = new Image()
    img.src = url

    img.onerror = function () {
      if (timeout < 10) {
        setTimeout(() => testImage(url, timeout + 1).then(resolve), 1000)
        return
      }

      reject()
    }

    img.onabort = function () {
      if (timeout < 10) {
        setTimeout(() => testImage(url, timeout + 1).then(resolve), 1000)
        return
      }

      reject()
    }

    img.onload = function () {
      resolve()
    }
  })
