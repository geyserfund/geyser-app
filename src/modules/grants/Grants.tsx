import ClosedGrants from './components/ClosedGrants'
import GrantsHeader from './components/GrantsHeader'
import OpenGrants from './components/OpenGrants'
import UpcomingGrants from './components/UpcomingGrants'
import { useGrants } from './hooks/useGrants'

export const Grants = () => {
  const { inactiveGrants, fundingOpenGrants, applicationOpenGrants } = useGrants()

  return (
    <>
      <GrantsHeader />
      <OpenGrants openGrants={fundingOpenGrants} />
      <UpcomingGrants upcomingGrants={applicationOpenGrants} />
      <ClosedGrants closedGrants={inactiveGrants} />
    </>
  )
}
