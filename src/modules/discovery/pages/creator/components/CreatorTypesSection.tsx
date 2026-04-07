import { Box, Grid, HStack, Icon, Link as ChakraLink, useColorModeValue, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import type { CreatorShowcaseCategory, CreatorShowcaseProject } from '../constants.ts'
import { creatorShowcaseCategories } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const INTERVAL_MS = 10_000

const getColorFamily = (colorToken: string) => colorToken.split('.')[0]
const getAlphaToken = (colorToken: string, alphaStep: number) => `${getColorFamily(colorToken)}Alpha.${alphaStep}`

type CategoryTabProps = {
  category: CreatorShowcaseCategory
  isActive: boolean
  onClick: () => void
  progress: number
  borderColor: string
  textColor: string
}

/** Single horizontal tab for a creator category. */
const CategoryTab = ({ category, isActive, onClick, progress, borderColor, textColor }: CategoryTabProps) => {
  return (
    <Box
      as="button"
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={t('Show {{name}}', { name: category.name })}
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={2}
      px={4}
      py={2.5}
      borderRadius="12px"
      bg={isActive ? getAlphaToken(category.color, 2) : 'transparent'}
      borderWidth="1px"
      borderColor={isActive ? getAlphaToken(category.color, 5) : borderColor}
      color={isActive ? category.color : textColor}
      whiteSpace="nowrap"
      cursor="pointer"
      transition="all 0.25s ease"
      position="relative"
      overflow="hidden"
      _hover={{
        bg: isActive ? undefined : getAlphaToken(category.color, 1),
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'primary1.8', outlineOffset: '2px' }}
    >
      {isActive && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          h="2px"
          bg={category.color}
          transition="width 0.08s linear"
          style={{ width: `${progress}%` }}
        />
      )}
      <Icon as={category.icon} boxSize={3.5} flexShrink={0} />
      <Body size="sm" fontWeight={isActive ? 700 : 500} color="inherit" lineHeight={1}>
        {category.name}
      </Body>
    </Box>
  )
}

type ProjectCardProps = {
  project: CreatorShowcaseProject
  categoryColor: string
  panelBorderColor: string
  index: number
}

/** Landscape project showcase card prioritizing subcategory as the primary label. */
const ProjectCard = ({ project, categoryColor, panelBorderColor, index }: ProjectCardProps) => {
  const scrimGradient = useColorModeValue(
    'linear-gradient(180deg, transparent 20%, var(--chakra-colors-overlay-black-8) 65%, var(--chakra-colors-overlay-black-11) 100%)',
    'linear-gradient(180deg, transparent 20%, var(--chakra-colors-overlay-white-8) 65%, var(--chakra-colors-overlay-white-11) 100%)',
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    >
      <ChakraLink href={project.projectUrl} isExternal _hover={{ textDecoration: 'none' }} display="block" role="group">
        <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.2 }}>
          <Box
            position="relative"
            borderRadius="16px"
            overflow="hidden"
            borderWidth="1px"
            borderColor={panelBorderColor}
            transition="border-color 0.3s ease, box-shadow 0.3s ease"
            _groupHover={{
              borderColor: getAlphaToken(categoryColor, 5),
              boxShadow: `0 8px 32px var(--chakra-colors-${getAlphaToken(categoryColor, 3).replace(/\./g, '-')})`,
            }}
          >
            <Box position="relative" w="full" pt="42%">
              <Box
                as="img"
                src={project.imageUrl}
                alt={project.projectName}
                position="absolute"
                inset={0}
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="center"
                loading="lazy"
              />

              <Box position="absolute" inset={0} background={scrimGradient} />

              <VStack
                position="absolute"
                bottom={0}
                left={0}
                align="start"
                spacing={1}
                px={4}
                pb={3}
                pt={10}
                maxW="100%"
              >
                <Body
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  fontWeight={800}
                  color={categoryColor}
                  lineHeight={1.1}
                  letterSpacing="0.01em"
                  noOfLines={1}
                >
                  {project.subcategory}
                </Body>
                <Body fontSize="14px" color="white" lineHeight={1.3} noOfLines={1}>
                  {t('{{projectName}} · by {{creator}}', {
                    projectName: project.projectName,
                    creator: project.creatorName,
                  })}
                </Body>
              </VStack>
            </Box>
          </Box>
        </motion.div>
      </ChakraLink>
    </motion.div>
  )
}

/** Interactive creator category section for the /creator page "Who it's for" experience. */
export const CreatorTypesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(Date.now())
  const userInteractedRef = useRef(false)

  const categoryCount = creatorShowcaseCategories.length

  const sectionBackground = 'neutral1.2'
  const sectionBorderColor = useColorModeValue('neutral1.6', 'neutral1.5')
  const panelBorderColor = useColorModeValue('neutral1.6', 'neutral1.5')
  const panelTextColor = useColorModeValue('neutral1.12', 'neutral1.11')
  const headingAccentColor = useColorModeValue('primary1.9', 'primary1.8')
  const tabBorderColor = useColorModeValue('neutral1.5', 'neutral1.4')

  const handleTabClick = useCallback((index: number) => {
    userInteractedRef.current = true
    setActiveIndex(index)
    setProgress(0)
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (userInteractedRef.current) return

    startTimeRef.current = Date.now()
    setProgress(0)

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categoryCount)
    }, INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, categoryCount])

  useEffect(() => {
    if (userInteractedRef.current) return

    startTimeRef.current = Date.now()

    const progressId = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100))
    }, 40)

    return () => window.clearInterval(progressId)
  }, [activeIndex])

  const activeCategory = creatorShowcaseCategories[activeIndex] ?? creatorShowcaseCategories[0]

  if (!activeCategory) {
    return null
  }

  return (
    <Box
      as="section"
      w="full"
      py={{ base: 16, lg: 24 }}
      bg={sectionBackground}
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor={sectionBorderColor}
    >
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 4, lg: 8 }}>
          <VStack align="center" spacing={3} textAlign="center" maxW="760px" mx="auto">
            <Body
              size="sm"
              color={headingAccentColor}
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              {t("Who it's for")}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('Every kind of creator is welcome here')}
            </H2>
          </VStack>

          <VStack align="stretch" spacing={{ base: 5, lg: 6 }}>
            <HStack
              role="tablist"
              spacing={2}
              justify="center"
              flexWrap={{ base: 'nowrap', lg: 'wrap' }}
              overflowX={{ base: 'auto', lg: 'visible' }}
              pb={1}
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {creatorShowcaseCategories.map((category, index) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeIndex === index}
                  onClick={() => handleTabClick(index)}
                  progress={activeIndex === index ? progress : 0}
                  borderColor={tabBorderColor}
                  textColor={panelTextColor}
                />
              ))}
            </HStack>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <VStack align="start" spacing={{ base: 4, lg: 5 }}>
                  <Grid
                    role="tabpanel"
                    templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
                    gap={{ base: 3, lg: 4 }}
                    w="full"
                  >
                    {activeCategory.projects.map((project, index) => (
                      <ProjectCard
                        key={`${activeCategory.id}-${project.projectName}`}
                        project={project}
                        categoryColor={activeCategory.color}
                        panelBorderColor={panelBorderColor}
                        index={index}
                      />
                    ))}
                  </Grid>
                </VStack>
              </motion.div>
            </AnimatePresence>
          </VStack>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
