import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { QRCode } from 'react-qrcode-logo'

import LogoDark from '../../../../assets/logo-dark.svg'
import { BoltSvgIcon, CurvedArrow } from '../../../../components/icons'
import { colors } from '../../../../styles'

const useStyles = createUseStyles({
  gradientContainer: {
    background: `linear-gradient(270deg, ${colors.primary400} -0.16%, ${colors.primary} 35.26%, ${colors.bgLightGreenGradient} 99.84%)`,
  },
})

interface Props {
  banner?: string
  title: string
  lnurlPayUrl: string
}

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
                  bgColor="#fff"
                  borderRadius="3xl"
                  filter="drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.1))"
                >
                  <QRCode
                    qrStyle="dots"
                    logoImage={LogoDark}
                    eyeRadius={2}
                    logoHeight={60}
                    logoWidth={60}
                    logoOpacity={1}
                    fgColor={colors.neutral900}
                    bgColor="transparent"
                    removeQrCodeBehindLogo={true}
                    size={360}
                    value={lnurlPayUrl}
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
