const WAIT_BEFORE_RETRY_MILLIS = 1500
const MAX_RETRY_ATTEMPTS = 20

export const testImage = (url: string, timesT?: number) =>
  new Promise<void>((resolve, reject) => {
    const timeout = timesT || 0
    const img = new Image()
    img.src = url

    img.onerror = function () {
      if (timeout < MAX_RETRY_ATTEMPTS) {
        setTimeout(() => testImage(url, timeout + 1).then(resolve), WAIT_BEFORE_RETRY_MILLIS)
        return
      }

      reject()
    }

    img.onabort = function () {
      if (timeout < MAX_RETRY_ATTEMPTS) {
        setTimeout(() => testImage(url, timeout + 1).then(resolve), WAIT_BEFORE_RETRY_MILLIS)
        return
      }

      reject()
    }

    img.onload = function () {
      resolve()
    }
  })
