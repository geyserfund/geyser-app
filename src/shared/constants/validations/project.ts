export const ProjectValidations = {
  name: {
    minLength: 3,
    maxLength: 280,
  },
  title: {
    maxLength: 60,
  },
  description: {
    minLength: 210,
    maxLength: 8000,
  },
  shortDescription: {
    maxLength: 160,
  },
}
