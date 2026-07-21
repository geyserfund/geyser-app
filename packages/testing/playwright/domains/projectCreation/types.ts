/** Project creation domain types */

/** Options for completing project details form */
export type ProjectDetailsOptions = {
  title: string
  name: string
  shortDescription: string
  description: string
  /** Category label as shown in the UI (e.g. "Tool") */
  category: string
  /** Sub-category label as shown in the UI (e.g. "App") */
  subCategory: string
  location: string // Country name as shown in UI
  thumbnailImage: string // Path to image file
  headerImages: string[] // Paths to header image files
  links?: string[]
  tags?: number[]
}

/** Options for setting AON funding goal */
export type AONGoalOptions = {
  amountSats: number
  duration: number // Days (1-60)
  launchDate?: Date // Optional scheduled launch date
}

/** Options for creating a complete AON project */
export type CreateAONProjectOptions = {
  projectDetails: ProjectDetailsOptions
  goal: AONGoalOptions
}

/** Result of project creation */
export type CreatedProject = {
  projectId: string
  projectName: string
}
