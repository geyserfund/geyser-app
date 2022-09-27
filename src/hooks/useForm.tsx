import { useContext, useEffect, useState } from 'react';
import { ShippingDestination, shippingTypes } from '../constants';
import { AuthContext } from '../context';

import { IProjectReward, IRewardCount } from '../interfaces';

export interface IFundForm {
  donationAmount: number;
  rewardsCost: number;
  totalAmount: number;
  comment: string;
  anonymous: boolean;
  shippingDestination: ShippingDestination;
  shippingCost: number;
  email: string;
  media: string;
  rewards: { [key: string]: number };
}

export interface IuseFundStateProps {
  rewards?: IProjectReward[];
}

export type TupdateReward = ({ id, count }: IRewardCount) => void;

export interface IFundFormState {
  state: IFundForm;
  setTarget: (event: any) => void;
  setState: (name: string, value: any) => void;
  updateReward: TupdateReward;
  resetForm: () => void;
}

export const useFundState = ({ rewards }: IuseFundStateProps) => {
  const { user } = useContext(AuthContext);

  const intialState = {
    donationAmount: 0,
    rewardsCost: 0,
    totalAmount: 0,
    comment: '',
    shippingDestination: shippingTypes.national,
    shippingCost: 0,
    anonymous: !(user && user.id), // The default user has id 0
    email: '',
    media: '',
    rewards: {},
  };

  const [state, _setState] = useState<IFundForm>(intialState);
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
    const newRewards = { ...state.rewards };

    if (count !== 0) {
      newRewards[id] = count;
    } else if (count === 0) {
      delete newRewards[id];
    }

    let rewardsCost = 0;
    if (rewards) {
      Object.keys(newRewards).map((key: string) => {
        const id = parseInt(key, 10);
        const reward = rewards.find(
          (reward: IProjectReward) =>
            reward.id === id || `${reward.id}` === key,
        );
        console.log('checking this', reward, rewards, key);
        if (reward && reward.id) {
          rewardsCost += reward.cost * newRewards[key];
        }
      });
    }

    console.log('chekcing update reward', rewardsCost);

    const newState = { ...state, rewards: newRewards, rewardsCost };
    _setState(newState);
  };

  const resetForm = () => {
    _setState(intialState);
  };

  return { state, setTarget, setState, updateReward, resetForm };
};
