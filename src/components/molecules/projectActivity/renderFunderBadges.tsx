import React from 'react';
import { ReactElement } from 'react';
import { IBadge } from '../../../interfaces';
import { Badge } from '@chakra-ui/react';

export const renderFunderBadges = (badges: IBadge[]): ReactElement[] => {
  return badges.map((badge, index) => <Badge key={index}>{badge.badge}</Badge>);
};
