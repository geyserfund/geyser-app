export function dataURLToBlob(dataURL: string) {
  const BASE64_MARKER = ';base64,'

  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(',')
    const contentType = parts[0]?.split(':')[1]
    const cmp = parts[1]
    if (!cmp) {
      return
    }

    const raw = decodeURIComponent(cmp)

    return new Blob([raw], { type: contentType })
  }

  const parts = dataURL.split(BASE64_MARKER)
  const contentType = parts[0]?.split(':')[1]
  const cmp = parts[1]
  if (!cmp) {
    return
  }

  const raw = window.atob(cmp)
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
