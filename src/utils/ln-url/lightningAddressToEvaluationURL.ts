/**
 * When evaluating a [Lightning Address](https://github.com/andrerfneves/lightning-address#readme),
 * all that needs to be done is extract the
 * `username` and the `domain.com` from the address and perform a GET request.
 *
 * The returned response payload is the response for the normal LNURL Pay flow,
 * also known as [LUD 6](https://github.com/lnurl/luds/blob/luds/06.md).
 */
export function lightningAddressToEvaluationURL(lightningAddress: string) {
  const lightningAddressEvaluationPathSegments = '.well-known/lnurlp';
  const [username, domain] = lightningAddress.split('@');

  return `https://${domain}/${lightningAddressEvaluationPathSegments}/${username}`;
}
