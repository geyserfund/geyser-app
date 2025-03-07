import {
  GuardianPartnerBitcoinNewsUrl,
  GuardianPartnerBitcoinTradingCardsUrl,
  GuardianPartnerDJPUrl,
  GuardianPartnerHodlersUrl,
  GuardianPartnerInitialCapitalUrl,
  GuardianPartnerNoGoodUrl,
  GuardianPartnerRhinoUrl,
  GuardianPartnerSoloSatoshiUrl,
  GuardianPartnerWalletofSatoshiUrl,
} from '@/shared/constants/platform/url'

export const PartnerUrls = [
  { image: GuardianPartnerNoGoodUrl, link: 'https://www.nogood.studio/' },
  { image: GuardianPartnerBitcoinTradingCardsUrl, link: 'https://btc-tc.com/' },
  { image: GuardianPartnerHodlersUrl, link: 'https://hodlersofficial.com/' },
  { image: GuardianPartnerSoloSatoshiUrl, link: 'https://www.solosatoshi.com/' },

  { image: GuardianPartnerWalletofSatoshiUrl, link: 'https://www.walletofsatoshi.com/' },
  { image: GuardianPartnerInitialCapitalUrl, link: 'https://www.initialcapital.com/' },
  { image: GuardianPartnerRhinoUrl, link: 'https://rhinobitcoin.com/' },

  { image: GuardianPartnerDJPUrl, link: 'https://djp.pl/' },
  { image: GuardianPartnerBitcoinNewsUrl, link: 'https://bitcoinnews.com/' },
]

export const InvestorData = [
  {
    name: 'Brad Mills',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor1-brad.png',
    link: 'https://x.com/bradmillscan',
  },
  {
    name: 'Phaedrus',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor2-phaedrus.png',
    link: 'https://damus.io/npub1u65jmzmvyppx779m4pgsenw88h63y2q55wavr42n4h46ceaf9vnsznp0lk',
  },
  {
    name: 'Nout',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor3-Nout.png',
    link: 'https://primal.net/p/nprofile1qqsdaw38re28weaadk8wca0weetptke30gpmql69jy6tq0njxcq9v4gcj2dvw',
  },
  {
    name: 'Hivemind Ventures',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor4-hivemind.png',
    link: 'https://hivemind.vc/',
  },
  {
    name: 'Lightning Ventures',
    image:
      'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor5-lightningventures.png',
    link: 'https://ltng.ventures/',
  },
  {
    name: 'Coreteq',
    image: 'https://storage.googleapis.com/geyser-projects-media/guardians-series-one/investors/investor6-coreteq.png',
    link: 'https://coreteq.ventures/',
  },
]
