import { IProjectBlock, IProjectDetail } from '../../../interfaces';
const projectBlocks: IProjectBlock[] = [
  {
    key: 'podcast',
    title: '',
    body: [''],
    podcast:
      'https://anchor.fm/geyser-fund/embed/episodes/The-Fight-for-the-US-Dollar-A-Bitcoin-Documentary-009-e1m5fbu',
    blockType: 'PL',
  },
  {
    key: 'description0',
    title: '',
    body: [''],
    youtube: 'JpX34PL87OY',
    blockType: 'PL',
  },
  {
    key: 'description1',
    title: '',
    body: [
      'The film starts with a historic scene: animated illustrations and CGI cover the expansion of different civilizations throughout history, describing the ones that have also expanded their monetary control. China, Rome, etc. Finally showing very quickly what is still happening today, zooming in onto France & Central Africa, and then the US, and display their expansion to the world, finally zooming into Central America.',
    ],
    blockType: 'PL',
  },
  {
    key: 'description2',
    title: '',
    body: [
      'Using archive footage, stills and interviews, explain the history of Central America and the US expansion there through interviews with local historians, local geopolitical scholars and local government officials. Combine archive footage/stills with map animations. Cover small stories from each of the countries in the region and finally focus on El Salvador.',
    ],
    images: [1],
    blockType: 'PL',
  },
  {
    key: 'description3',
    title: '',
    body: [
      'El Salvador has tried to break out of this US dollar domination through the adoption of Bitcoin as legal tender. It is about nation-state sovereignty, but also individual sovereignty. The decision was influenced by views on inflation, freedom, remittances, and an attempt to bank the unbanked. Following this decision, the government of El Salvador has been under scrutiny from the US government. Interviewing US and local government officials will help viewers understand the motivations behind both sides of the story.',
      'The adoption of bitcoin has gained interest within the rest of the Central American region and countries like Guatemala and Honduras have publicly expressed their interest in bitcoin adoption. So far, no other country in the region has taken the next step. Local government officials that are involved in the decision making will be interviewed to explain the background.',
    ],
    images: [2],
    blockType: 'PL',
  },
  {
    key: 'description4',
    title: '',
    body: [
      'On another continent, 7 months after El Salvador, the Central African Republic has also adopted bitcoin as legal tender. Through this, the country can gain its independence not from the US government and the US dollar, but from the French government and the CFA franc. This scene will be a deep-dive exploration into the control the French government has had on 14 Central African countries since 1945. It is important to show that this is not a US-created problem but that this exists all over the world because of different actors.',
      'We want to explain that fighting bitcoin is essentially fighting freedom. This fact needs to be exposed for viewers to understand the challenges and power issues at hand. A scene that cuts together an explanation from each of the bitcoiner interviewees will give such an explanation from different point of views: monetary, individual freedom, etc.',
    ],
    images: [3],
    blockType: 'PL',
  },
  {
    key: 'description5',
    title: '',
    body: [
      'The last scene will be focused on presenting a future with bitcoin. What would our world look like with Bitcoin. It will cover all aspects of bitcoin’s impact on our world: monetary, inflation, freedom, low time preference and the impacts this can have on consumption and growth, energy, etc. This scene will take inspiration from the short film Bitcoin is Generational Wealth directed by Matt Hornick.',
    ],
    blockType: 'PL',
  },
  {
    key: 'aboutMe',
    title: 'About me',
    body: [
      'My name is Pierre Corbin and I am the writer, director and producer of the bitcoin documentary “The Great Reset and the Rise of Bitcoin”. I used to be a tech consultant, with an educational background in finance. After finding and understanding bitcoin, I knew I had to try and bring value to the network and to the community. My first attempt in doing so has been through the production of a documentary to help people understand how bitcoin fits in the context of our economical situation.',
    ],
    images: [4],
    blockType: 'PL',
  },
];

const projectDetails: IProjectDetail = {
  problem: '',
  idea: 'Bitcoin adoption is happening around the world among nation states and is shocking the current status quo. Global authorities are pressuring these early adopting nations. This film explores why control over other nations’ sovereignty started and how it is done today because of bitcoin.',
  ownerIntro: '',
  blocks: projectBlocks,
};

const projectName: string = 'thefightfortheusd';

export const Pierre = { projectBlocks, projectDetails, projectName };
