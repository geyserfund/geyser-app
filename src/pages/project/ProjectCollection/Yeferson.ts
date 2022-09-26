import {
  IProjectBlock,
  IProjectDetail,
  IProjectUpdate,
} from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [
  {
    key: 'about',
    title: 'About the game',
    body: [
      '**Lightning Rebel** is a cryptogame in the arcade genre, based on a space adventure with retro pixel art graphics with in-game Bitcoin Lightning rewards. ',
      'The player will control a spaceship that will have to face an army of enemy ships. Each enemy ship counts to accumulate points and claim rewards in Satoshis. All your earnings can be withdrawn directly to any Lightning wallet.',
      'This game is a space adventure trip with deep retro vibe. Get the thrill of playing to win at any time of the day!',
    ],
    images: [0],
    blockType: 'PL',
  },
  {
    key: 'where',
    title: 'Where to play',
    body: [
      'This videogame will have a free to win mobile version on the Google Play Store and a premium version for PC. The said version will be available on the **Elixir Launcher**, a Play to Earn (P2E) gaming platform belonging to the P2E videogame development company Satoshi Games.',
      'Differences between, the mobile version and the PC version.',
      '- The mobile version will be free but comes with advertisements, which will represent the main income for the team.',
      '- The PC version will not have any kind of advertising, however, the game will cost $6. You can also pre-purchase it now with a 50% discount on [Elixir](https://elixir.app/).',
    ],
    blockType: 'PL',
  },
  {
    key: 'when',
    title: 'When does the game launch?',
    body: [
      'The launch date is June 20, 2022. Premium Funders will have access to the game on June 10th.',
    ],
    images: [2],
    blockType: 'PL',
  },
  {
    key: 'why',
    title: 'Why donate?',
    body: [
      'By donating and contributing to this game you’ll support us in developing this and more Bitcoin games for you. ',
      'You’ll be able to access rewards:',
      '- **Access to first contest:** Be part of a game competition where you can win Sats.',
      '- **Premium: Access to contest + Early access + More:** Access private beta version of the game weeks before release (June 10) and access to private  Discord channel.',
    ],
    blockType: 'PL',
  },
  {
    key: 'milestones',
    title: 'Funding Milestones',
    body: [
      '- Milestone 1: $1000. Improve interface',
      '- Milestone 2:  $2500. Create a movile app',
      '- Milestone 3: $5000. Marketing and integration of play to earn ',
    ],
    blockType: 'PL',
  },
  {
    key: 'mission',
    title: 'Our mission',
    body: [
      'At DCS we want to bring fun to the Bitcoin community and Bitcoin to the gaming community!',
      'Through retro games, we want to make our players feel like they are traveling back in time.',
      'Bringing fun and Satoshis in the hands of everyone is our priority!',
    ],
    blockType: 'UL',
  },
  {
    key: 'community',
    title: 'Community Links',
    body: [
      'Twitter: @district_p2e',
      'Instagram: @distritocstudios',
      'Facebook: @distritocstudios',
      '[Discord](https://discord.gg/EhZZhHFK)',
    ],
    images: [3],
    blockType: 'UL',
  },
  {
    key: 'demo',
    title: 'Demo Video',
    body: [],
    youtube: '88QjMXzPPg0',
    blockType: 'PL',
  },
  {
    key: 'aboutTeam',
    title: 'About the team',
    body: [
      'This game is being developed by the Venezuelan startup DCS, Distrito c Studios, which was founded by Yeferson Peña, Hernán Colmenares and Josué Valentín. ',
      "We are three retro-loving Latin Geeks who love the freedom of bitcoin and the speed of the lightning network. Above all, we want our players to have a good time and earn some Bitcoin. We won't make you a millionaire, but we will contribute to Friday pizza. 🍕",
    ],
    blockType: 'PL',
  },
];

const projectDetails: IProjectDetail = {
  problem: '',
  idea: 'A classic space arcade game with awesome pixel art graphics with in-game Bitcoin Lightning rewards.',
  ownerIntro:
    'This game is being developed by the Venezuelan startup DCS, Distrito c Studios, which was founded by Yeferson Peña, Hernán Colmenares and Josué Valentín.',
  blocks: projectBlocks,
};

const projectUpdates: IProjectUpdate[] = [
  {
    updateTitle: 'PROJECT UPDATE #01',
    date: new Date('2022-05-08').getTime(),
    tweet: '1523078115127406604',
    type: 'PL',
  },
  {
    updateTitle: 'PROJECT UPDATE #02',
    date: new Date('2022-05-09').getTime(),
    bodyTitle: 'INTRODUCING PROJECT MILESTONES',
    body: [
      'Each satoshi will take us a step closer to our mission!',
      '- Milestone 1: $1000. Improve interface',
      '- Milestone 2:  $2500. Create a movile app',
      '- Milestone 3: $5000. Marketing and integration of play to earn ',
    ],
    type: 'PL',
  },
];

const projectName: string = 'lightningrebel';

export const Yeferson = {
  projectBlocks,
  projectDetails,
  projectName,
  projectUpdates,
};
