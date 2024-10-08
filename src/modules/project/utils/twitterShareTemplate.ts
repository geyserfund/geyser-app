export const generateTwitterShareUrl = (text: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}

export const generateProjectTwitterShareUrl = (tweetTemplate: string, projectLink: string): string => {
  const tweet = tweetTemplate.replace('{{projectLink}}', projectLink)
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
}

const projectTweetTemplates = [
  'Check out my project in geyser: {{projectLink}}',
  "We're on a mission to change the game and we need your help. Dive into our project on @geyserfund and let's make a difference. Are you in? {{projectLink}}",
  "Dream with us! We're launching something incredible on @geyserfund and you're invited to be part of the journey. Join us! {{projectLink}}",
  "Big news! We've just launched our latest project on @geyserfund and we need YOUR help to make it a reality. Ready to make a difference? {{projectLink}}",
  "Join us in bringing our dream project to life on @geyserfund. Let's change things together! {{projectLink}}",
  "Breaking news: We're shaking things up with our new project on @geyserfund! Check it out: {{projectLink}} #BreakingNews",
  "We're transforming our dreams into reality with this project on @geyserfund. Your support matters: {{projectLink}}",
  'Making a difference, one step at a time. Join our mission on @geyserfund and help us leave a lasting impact. Your support makes all the difference: {{projectLink}} #MakeADifference',
]

const projectTweetTemplatesContributor = [
  "Let's make this project happen! {{projectLink}} on @geyserfund",
  'Cool project! {{projectLink}} on @geyserfund ',
  'Help us make this project happen! {{projectLink}} on @geyserfund',
]

export const shareOnTwitter = (projectName: string, t: any) => {
  const projectLink = `${window.location.origin}/project/${projectName}`

  const randomKey = projectTweetTemplates[Math.floor(Math.random() * projectTweetTemplates.length)] || ''
  const tweetTemplate = t(randomKey)
  return generateProjectTwitterShareUrl(tweetTemplate, projectLink)
}

export const shareOnTwitterWithLink = (projectLink: string, t: any, contributor?: boolean) => {
  if (contributor) {
    const randomKey =
      projectTweetTemplatesContributor[Math.floor(Math.random() * projectTweetTemplatesContributor.length)] || ''
    const tweetTemplate = t(randomKey)
    return generateProjectTwitterShareUrl(tweetTemplate, projectLink)
  }

  const randomKey = projectTweetTemplates[Math.floor(Math.random() * projectTweetTemplates.length)] || ''
  const tweetTemplate = t(randomKey)
  return generateProjectTwitterShareUrl(tweetTemplate, projectLink)
}
