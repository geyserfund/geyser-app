/** Filter posts to get unique project posts, filling with additional posts if needed */
export const filterPostsByUniqueProjects = <T extends { id: string; project?: { id: string } | null }>(
  posts: T[],
  count: number,
): T[] => {
  const uniqueProjectPosts: T[] = []
  const seenProjectIds = new Set<string>()

  /** First pass: collect posts with unique project IDs (assumes already sorted by desired order) */
  for (const post of posts) {
    if (post.project && !seenProjectIds.has(post.project.id)) {
      uniqueProjectPosts.push(post)
      seenProjectIds.add(post.project.id)
    }
  }

  /** If we have enough unique projects, return the requested count */
  if (uniqueProjectPosts.length >= count) {
    return uniqueProjectPosts.slice(0, count)
  }

  /** Otherwise, fill remaining slots with latest posts from the full list */
  const remainingCount = count - uniqueProjectPosts.length
  const additionalPosts = posts
    .filter((post) => !uniqueProjectPosts.some((uniquePost) => uniquePost.id === post.id))
    .slice(0, remainingCount)

  return [...uniqueProjectPosts, ...additionalPosts]
}
