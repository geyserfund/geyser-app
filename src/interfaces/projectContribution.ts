export interface IProjectContribution {
  isAmbassador: string;
  isFunder: string;
  isSponsor: string;
  funder: {
    id: string;
    amountFunded: number;
    timesFunded: number;
    confirmedAt: string;
  };
  project: {
    id: string;
    title: string;
    name: string;
    description: string;
    media: string[];
    createdAt: string;
    image?: string;
  };
}
