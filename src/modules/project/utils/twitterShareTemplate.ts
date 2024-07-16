export const generateTwitterShareUrl = (tweetTemplate: string, projectLink: string): string => {
  const tweet = tweetTemplate.replace('{{projectLink}}', projectLink)
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
}

const tweetTemplates = [
  'Check out my project in geyser: {{projectLink}}',
  "We're on a mission to change the game and we need your help. Dive into our project on @geyserfund and let's make a difference. Are you in? {{projectLink}}",
  "Dream with us! We're launching something incredible on @geyserfund and you're invited to be part of the journey. Join us! {{projectLink}}",
  "Big news! We've just launched our latest project on @geyserfund and we need YOUR help to make it a reality. Ready to make a difference? {{projectLink}}",
  "Join us in bringing our dream project to life on @geyserfund. Let's change things together! {{projectLink}}",
  "Breaking news: We're shaking things up with our new project on @geyserfund! Check it out: {{projectLink}} #BreakingNews",
  "We're transforming our dreams into reality with this project on @geyserfund. Your support matters: {{projectLink}}",
  'Making a difference, one step at a time. Join our mission on @geyserfund and help us leave a lasting impact. Your support makes all the difference: {{projectLink}} #MakeADifference',
]

export const shareOnTwitter = (projectName: string, t: any) => {
  const projectLink = `${window.location.origin}/project/${projectName}`

  const randomKey = tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)] || ''
  const tweetTemplate = t(randomKey)
  return generateTwitterShareUrl(tweetTemplate, projectLink)
}
