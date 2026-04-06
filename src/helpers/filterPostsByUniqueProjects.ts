/** Filter posts to the first entries belonging to distinct projects. */
export const filterPostsByUniqueProjects = <T extends { id: string; project?: { id: string } | null }>(
  posts: T[],
  count: number,
): T[] => {
  const uniqueProjectPosts: T[] = []
  const seenProjectIds = new Set<string>()

  for (const post of posts) {
    if (post.project && !seenProjectIds.has(post.project.id)) {
      uniqueProjectPosts.push(post)
      seenProjectIds.add(post.project.id)
    }

    if (uniqueProjectPosts.length === count) {
      break
    }
  }

  return uniqueProjectPosts
}
