export const ProjectRewardValidations = {
  name: {
    maxLength: 100,
  },
  description: {
    maxLength: 1200,
  },
  cost: {
    maxUSDCentsAmount: 1_000_000,
  },
}
