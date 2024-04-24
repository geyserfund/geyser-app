export const generateTwitterShareUrl = (tweetTemplate: string, projectLink: string): string => {
  const tweet = tweetTemplate.replace('{{projectLink}}', projectLink)
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
}

export const shareOnTwitter = (tweetTemplates: string[], projectName: string, t: any) => {
  const projectLink = `${window.location.origin}/project/${projectName}`

  const randomKey = tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)] || ''
  const tweetTemplate = t(randomKey)
  return generateTwitterShareUrl(tweetTemplate, projectLink)
}
