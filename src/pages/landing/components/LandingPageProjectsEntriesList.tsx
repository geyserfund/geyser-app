import { Button, Divider, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

import { ProjectEntryCard } from '../../../components/molecules'
import { AlertBox } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { useAllGeyserProjectEntries } from '../../../hooks'
import { Entry, PaginationInput } from '../../../types/generated/graphql'

type Props = {
  itemLimit?: number
}

export const LandingPageProjectsEntriesList = ({ itemLimit = 5 }: Props) => {
  const {
    isLoading,
    error,
    data: entries,
    fetchMore,
  } = useAllGeyserProjectEntries({
    itemLimit,
  })

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [isShowingAllEntries, setIsShowingAllEntries] = useState(false)

  const paginationInput: PaginationInput = useMemo(() => {
    const options: PaginationInput = {}

    if (entries.length > 0) {
      options.cursor = {
        id: Number(entries[entries.length - 1].id),
      }
    }

    return options
  }, [entries])

  const handleLoadMoreButtonTapped = async () => {
    setIsLoadingMore(true)

    await fetchMore({
      variables: {
        input: {
          pagination: paginationInput,
        },
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (fetchMoreResult.getEntries.length < itemLimit) {
          setIsShowingAllEntries(true)
        }

        // return the result and let our `InMemoryCache` type policies handle
        // the merging logic.
        return {
          getEntries: fetchMoreResult.getEntries,
        }
      },
    })

    setIsLoadingMore(false)
  }

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch entries."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  if (isLoading && !entries) {
    return <Loader />
  }

  if (entries?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project entries."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      {isLoading && <Loader />}

      <VStack alignItems={'flex-start'} width="full">
        {entries.map((entry: Entry) => (
          <ProjectEntryCard entry={entry} key={entry.id} />
        ))}
      </VStack>

      {isShowingAllEntries === false ? (
        <>
          <Divider />

          {isLoadingMore === false ? (
            <Button onClick={handleLoadMoreButtonTapped}>View More</Button>
          ) : (
            <Loader />
          )}
        </>
      ) : null}
    </VStack>
  )
}
