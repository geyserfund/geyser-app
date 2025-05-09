import { useColorMode, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { ScopeProvider } from 'jotai-scope'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI.ts'
import { initialGoalsLoadAtom } from '@/modules/project/state/goalsAtom.ts'
import { completedGoalsAtom } from '@/modules/project/state/goalsAtom.ts'
import { inProgressGoalsAtom } from '@/modules/project/state/goalsAtom.ts'
import { isWidgetAtom } from '@/modules/project/state/widgetAtom.ts'

import { ProjectProvider } from '../../project/context/ProjectProvider.tsx'
import { ContributionSummary, LeaderboardSummary } from '../../project/pages1/projectView/views/body/sections/index.ts'
import {
  initialProjectDetailsLoadAtom,
  initialProjectGrantApplicationsLoadAtom,
  projectAtom,
  projectLoadingAtom,
} from '../../project/state/projectAtom.ts'

const listOfAtoms = [
  projectAtom,
  projectLoadingAtom,
  initialProjectDetailsLoadAtom,
  initialProjectGrantApplicationsLoadAtom,
  inProgressGoalsAtom,
  completedGoalsAtom,
  initialGoalsLoadAtom,
]

export const ContributionSummaryWidget = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  return (
    <ScopeProvider atoms={listOfAtoms}>
      <ProjectProvider projectName={projectName || ''} initializeWallet>
        <ContributionSummaryWrapper />
      </ProjectProvider>
    </ScopeProvider>
  )
}

export const ContributionSummaryWrapper = () => {
  useProjectGoalsAPI(true)

  const { setColorMode, colorMode } = useColorMode()

  const setIsWidget = useSetAtom(isWidgetAtom)
  const [viewMode, setViewMode] = useState<string | null>(null)
  const [widgetColorMode, setWidgetColorMode] = useState<string | null>(null)

  useEffect(() => {
    setIsWidget(true)

    // Get view parameter from URL
    const urlParams = new URLSearchParams(window.location.search)
    const viewParam = urlParams.get('view')
    const colorModeParam = urlParams.get('colorMode')

    setViewMode(viewParam)
    setWidgetColorMode(colorModeParam)
  }, [])

  useEffect(() => {
    if (widgetColorMode === 'dark' && colorMode !== 'dark') {
      setColorMode('dark')
    } else if (widgetColorMode === 'light' && colorMode !== 'light') {
      setColorMode('light')
    }
  }, [widgetColorMode, setColorMode, colorMode])

  return (
    <VStack maxWidth="400px" height="100vh" overflow="auto" backgroundColor="transparent">
      <ContributionSummary isWidget />
      {viewMode && viewMode === 'full' && <LeaderboardSummary />}
    </VStack>
  )
}
