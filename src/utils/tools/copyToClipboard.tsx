export const fallbackCopyTextToClipboard = (text: string) => {
  if (typeof document === 'undefined') {
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(textArea)
  }
}

export const copyTextToClipboard = (text: string) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (!window.navigator?.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }

  window.navigator.clipboard.writeText(text)
}
