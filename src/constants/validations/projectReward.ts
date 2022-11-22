export const ProjectRewardValidations = {
  name: {
    maxLength: 100,
  },
  description: {
    maxLength: 250,
  },
  cost: {
    maxUSDCentsAmount: 10_000,
  },
};
