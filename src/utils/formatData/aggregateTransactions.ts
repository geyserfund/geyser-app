import { FundingMethod, FundingTxFragment } from '../../types/generated/graphql'

export interface FundingTxWithCount extends FundingTxFragment {
  count?: number
}

const ThresholdTimeToAggregateTransactions = 3600000 // 60 * 60 * 1000  -> 1 hour;

export const aggregateTransactions = (
  data: FundingTxFragment[],
): FundingTxWithCount[] => {
  const aggregatedTxs: FundingTxWithCount[] = []

  // Array of group of alike FundingTx that are grouped together based on defined categories.
  const groupedTxs: FundingTxFragment[][] = []

  // List of FundingTx IDs that are already a part of a group, and need to be skipped.
  const groupedTxIds: string[] = []

  for (const f1 of data) {
    if (groupedTxIds.includes(f1.id)) {
      continue
    }

    // If a FundingTx iterating from the first loop has not been grouped, will start a new group,

    const matches = [f1]
    groupedTxIds.push(f1.id)

    data.map((f2) => {
      if (groupedTxIds.includes(f2.id)) {
        return
      }
      // We start the second loop to match items with this first Item that started a new match group, skipping FundingTx that are already grouped.

      const isAnon = (f: FundingTxFragment) =>
        f.funder.user === null || f.funder.user === undefined

      if (
        f1.id !== f2.id &&
        (f1.funder.id === f2.funder.id || (isAnon(f1) && isAnon(f2))) &&
        f1.projectId === f2.projectId &&
        f2.method === FundingMethod.PodcastKeysend
      ) {
        if (
          matches.some(
            (match) =>
              Math.abs(match.paidAt - f2.paidAt) <=
              ThresholdTimeToAggregateTransactions,
          )
        ) {
          matches.push(f2)
          groupedTxIds.push(f2.id)
        }
      }
    })
    groupedTxs.push(matches)
  }

  // Each group of matches, is then changed into a single FundingTx with the count of the length of the matches.
  for (const transactions of groupedTxs) {
    const sortedTransactions = transactions.sort((a, b) => a.paidAt - b.paidAt)

    let amount = 0

    for (const transaction of sortedTransactions) {
      if (transaction?.amount) {
        amount += transaction.amount
      }
    }

    const newContribution = {
      ...sortedTransactions[0],
      amount,
      count: sortedTransactions.length,
    } as FundingTxWithCount

    aggregatedTxs.push(newContribution)
  }

  return aggregatedTxs
}
