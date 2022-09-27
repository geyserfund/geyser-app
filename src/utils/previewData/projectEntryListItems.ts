import { IProjectListEntryItem } from '../../interfaces';
import StarPNG from '../../assets/star.png';
import BradPNG from '../../assets/brad.png';

export const entry1: IProjectListEntryItem = {
  id: 1,
  title: 'Bitcoin in the Savannah',
  description: `After travelling for 3 years it's time to orange pill the Savannah, I love the Savannah guys. This is a post all about it.`,
  image: StarPNG,
  type: 'article',
  creator: {
    id: 1,
    username: 'Brad',
    imageUrl: BradPNG,
    email: 'foo@example.com',
    externalAccounts: [],
  },
  fundersCount: 1,
  amountFunded: 1,
};

export const entry2: IProjectListEntryItem = {
  id: 2,
  title: 'Bitcoin Racing going live again!',
  description: `Bitcoin is under-represented in motorsports and is missing out on exposure to millions of TV viewers/fans. We are changing this.`,
  image: 'https://picsum.photos/200/300',
  type: 'article',
  creator: {
    id: 1,
    username: 'Bitcoin Racing',
    imageUrl: 'https://picsum.photos/200/300',
    email: 'foo@example.com',
    externalAccounts: [],
  },
  fundersCount: 221,
  amountFunded: 210000000,
};

export const projectEntryListItems: IProjectListEntryItem[] = [entry1, entry2];
