import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import {
  CloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  IconButton,
  Link,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import QRCode from 'react-qr-code';
import { ButtonComponent, Card, SectionTitle } from '../../../components/ui';
import { isMobileMode } from '../../../utils';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { IFundingTx, IFundingAmounts, IProject } from '../../../interfaces';
import { IFundForm } from '../../../hooks';
import { BsLightning } from 'react-icons/bs';
import { GiCrossedChains } from 'react-icons/gi';
import { FaTelegramPlane } from 'react-icons/fa';
import { colors, GeyserTelegramUrl } from '../../../constants';
import { useFundCalc } from '../../../helpers/fundingCalculation';
import { hasOnChain } from '../../../utils';
import { FundingTx, Project } from '../../../types/generated/graphql';
import { ContributionInfoBox } from '../components/ContributionInfoBox';

const useStyles = createUseStyles({
  blockText: {
    fontSize: '14px',
    marginBottom: '3px',
  },
  copyText: {
    width: '100%',
  },
  qr: {
    margin: '5px',
  },
  qrContainer: {
    border: '2px solid',
    borderColor: colors.primary,
    borderRadius: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tabActive: {
    color: `${colors.normalLightGreen} !important`,
  },
});

interface IQrPage {
  handleCloseButton: () => void;
  fundingTx: FundingTx | IFundingTx;
  amounts: IFundingAmounts;
  state: IFundForm;
  project: Project | IProject;
}

export const QRPage = ({
  fundingTx,
  state,
  project,
  handleCloseButton,
}: IQrPage) => {
  const { paymentRequest, address, amount } = fundingTx;
  const { name } = project;

  const { getTotalAmount } = useFundCalc(state);

  const isMobile = isMobileMode();
  const classes = useStyles();

  const [copy, setCopy] = useState(false);
  const [platform, setPlatform] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentRequest || '');
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const handleCopyOnchain = () => {
    navigator.clipboard.writeText(getOnchainAddress());
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  // Const getBip21String = () => {
  // 	const bitcoins = amount / 100000000;
  // 	return `bitcoin:${address}?amount=${bitcoins}&lightning=${paymentRequest}`;
  // }

  const getOnchainAddress = () => {
    const bitcoins = amount / 100000000;
    return `bitcoin:${address}?amount=${bitcoins}`;
  };

  const qrBackgroundColor = copy ? colors.primary : colors.bgWhite;

  return (
    <VStack
      padding={isMobile ? '10px 0px' : '10px 20px'}
      spacing="12px"
      width="100%"
      height="100%"
      overflowY="hidden"
      margin="10px 15px"
      display="flex"
      alignItems="flex-start"
      position="relative"
    >
      <CloseButton
        borderRadius="50%"
        position="absolute"
        right="10px"
        top="0px"
        onClick={handleCloseButton}
      />
      <SectionTitle> Confirm & fund</SectionTitle>

      <ContributionInfoBox
        project={project as Project}
        contributionAmount={getTotalAmount('sats', project.name)}
        rewardsEarned={state.rewards}
        isFunderAnonymous={state.anonymous}
        funderUsername={state.funderUsername}
        funderEmail={state.email}
        funderAvatarURL={state.funderAvatarURL}
        referenceCode={fundingTx.uuid}
      />

      <Card width="100%" borderRadius="5px" overflow="auto">
        <Tabs variant="enclosed" isFitted onChange={setPlatform}>
          <TabList>
            <Tab
              className={platform === 0 ? classes.tabActive : ''}
              value="lightning"
            >
              <BsLightning />
              <Text marginLeft="3px">Lightning</Text>
            </Tab>
            {hasOnChain(name) && (
              <Tab
                className={platform === 1 ? classes.tabActive : ''}
                value="onChain"
              >
                <GiCrossedChains />
                <Text marginLeft="3px">On-chain</Text>
              </Tab>
            )}
          </TabList>
          <TabPanels>
            <TabPanel display="flex" flexDirection="column" alignItems="center">
              <Box
                className={classes.qrContainer}
                backgroundColor={qrBackgroundColor}
              >
                <QRCode
                  size={186}
                  bgColor={qrBackgroundColor}
                  className={classes.qr}
                  value={paymentRequest!}
                  onClick={handleCopy}
                />
              </Box>
              <Text paddingTop="15px">Waiting for payment...</Text>
            </TabPanel>
            {hasOnChain(name) && (
              <TabPanel
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  className={classes.qrContainer}
                  backgroundColor={qrBackgroundColor}
                >
                  <QRCode
                    size={186}
                    bgColor={qrBackgroundColor}
                    className={classes.qr}
                    value={getOnchainAddress()}
                    onClick={handleCopyOnchain}
                  />
                </Box>
                <Text paddingTop="15px">Waiting for payment...</Text>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Card>
      {platform === 0 && (
        <Box className={classes.copyText}>
          <ButtonComponent
            isFullWidth
            primary={copy}
            onClick={handleCopy}
            leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
          >
            {!copy ? 'Copy Invoice' : 'Invoice Copied'}
          </ButtonComponent>
          <Text></Text>
        </Box>
      )}
      {platform === 1 && (
        <Box className={classes.copyText}>
          <ButtonComponent
            isFullWidth
            primary={copy}
            onClick={handleCopyOnchain}
            leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
          >
            {!copy ? 'Copy Address' : 'Address Copied'}
          </ButtonComponent>
          <Text></Text>
        </Box>
      )}

      <HStack px={1}>
        <Text>
          If you’re experiencing any issues with this payment please reach out
          to us on Telegram.
        </Text>
        <Link href={GeyserTelegramUrl} isExternal>
          <IconButton
            background={'none'}
            aria-label="telegram"
            icon={<FaTelegramPlane fontSize="20px" />}
            color={'#6C757D'}
          />
        </Link>
      </HStack>

      <Text fontSize="12px" fontWeight={300}>
        Your pledge will support an ambitious project that may yet to be
        developed. There’s a risk that, despite a creator’s best efforts, your
        reward will not be fulfilled, and we urge you to consider this risk
        prior to pledging. Geyser is not responsible for project claims or
        reward fulfillment.
      </Text>
    </VStack>
  );
};
