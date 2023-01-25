import {
  Box,
  Grid,
  GridItem,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { BiLeftArrowAlt } from 'react-icons/bi';

import TitleWithProgressBar from '../../../../components/molecules/TitleWithProgressBar';
import { ButtonComponent } from '../../../../components/ui';
import { useMobileMode } from '../../../../utils';

interface ProjectCreateLayoutProps {
  children: React.ReactNode;
  sideView?: React.ReactNode;
  handleBack: () => void;
  title: string;
  subtitle: string;
  percentage: number;
}

export const ProjectCreateLayout = ({
  children,
  sideView,
  handleBack,
  title,
  subtitle,
  percentage,
}: ProjectCreateLayoutProps) => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMobileMode();

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      height="100%"
      justifyContent="space-between"
    >
      <Grid
        width="100%"
        templateColumns={
          isLargerThan1280
            ? 'repeat(12, 1fr)'
            : isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(5, 1fr)'
        }
        padding={
          isMobile
            ? '10px'
            : isLargerThan1280
            ? '40px 40px 20px 40px'
            : '40px 20px 20px 20px'
        }
      >
        <GridItem
          colSpan={isLargerThan1280 ? 3 : 1}
          display="flex"
          justifyContent="flex-start"
        >
          <ButtonComponent
            onClick={handleBack}
            leftIcon={<BiLeftArrowAlt fontSize="25px" />}
          >
            Back
          </ButtonComponent>
        </GridItem>
        <GridItem
          colSpan={isLargerThan1280 ? 6 : 2}
          display="flex"
          justifyContent={'center'}
        >
          <VStack
            spacing="30px"
            width="100%"
            maxWidth="600px"
            minWidth="350px"
            marginBottom="40px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <VStack width="100%" spacing="40px" alignItems="flex-start">
              <Text color="brand.gray500" fontSize="30px" fontWeight={700}>
                {' '}
                Create A New Project
              </Text>
              <TitleWithProgressBar
                paddingBottom="20px"
                title={title}
                subTitle={subtitle}
                percentage={percentage}
              />
            </VStack>
            {children}
          </VStack>
        </GridItem>
        <GridItem
          colSpan={isLargerThan1280 ? 3 : 2}
          display="flex"
          justifyContent={'center'}
          paddingTop={isMobile ? '0px' : '20%'}
        >
          {sideView}
        </GridItem>
      </Grid>
    </Box>
  );
};
