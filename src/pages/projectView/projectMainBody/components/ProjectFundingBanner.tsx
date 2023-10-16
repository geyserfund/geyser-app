import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { QRCode } from 'react-qrcode-logo'

import { LogoIcon } from '../../../../assets'
import LogoDark from '../../../../assets/logo-dark.svg'
import { BoltSvgIcon, CurvedArrow } from '../../../../components/icons'
import { lightModeColors } from '../../../../styles'

const useStyles = createUseStyles({
  gradientContainer: {
    background: `linear-gradient(270deg, ${lightModeColors.primary[400]} -0.16%, ${lightModeColors.primary[400]} 35.26%, ${lightModeColors.primary[100]} 99.84%)`,
  },
})

interface Props {
  banner?: string
  title: string
  lnurlPayUrl: string
}

const QR_SIZE = 350

export const ProjectFundingBanner = forwardRef<HTMLDivElement, Props>(
  ({ title, banner, lnurlPayUrl }, ref) => {
    const classes = useStyles()
    const [isLogoReady, setLogoReady] = useState(false)

    return (
      <>
        <img
          style={{ display: 'none' }}
          src={LogoDark}
          loading="eager"
          alt={'project-lnurl-pay-sharable-image'}
          onLoad={() => setLogoReady(true)}
        />
        <Box w="100%">
          <Image objectFit="contain" src={banner} />
        </Box>
        <Box
          ref={isLogoReady ? ref : undefined}
          w="1500px"
          h="500px"
          position="absolute"
          opacity="0"
          fontSize="36px"
        >
          <Box display="flex" w="100%" h="100%">
            <Box
              className={classes.gradientContainer}
              p={5}
              pr="3.5em"
              w="100%"
              h="100%"
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <Box display="flex">
                <Box
                  display="flex"
                  alignItems="end"
                  justifyContent="end"
                  flexDirection="column"
                  color={lightModeColors.neutral[900]}
                  pr="1.8em"
                  pb="0.3em"
                >
                  <Box width="6em" height="6em">
                    <CurvedArrow width="100%" height="100%" />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <HStack align="center" justify="center">
                      <Box>
                        <BoltSvgIcon display="block" height="1em" />
                      </Box>
                      <Box>
                        <Text
                          ml="0.2em"
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="1em"
                          whiteSpace="nowrap"
                        >
                          {title}
                        </Text>
                      </Box>
                    </HStack>
                    <Text textAlign="center" fontSize="0.68em">
                      Contribute to my project on Geyser using LNURL!
                    </Text>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  borderColor={'neutral.1000'}
                  borderRadius="12px"
                  overflow={'hidden'}
                  _hover={{ cursor: 'pointer' }}
                  position="relative"
                  filter="drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.1))"
                >
                  <img
                    alt="Geyser logo"
                    style={{
                      position: 'absolute',
                      top: (QR_SIZE - 30) / 2,
                      left: (QR_SIZE - 30) / 2,
                      width: 60,
                      height: 60,
                      padding: '5px',
                      background: 'white',
                      borderRadius: '12px',
                    }}
                    src={LogoIcon}
                  />
                  <QRCode
                    value={lnurlPayUrl}
                    id={lightModeColors.neutral[1000]}
                    size={QR_SIZE}
                    bgColor={lightModeColors.neutral[0]}
                    fgColor={lightModeColors.neutral[1000]}
                    qrStyle="squares"
                    ecLevel="L"
                    removeQrCodeBehindLogo
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
  },
)
