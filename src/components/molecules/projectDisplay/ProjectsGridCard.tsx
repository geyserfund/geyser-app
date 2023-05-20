import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { getPath, SatoshiUrl } from '../../../constants'
import { fonts } from '../../../styles'
import { Project } from '../../../types/generated/graphql'
import { getShortAmountLabel, useMobileMode } from '../../../utils'
import { ICard, ProjectStatusLabel } from '../../ui'
import { ProjectImageListItemPlaceholder } from './ProjectImageListItemPlaceholder'

type Props = ICard & {
  project: Project
  onClick?: () => void
}

export const ProjectsGridCard = ({ project, ...rest }: Props) => {
  const isMobile = useMobileMode()
  return (
    <Link
      to={getPath('project', project.name)}
      style={{ textDecoration: 'none' }}
    >
      <Box
        width={'full'}
        maxWidth={'284px'}
        minWidth={isMobile ? '284px' : '250px'}
        bg="neutral.0"
        borderWidth="3px"
        cursor="pointer"
        borderColor={'neutral.300'}
        rounded={'md'}
        overflow={'hidden'}
        spacing={2.5}
        _hover={{
          borderColor: 'neutral.500',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
        }}
        transition="border-color 0.3s ease-in-out"
        {...rest}
      >
        <Box
          height={'202px'}
          width="full"
          bg={'gray.100'}
          pos={'relative'}
          display="flex"
          justifyContent={'center'}
          alignItems="center"
        >
          <Image
            src={project.thumbnailImage || ''}
            width="full"
            height="full"
            fallback={<ProjectImageListItemPlaceholder padding="3em" />}
            objectFit="cover"
          />
        </Box>
        <Box paddingX="18px" paddingY={'14px'}>
          <VStack spacing={4} alignItems="flex-start">
            <Heading
              color="neutral.700"
              fontSize={'2xl'}
              fontFamily={'body'}
              noOfLines={1}
              wordBreak="break-all"
            >
              {project.title}
            </Heading>

            <HStack
              width="100%"
              mt={6}
              direction={'row'}
              spacing={0}
              align={'flex-end'}
              justifyContent={'space-between'}
            >
              <VStack alignItems={'center'}>
                <Text fontSize="16px" fontWeight={600} fontFamily={fonts.mono}>
                  {project.fundersCount}
                </Text>

                <Text
                  fontSize="12px"
                  color={'neutral.600'}
                  fontFamily={fonts.mono}
                  textTransform="uppercase"
                >
                  funders
                </Text>
              </VStack>

              <VStack alignItems={'center'}>
                <HStack spacing="3px">
                  <Image src={SatoshiUrl} height="20px" />
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    fontFamily={fonts.mono}
                  >
                    {getShortAmountLabel(project.balance)}
                  </Text>
                </HStack>
                <Text
                  fontSize="12px"
                  color={'neutral.600'}
                  fontFamily={fonts.mono}
                  textTransform="uppercase"
                >
                  Funded
                </Text>
              </VStack>

              <ProjectStatusLabel
                project={project}
                fontFamily={fonts.mono}
                iconSize="20px"
                direction="column"
              />
            </HStack>

            <Text
              noOfLines={5}
              textAlign="left"
              size="sm"
              wordBreak="break-word"
            >
              {project.shortDescription}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Link>
  )
}
