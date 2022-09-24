import { IProjectListEntryItem } from '../../interfaces';
import StarPNG from '../../assets/star.png';

export const entry1: IProjectListEntryItem = {
  id: 1,
  title: '',
  description: '',
  image: StarPNG,
  type: '',
  creator: {
    id: 1,
    username: 'username',
    imageUrl: 'imageUrl',
    email: 'email',
    // externalAccounts: IUserExternalAccount[];
    externalAccounts: [],
  },
  fundersCount: 1,
  amountFunded: 1,
};

export const projectEntryListItems: IProjectListEntryItem[] = [entry1];
