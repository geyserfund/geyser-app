import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
  {
    key: 'description2',
    title: '',
    body: [
      'The global bitcoin adoption rate is predicted to surpass 10% of the world’s population level by 2030. Today there are 81 million bitcoin wallet holders. So by 2030 there will be 800 million bitcoin wallets.',
      'For Bitcoin to grow, users need the education to protect their wallets from theft, loss, or damage. In 2022 bitcoin wallet holders will lose $585m and lost seed phrases are a major culprit.',
      'BinkBonkBank is a simple course to create a brain wallet that is secret, safe, and secure. It’s a backup copy in your head.',
      "**And to be even safer, why not learn how to write it down so that even if someone read it they couldn’t drain your wallet? We'll show you a way to scramble your seed phrase. There are over a billion trillion combinations. Only you will know the correct order.**",
      'Poor memory is caused by a lack of formal training. It is astonishing how easy it is to memorize a 24-word seed phrase, once you are shown how.',
    ],
    images: [1],
    blockType: 'PL',
  },
  {
    key: 'description3',
    title: 'The BinkBonkBank seed phrase course is ready to share. ',
    body: [],
    images: [2],
    blockType: 'PL',
  },
  {
    key: 'description4',
    title: 'The course includes:',
    body: [
      '7 lessons (the first one free)',
      "2 learner styles - choose either 'thinker' or 'feeler' streams",
      '2 learner speeds - slow, and fast.',
      '4 downloadable exercises',
      '13 audio exercises recorded by a professional actor',
      'Tons of tips and tricks for memory mastery',
    ],
    images: [3],
    blockType: 'UL',
  },
  {
    key: 'description4',
    title: 'The funds received will be used for:',
    body: ['discounted pricing', 'promotion', 'course development'],
    blockType: 'UL',
  },
  {
    key: 'description4',
    title: '',
    body: [
      'Your donations will help millions of bitcoin wallet holders to memorize their seed phrases. ',
    ],
    blockType: 'PL',
  },
  {
    key: 'description4',
    title: 'Links',
    body: [
      'Website: [www.binkbonkbank.com](www.binkbonkbank.com)',
      'Email: [help@binkbonkbank.com](help@binkbonkbank.com)',
      'Twitter: [https://twitter.com/BinkBonkBank ](https://twitter.com/BinkBonkBank )',
      'Facebook: [https://www.facebook.com/Binkbonkbank-100368866069968 ](https://www.facebook.com/Binkbonkbank-100368866069968 )',
      'Telegram: [https://t.me/BinkBonkBank ](https://t.me/BinkBonkBank )',
      'Telegram Private Group(by invitation or link): [https://t.me/+PH2wpjOUtxRkMmNk](https://t.me/+PH2wpjOUtxRkMmNk)',
    ],
    blockType: 'PL',
  },
  {
    key: 'aboutMe',
    title: 'About me',
    body: [
      'I’m Bill Aronson. More than 37,000 people from all over the world have participated in my memory courses on Udemy. I stumbled across bitcoin years ago. I saw the need to help us all to memorize our seed phrase - put it in our brain wallet as a backup. This is my first contribution to the bitcoin community.',
    ],
    blockType: 'PL',
  },
];

const projectDetails: IProjectDetail = {
  problem:
    'Have you memorized your seed phrase? Do you know how? Want to be able to create a brain wallet in under ten minutes?',
  idea: ' BinkBonkBank is a nice, precise, concise way to store your cryptocurrency wallet seed phrase in your brain’s memory, so it is secret, safe, and secure.',
  ownerIntro:
    'I’m Bill Aronson. More than 37,000 people from all over the world have participated',
  blocks: projectBlocks,
};

const projectName: string = 'binkbonkbank';

export const BinkBankBonk = { projectBlocks, projectDetails, projectName };
