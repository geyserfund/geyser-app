export interface IUser {
    id: number;
    username: string;
    imageUrl: string;
    twitterHandle: string;
    connectedTwitter: boolean;
}

export interface IProfileUser {
        id: string;
        username: string;
        imageUrl: string;
        externalAccounts: {
          type: string;
          id: string;
          username: string;
        }
        twitterHandle: string;
        connectedTwitter: boolean;
        contributions :IContributions[];
        ownerOf: {
          project: IProfileProject
        }[]
}

export interface IProfileProject {
    id: string;
    title: string;
    name: string;
    description: string;
    balance: number;
    fundingGoal: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    media: string;
    expiresAt: string;
    creationConfirmed: boolean;
    funders: {
      id:string;
    }[]
    owners: {
        id: string;
        user: {
          imageUrl: string;
        }
      }[]
  }

export interface IContributions {
    isAmbassador: string;
    isFunder: string;
    isSponsor: string;
    amountFunded: string;
    timesFunded: string;
    project :{
      id: string;
      title: string;
      name: string;
      description: string;
    }
  }
