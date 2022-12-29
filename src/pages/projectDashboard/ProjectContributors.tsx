import {
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Funder, Project } from '../../types/generated/graphql';
import {
  LinkableAvatar,
  SatoshiAmount,
  AnonymousAvatar,
} from '../../components/ui';
import { DateTime } from 'luxon';
import { computeFunderBadges } from '../../helpers';
import { renderFunderBadges } from '../../components/molecules/projectActivity/renderFunderBadges';

type TableData = {
  header: string;
  key: string | number;
  render?: (val: any) => React.ReactNode;
  value?: (val: any) => string | number;
};

export const ProjectContributors = ({ project }: { project: Project }) => {
  const funders = project.funders || [];

  const tableData: TableData[] = useMemo(
    () => [
      {
        header: 'Name',
        key: 'name',
        render: (val: Funder) => {
          const funderBadges = computeFunderBadges({
            creationDateStringOfFundedContent: project.createdAt || '',
            funder: val,
          });
          const isFunderAnonymous = Boolean(val?.user) === false;
          if (isFunderAnonymous) {
            return (
              <AnonymousAvatar
                seed={val.id}
                imageSize={'20px'}
                textColor="brand.neutral900"
              />
            );
          }

          return (
            <LinkableAvatar
              avatarUsername={val.user?.username || ''}
              userProfileID={val.user?.id}
              imageSrc={val.user?.imageUrl || ''}
              badgeNames={funderBadges.map((badge) => badge.badge)}
              badgeElements={renderFunderBadges(funderBadges)}
            />
          );
        },
      },
      {
        header: 'Contribution',
        key: 'amount',
        render: (val: Funder) => (
          <SatoshiAmount scale={0.7} fontSize="14px">
            {val.amountFunded}
          </SatoshiAmount>
        ),
      },
      {
        header: 'Reward',
        key: 'reward',
        value: (val: Funder) => {
          let value = '';
          val.rewards.map((reward) => {
            value = value
              ? `${value}, ${reward?.projectReward.name}(${reward?.quantity}x)`
              : `${reward?.projectReward.name}(${reward?.quantity}x)`;
          });
          return value;
        },
      },
      {
        header: 'Date',
        key: 'date',
        value: (val: Funder) => {
          const dateString = val.confirmedAt
            ? DateTime.fromMillis(parseInt(val.confirmedAt, 10)).toFormat(
                'yyyy / mm / dd',
              )
            : '-';
          return dateString;
        },
      },
      {
        header: 'Email',
        key: 'email',
        value: (val: Funder) => {
          return val.user?.email || '';
        },
      },
    ],
    [project],
  );

  return (
    <>
      <GridItem colSpan={18} display="flex" justifyContent={'center'}>
        <VStack maxWidth="1200px" width="100%" alignItems="center">
          <HStack width="100%">
            <Text
              fontSize={'16px'}
              fontWeight={600}
            >{`${funders.length} Contributers`}</Text>
          </HStack>
          <TableContainer width="100%">
            <Table size="sm">
              <Thead backgroundColor={'brand.primary100'}>
                <Tr>
                  {tableData.map((row) => {
                    return (
                      <Th key={row.key} paddingY="10px">
                        <Text textTransform="capitalize">{row.header}</Text>
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {funders.map((funder) => {
                  return (
                    <Tr key={funder?.id}>
                      {tableData.map((row) => {
                        let value: any = '';
                        if (row.value) {
                          value = row.value(funder);
                        } else if (row.render) {
                          value = row.render(funder);
                        } else {
                          value = funder && funder[row.key as keyof Funder];
                        }

                        return (
                          <Td key={row.key} fontSize="14px">
                            {value}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </GridItem>
    </>
  );
};
