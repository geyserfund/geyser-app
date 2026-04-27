import { describe, expect, it } from 'vitest'

import {
  hasRefundFileEssentials,
  isRefundDownloadReady,
} from '../../../../../../../src/modules/project/pages/projectFunding/views/fundingPayment/views/paymentOnchain/hooks/useDownloadRefund.ts'

const buildRefundFile = (overrides: Record<string, unknown> = {}) => ({
  id: 'swap-id-1',
  privateKey: 'private-key',
  ...overrides,
})

describe('refundDownloadValidation', () => {
  it('returns true when refund file has essential fields', () => {
    expect(hasRefundFileEssentials(buildRefundFile() as any)).toBe(true)
  })

  it('returns false when refund file is missing essential fields', () => {
    expect(hasRefundFileEssentials(buildRefundFile({ privateKey: '' }) as any)).toBe(false)
    expect(hasRefundFileEssentials(buildRefundFile({ id: '' }) as any)).toBe(false)
  })

  it('requires both swap files for AON refund downloads', () => {
    expect(
      isRefundDownloadReady({
        isAllOrNothing: true,
        lightningToRskSwapRefundFile: buildRefundFile({ id: 'ln' }) as any,
        onChainToRskSwapRefundFile: buildRefundFile({ id: 'onchain' }) as any,
      }),
    ).toBe(true)

    expect(
      isRefundDownloadReady({
        isAllOrNothing: true,
        lightningToRskSwapRefundFile: buildRefundFile({ id: 'ln' }) as any,
        onChainToRskSwapRefundFile: undefined,
      }),
    ).toBe(false)
  })

  it('requires one valid swap file for non-AON refund downloads', () => {
    expect(
      isRefundDownloadReady({
        isAllOrNothing: false,
        onChainSwapRefundFile: buildRefundFile({ id: 'single' }) as any,
      }),
    ).toBe(true)

    expect(
      isRefundDownloadReady({
        isAllOrNothing: false,
        onChainSwapRefundFile: buildRefundFile({ privateKey: '' }) as any,
      }),
    ).toBe(false)
  })
})
