import { IUser } from '../../../interfaces';

export interface IAvatarBoardItem {
    id: number
    user: IUser
    comment?: string
    amount?: number
}

export interface IAvatarBoardProps {
    items: IAvatarBoardItem[]
    itemName: string
    callToActionLink?: string
}

export interface IClickableAvatar {
    comment?: string;
    amount?: number;
    url: string;
    imageUrl: string;
}
