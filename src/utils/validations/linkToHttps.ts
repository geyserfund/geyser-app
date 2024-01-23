export const linkToHttps = (link: string) => {
  if (link.startsWith('https://')) return link
  if (link.startsWith('http://')) return link.replace('http', 'https')
  return `https://${link}`
}
