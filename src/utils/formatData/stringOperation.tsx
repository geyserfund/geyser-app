export const getTwitterID = (url: string) => {
  const splited = url.split('/')
  return splited[splited.length - 1]
}
