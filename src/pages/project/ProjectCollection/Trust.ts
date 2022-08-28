import { IProjectBlock, IProjectDetail } from '../../../interfaces';

const projectBlocks: IProjectBlock[] = [
    {
        key: 'heading',
        title: '',
        body: [],
        blockType: 'PL',
    },
    {
        key: 'description',
        title: 'Description',
        body: [
            'TRUST is a  multi-part documentary series from the creator of STEAL THIS FILM and THIS MACHINE GREENS, looking at the role Bitcoin will play following the global breakdown of trust in institutions, governments and authority. When did this crisis start, and how is it connected with the rise of digital networks? Could Bitcoin be part of a new set of institutions that can operate without or beyond trust?',
            'Key interviewees include: Jeff Booth, Troy Cross, Martin Gurri, Alex Gladstein,  Whit Diffie, Mike Brock, Adam Back.',
            'We have so far raised $310,000 out of a $550,000 budget; this campaign seeks to raise as much as possible of the remaining funding. It will enable us to make a high-quality series for Netflix, Apple TV, Hulu or similar.',
        ],
        blockType: 'PL',
    },
    {
        key: 'rewards',
        title: 'GEYSER REWARDS',
        body: [],
        images: [0],
        blockType: 'PL',
    },
    {
        key: 'aboutMe',
        title: 'About me',
        body: [
            'Jamie King is an award-winning documentary filmmaker, whose previous films have reached millions of viewers online, been screened at film festivals world wide and sold to major television networks. He is also an advocate for decentralization – his first film series STEAL THIS FILM focused on the benefits of peer-to-peer sharing for creators, and as early as 2011 his film distribution platform VODO trialled p2p distribution for filmmakers alongside Bitcoin-based donations. Now Jamie is focused on creating a mainstream series that can bring the story of Bitcoin to a multi-million audience via a major streaming service.',
        ],
        blockType: 'PL',
    },
];

const projectDetails: IProjectDetail = {
    problem: '',
    idea: 'How will we survive in a world after trust? Could Bitcoin be the answer? From the director of This Machine Greens and Swan Bitcoin, this three part documentary series places Bitcoin at the heart of one of the key social and political crises of our era.',
    ownerIntro: 'Jamie King is an award-winning documentary filmmaker, whose previous films have reached millions of viewers online, been screened at film festivals world wide and sold to major television networks. He is also an advocate for decentralization – his first film series STEAL THIS FILM focused on the benefits of peer-to-peer sharing for creators, and as early as 2011 his film distribution platform VODO trialled p2p distribution for filmmakers alongside Bitcoin-based donations. Now Jamie is focused on creating a mainstream series that can bring the story of Bitcoin to a multi-million audience via a major streaming service.',
    blocks: projectBlocks,
};

const projectName: string = 'trustdocumentary';

export const Trust = { projectBlocks, projectDetails, projectName };
