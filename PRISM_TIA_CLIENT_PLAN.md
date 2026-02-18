# TIA Prism Client Plan

Status: draft
Date: 2025-02-05

## Context
We are adding Prism-based deposits for TIA contributions on Rootstock. The client must build the swap claim call data so that Boltz Router `claimCall` executes `Prism.depositFor` directly. The split amounts are based on the **claim amount** (not the original contribution amount), because swap fees are deducted before claim. For TIA, if the creator has an RSK address configured, we use Prism; otherwise we keep the existing AON/HODL flow.

Key inputs:
- Prism contract ABI: `depositFor(address payer, address[] receivers, uint256[] amounts, bytes32 projectKey)`
- Project key: `keccak256(abi.encode(uint256(projectId)))` (same as server helper)
- Geyser operational wallet: env `VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS`
- Creator RSK address: from project owner `User.accountKeys.rskKeyPair.address`

Split logic:
- Claim amount is:
  - Lightning -> RSK: `payment.amountToClaim`
  - On-chain -> RSK: `swap.claimDetails.amount`
- Geyser share is the sum of fee types: `PLATFORM`, `PROMOTION`, `AMBASSADOR`, `TIP`.
- Exclude: `PAYMENT` (swap fees), `SHIPPING`, and `AFFILIATE_PARTNER`.
- `creatorAmount = claimAmount - geyserAmount`.
- Encode amounts in wei and ensure the sum equals the claim amount (in wei).

## Implementation Plan
1) **Env + config**
   - Add `VITE_APP_ROOTSTOCK_PRISM_CONTRACT_ADDRESS` and `VITE_APP_ROOTSTOCK_GEYSER_OPERATIONAL_ADDRESS` to `geyser-app/src/shared/constants/config/env.ts` exports (and warn if missing).

2) **Project key helper**
   - Add a client helper mirroring server `projectIdToProjectKey`:
     - `keccak256(encodeAbiParameters([{ type: 'uint256' }], [BigInt(projectId)]))`.

3) **Prism deposit calldata**
   - Add `createCallDataForPrismDepositFor` using viem `encodeFunctionData`.
   - Inputs: `payer`, `projectKey`, `receivers[]`, `amounts[]` (wei BigInt).

4) **ClaimCall builder refactor**
   - Extend `createCallDataForBoltzClaimCall` to accept `(callee, callData)` so it works for AON or Prism.
   - Keep an AON wrapper for existing flows.

5) **Use Prism in swap claim tx generation**
   - Update `geyser-app/src/modules/project/funding/hooks/useFundingAPI.ts`:
     - Build split amounts from payment fees (using feeType list above).
     - Compute claim amount per flow.
     - If creator RSK address exists and prism envs are set, build Prism deposit calldata and pass it into the claim builder.
     - Otherwise, keep existing AON claim path unchanged.

6) **Expose creator RSK address**
   - Update project fragments to include owner user `accountKeys { rskKeyPair { address } }`.
   - Propagate to the funding flow via `useProjectAtom` / project query.

7) **Validation**
  - Guard against negative or mismatched splits; log and fall back to AON/HODL if invalid.

8) **Require account password before swap inputs**
  - For Prism TIA (same as AON), prompt the contributor to confirm their account password before submitting the contribution.
  - Ensure `paymentsInput.lightningToRskSwap` and `paymentsInput.onChainToRskSwap` are included for TIA Prism.

## Files Likely Touched
- `geyser-app/src/shared/constants/config/env.ts`
- `geyser-app/src/modules/project/pages/projectFunding/utils/createCallDataForClaimCall.ts`
- `geyser-app/src/modules/project/pages/projectFunding/utils/createCallDataForPrismDepositFor.ts` (new)
- `geyser-app/src/modules/project/funding/hooks/useFundingAPI.ts`
- `geyser-app/src/modules/project/graphql/fragments/projectFragment.ts`
- `geyser-app/src/modules/project/graphql/fragments/userFragment.ts` (if we add accountKeys to owner)
- `geyser-app/src/types/generated/graphql.ts` (regen after fragment changes)
- `geyser-app/src/modules/project/funding/utils/projectKey.ts` (new helper)
