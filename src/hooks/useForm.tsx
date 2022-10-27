import { useContext, useEffect, useState } from 'react';
import { ShippingDestination, shippingTypes } from '../constants';
import { AuthContext } from '../context';

import { IRewardCount } from '../interfaces';
import { ProjectReward, RewardCurrency } from '../types/generated/graphql';

export interface IFundForm {
  donationAmount: number;
  rewardsCost: number;
  comment: string;
  anonymous: boolean;
  shippingDestination: ShippingDestination;
  shippingCost: number;
  email: string;
  media: string;
  funderUsername: string;
  funderAvatarURL: string;
  rewardsByIDAndCount?: { [key: string]: number } | undefined;
  rewardCurrency: RewardCurrency;
}

type UseFundStateProps = {
  rewards?: ProjectReward[];
};

export type UpdateReward = (_: IRewardCount) => void;

export interface IFundFormState {
  state: IFundForm;
  // eslint-disable-next-line no-unused-vars
  setTarget: (event: any) => void;
  // eslint-disable-next-line no-unused-vars
  setState: (name: string, value: any) => void;
  updateReward: UpdateReward;
  resetForm: () => void;
}

export const useFundState = ({ rewards }: UseFundStateProps) => {
  const { user } = useContext(AuthContext);

  const initialState: IFundForm = {
    donationAmount: 0,
    rewardsCost: 0,
    comment: '',
    shippingDestination: shippingTypes.national,
    shippingCost: 0,
    anonymous: !(user && user.id), // The default user has id 0
    funderAvatarURL: user.imageUrl || '',
    funderUsername: user.username,
    email: '',
    media: '',
    rewardsByIDAndCount: undefined,
    rewardCurrency: RewardCurrency.Usd,
  };

  const [state, _setState] = useState<IFundForm>(initialState);

  const setTarget = (event: any) => {
    const { name, value } = event.target;
    const newState = { ...state, [name]: value };
    _setState(newState);
  };

  useEffect(() => {
    if (!user || !user.id) {
      setState('anonymous', true);
    } else {
      setState('anonymous', false);
    }
  }, [user]);

  const setState = (name: string, value: any) => {
    const newState = { ...state, [name]: value };
    _setState(newState);
  };

  const updateReward = ({ id, count }: IRewardCount) => {
    const newRewardsCountInfo = { ...state.rewardsByIDAndCount };

    if (count === 0) {
      delete newRewardsCountInfo[id as unknown as keyof ProjectReward];
    } else {
      newRewardsCountInfo[id as unknown as keyof ProjectReward] = count;
    }

    let rewardsCost = 0;

    if (rewards) {
      Object.keys(newRewardsCountInfo).forEach((rewardID: string) => {
        const id = parseInt(rewardID, 10);

        const reward = rewards.find(
          (reward: ProjectReward) =>
            reward.id === id || `${reward.id}` === rewardID,
        );

        if (reward && reward.id) {
          /*
           * IMPORTANT: the reward.currency is undefined at the moment of writing this. This means the cost defaults to
           * being divided by 100, which assumes the cost is expressed in fiat (specifically USD).
           * This was done as a quick fix
           * and must be refactored.
           */
          const cost = reward.cost / 100;

          rewardsCost +=
            cost * newRewardsCountInfo[rewardID as keyof ProjectReward];
        }
      });
    }

    const newState = {
      ...state,
      rewardsByIDAndCount: newRewardsCountInfo,
      rewardsCost,
      totalAmount: rewardsCost + state.donationAmount,
    };

    _setState(newState);
  };

  const resetForm = () => {
    _setState(initialState);
  };

  return { state, setTarget, setState, updateReward, resetForm };
};
