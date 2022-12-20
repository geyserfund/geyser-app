import { FundingMethod, FundingTx } from '../types/generated/graphql';

export interface FundingTxWithCount extends FundingTx {
  count?: number;
}

export const aggregateFundingTransactions = (
  data: FundingTx[],
): FundingTxWithCount[] => {
  const aggregatedTxs: FundingTxWithCount[] = [];

  // Array of group of alike FundingTx that are grouped together based on defined categories.
  const groupedTxs: FundingTx[][] = [];

  // List of FundingTx IDs that are already a part of a group, and need to be skipped.
  const groupedTxIds: string[] = [];

  data.map((f1) => {
    if (groupedTxIds.includes(f1.id)) {
      return;
    }

    // If a FundingTx iterating from the first loop has not been grouped, will start a new group,

    const matches = [f1];
    groupedTxIds.push(f1.id);

    data.map((f2) => {
      if (groupedTxIds.includes(f2.id)) {
        return;
      }
      // We start the second loop to match items with this first Item that started a new match group, skipping FundingTx that are already grouped.

      const isAnon = (f: FundingTx) =>
        f.funder.user === null || f.funder.user === undefined;

      if (
        f1.id !== f2.id &&
        (f1.funder.id === f2.funder.id || (isAnon(f1) && isAnon(f2))) &&
        f1.amount === f2.amount &&
        f1.projectId === f2.projectId &&
        f2.method === FundingMethod.PodcastKeysend
      ) {
        if (
          matches.some((match) => Math.abs(match.paidAt - f2.paidAt) <= 75000)
        ) {
          matches.push(f2);
          groupedTxIds.push(f2.id);
        }
      }
    });
    groupedTxs.push(matches);
  });

  // Each group of matches, is then changed into a single FundingTx with the count of the length of the matches.
  groupedTxs.map((transactions) => {
    const sortedTransaction = transactions.sort((a, b) => a.paidAt - b.paidAt);

    const newContribution = {
      ...sortedTransaction[0],
      count: sortedTransaction.length,
    };

    aggregatedTxs.push(newContribution);
  });

  return aggregatedTxs;
};
