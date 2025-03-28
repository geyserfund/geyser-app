import {
  BITCOIND_AUTH,
  BITCOIND_ENDPOINT,
  CONTRIBUTOR_LND_ADMIN_MACAROON_HEX,
  CONTRIBUTOR_LND_ENDPOINT,
  MINE_BLOCK_ADDRESS,
} from '../contants'

export const payOnChainOptions = (addr: string, amount: number | string) => {
  const requestBody = {
    addr,
    amount,
  }
  return {
    method: 'POST',
    url: `${CONTRIBUTOR_LND_ENDPOINT}/v1/transactions`,
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': CONTRIBUTOR_LND_ADMIN_MACAROON_HEX,
    },
    body: JSON.stringify(requestBody),
  }
}

export const payLightningInvoice = (payment_request: string) => {
  const requestBody = {
    payment_request,
  }
  return {
    method: 'POST',
    url: `${CONTRIBUTOR_LND_ENDPOINT}/v1/channels/transaction-stream`,
    rejectUnauthorized: false,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': CONTRIBUTOR_LND_ADMIN_MACAROON_HEX,
    },
    body: JSON.stringify(requestBody),
  }
}

export const mineBlockOptions = () => {
  const requestBody = {
    jsonrpc: '2.0',
    id: 'curltest',
    method: 'generatetoaddress',
    params: [1, MINE_BLOCK_ADDRESS],
  }
  return {
    method: 'POST',
    url: BITCOIND_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${BITCOIND_AUTH}`,
    },
    body: JSON.stringify(requestBody),
  }
}
