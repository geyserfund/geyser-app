import { GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import {
  ProjectEntryCard,
  ProjectSectionBar,
} from '../../components/molecules';
import { ButtonComponent, SatoshiAmount } from '../../components/ui';
import { colors } from '../../constants';
import { fonts } from '../../constants/fonts';
import { IProject } from '../../interfaces';
import { numberWithCommas } from '../../utils';

const useStyles = createUseStyles({
  statBox: {
    padding: '22px',
    backgroundColor: colors.primary100,
    borderRadius: '4px',
  },
  numberText: {
    fontFamily: fonts.mono,
    fontSize: '28px',
    color: colors.neutral900,
  },
  labelText: {
    fontSize: '16px',
    color: colors.neutral600,
  },
});

export const Entries = ({ project }: { project: IProject }) => {
  const classes = useStyles();
  const history = useHistory();

  const liveEntries = project?.entries?.filter((entry) => entry.published);
  const draftEntries = project?.entries?.filter((entry) => !entry.published);

  const handleCreateEntry = () => {
    history.push(`/projects/${project.name}/entry`);
  };

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
            <VStack alignItems="flex-start">
              <Text fontSize="18px" fontWeight={600} color="brand.neutral600">
                Past 7 days
              </Text>
              <HStack spacing="22px">
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>
                    {numberWithCommas(5213)}
                  </Text>
                  <Text className={classes.labelText}>VISITS</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <SatoshiAmount
                    fontSize="28px"
                    color="brand.neutral900"
                    fontFamily={fonts.mono}
                  >
                    1120000
                  </SatoshiAmount>
                  <Text className={classes.labelText}>FUNDED</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>2%</Text>
                  <Text className={classes.labelText}>FUNDERS/VISITS</Text>
                </VStack>
              </HStack>
            </VStack>
            <VStack w="100%" spacing="30px">
              <ProjectSectionBar
                name="Live"
                number={liveEntries && liveEntries.length}
              />
              <VStack w="100%">
                {liveEntries?.map((entry) => {
                  // TODO: getting the entries should be refactored. We should move the data fetching closer to the componenet itself
                  const entryWithProject = { ...entry, project };
                  return (
                    <ProjectEntryCard
                      key={entry.id}
                      entry={entryWithProject}
                      onEdit={() =>
                        history.push(
                          `/projects/${project.name}/entry/${entry.id}`,
                        )
                      }
                    />
                  );
                })}
              </VStack>
              <ButtonComponent isFullWidth onClick={handleCreateEntry}>
                <BiPlus style={{ marginRight: '10px' }} />
                Create a new Entry
              </ButtonComponent>
            </VStack>
            <VStack w="100%">
              <ProjectSectionBar
                name="Drafts"
                number={draftEntries && draftEntries.length}
              />
              <VStack>
                {draftEntries?.map((entry) => {
                  const entryWithProject = { ...entry, project };
                  return (
                    <ProjectEntryCard
                      key={entry.id}
                      entry={entryWithProject}
                      onEdit={() =>
                        history.push(
                          `/projects/${project.name}/entry/${entry.id}`,
                        )
                      }
                    />
                  );
                })}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={5} display="flex" justifyContent="center">
        <VStack
          justifyContent="center"
          alignItems="flex-start"
          maxWidth="370px"
          spacing="10px"
        ></VStack>
      </GridItem>
    </>
  );
};
