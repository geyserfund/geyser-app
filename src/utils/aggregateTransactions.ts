import { FundingMethod, FundingTx } from '../types/generated/graphql';

export interface FundingTxWithCount extends FundingTx {
  count?: number;
}

export const aggregateTransactions = (
  data: FundingTx[],
): FundingTxWithCount[] => {
  const newContributions: FundingTxWithCount[] = [];

  const nestedTransactions: FundingTx[][] = [];

  const checkedTransactions: string[] = [];

  data.map((f1) => {
    if (checkedTransactions.includes(f1.id)) {
      return;
    }

    const matches = [f1];
    checkedTransactions.push(f1.id);
    data.map((f2) => {
      if (checkedTransactions.includes(f2.id)) {
        return;
      }

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
          checkedTransactions.push(f2.id);
        }
      }
    });
    nestedTransactions.push(matches);
  });

  nestedTransactions.map((transactions) => {
    const sortedTransaction = transactions.sort((a, b) => a.paidAt - b.paidAt);

    const newContribution = {
      ...sortedTransaction[0],
      count: sortedTransaction.length,
    };

    newContributions.push(newContribution);
  });

  return newContributions;
};
