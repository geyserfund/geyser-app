import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [
  {
    key: 'description',
    title: 'About The Project',
    body: [
      'Have you ever wondered how many brothers Anthony Pompliano actually has? How Max Keiser keeps his legs looking like that? How old Jack Mallers really is? This is the show that will answer those questions. Inspired by Zach Galifianakis’ interview show “Between Two Ferns,” Between Two ASICs brings satirical interviews into the Bitcoin ecosystem. I ask the tough questions, like how Michael Saylor deals with his day-to-day life as the CEO of Bitcoin. These in-person interviews are going to bring a new level of transparency into the lives of people we look up to in the space. As the saying goes, “Don’t trust, interview them and make them feel awkward.”',
    ],
    images: [0, 1],
    blockType: 'PL',
  },
  {
    key: 'aboutMe',
    title: 'About me',
    body: [
      'I spent 4 years earning a degree in the traditional finance realm. Those years did not strengthen my desire to be in that field. They did the exact opposite. After doing more research into Bitcoin and learning more about it every day, I realized that it answers every question and fills every gap in the traditional system. My passion is to educate people on hard money and what it means in their lives. I also want to entertain people, and use entertainment as a portal to easy learning about a topic that seems so difficult to understand.',
    ],
    blockType: 'PL',
  },
];

const projectDetails: IProjectDetail = {
  problem: '',
  idea: 'A web series of interviews with the questions you want answered.',
  ownerIntro:
    'My passion is to educate people on hard money and what it means in their lives. ',
  blocks: projectBlocks,
};

const projectName: string = 'betweentwoasics';

export const Tatum = { projectBlocks, projectDetails, projectName };
