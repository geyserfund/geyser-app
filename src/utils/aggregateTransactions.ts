import { FundingTx } from '../types/generated/graphql';

export interface FundingTxWithCount extends FundingTx {
  count?: number;
}

export const aggregateTransactions = (
  data: FundingTx[],
): FundingTxWithCount[] => {
  const newContributions: FundingTxWithCount[] = [];

  const nestedTransactions: FundingTx[][] = [];

  data.map((f1) => {
    if (nestedTransactions.some((array) => array.some((f) => f.id === f1.id))) {
      return;
    }

    const matches = [f1];
    data.map((f2) => {
      if (
        f1.id !== f2.id &&
        f1.funder.id === f2.funder.id &&
        f1.amount === f2.amount &&
        f1.address === f2.address
      ) {
        if (
          matches.some(
            (match) => match.paidAt - f2.paidAt <= 75000 && match.id !== f1.id,
          )
        ) {
          matches.push(f2);
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
