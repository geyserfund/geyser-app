import { readFileSync } from 'fs'

const REST_HOST = 'localhost:8081'
const MACAROON_PATH = '/geyser-regtest-infra/data/contributor-lnd/data/chain/bitcoin/regtest/admin.macaroon'

const requestBody = {
  addr: 'bcrt1q2q03za80s5pua75srnqn0dujfr2qp9km7jfmnn', // <string>
  amount: 60000, // <int64>
}

export const payOnChainOptions = (addr: string, amount: number | string) => {
  const requestBody = {
    addr,
    amount,
  }
  return {
    method: 'POST',
    url: `http://${REST_HOST}/v1/transactions`,
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-Macaroon': readFileSync(MACAROON_PATH).toString('hex'),
    },
    body: JSON.stringify(requestBody),
  }
}
