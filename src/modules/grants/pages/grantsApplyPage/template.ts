type Template = {
  title: string
  description: string
  fields: {
    [key: string]: {
      label: string
      description?: string
      defaultValue?: string | string[] | any
    }
  }
}

export const grantApplicationTemplateForGrantNo016: Template = {
  title: 'Submit your Time2Build Project',
  description:
    'Fill in this form to create your project and submit it to the challenge. Creating a project on Geyser will enable you to receive donations through crowdfunding. ',
  fields: {
    title: {
      label: 'Project Submission',
      description: 'Name of the project being integrated',
    },
    shortDescription: {
      label: 'Project Description',
      description:
        'Brief explanation of what the project is and what Bitcoin functionality you added with the Breez SDK. ',
    },
    thumbnailImage: {
      label: 'Application Image',
      description: 'Screenshot of integration in action',
    },
    countryCode: {
      label: 'Country',
    },
    projectLinks: {
      label: 'Project Links',
      description:
        'Please add the direct link to the pull request with your Breez SDK integration (and all additional relevant links).',
      defaultValue: ['https://github.com/your-username/your-repo/pull/1'],
    },
    images: {
      label: 'Header Images',
      defaultValue: [
        'https://storage.googleapis.com/geyser-projects-media/grants/round-016/time2build_grant_header.webp',
      ],
    },
    description: {
      label: 'Project Submission Form',
      description: 'Please complete the form for your project on the Time2Build challenge',
      defaultValue:
        '**1\\. Project Title**  \nName of the project being integrated.\n\n  \n  \n**2\\. Link to GitHub PR**  \nDirect link to the pull request with Breez SDK integration.\n\n  \n  \n**3\\. Project Description**  \nBrief explanation of what the project is and what Bitcoin functionality you added with the Breez SDK.  \nWhy did you choose to integrate this?\n\n  \n**  \n4\\. Images / Video**  \nScreenshots, GIFs, or a short demo video showing Bitcoin in action inside the project.\n\n  \n  \n**5\\. Team**  \nList all the contributors to this integration with their GitHub and/or social links.  \nFormat: Name – GitHub / Twitter / Nostr\n\n  \n  \n**6\\. Learnings & Challenges**  \nWhat did you learn during the implementation?  \nWhat challenges did you face and how did you solve them?\n\n  \n  \n**7\\. Anything Else Judges Should Know**  \nSpace for context: community size, impact, future plans, or any other details that strengthen your submission.',
    },
  },
}

export const getDescriptionFromValues = ({
  githubLink,
  description,
  team,
  learnings,
  anythingElse,
}: {
  githubLink: string
  description: string
  team: string
  learnings: string
  anythingElse: string
}) => {
  return `## Link to GitHub PR  \n${githubLink}\n\n  \n  \n## Project Description  \n${description}\n\n  \n   \n## Team  \n${team}\n\n  \n  \n## Learnings & Challenges  \n${learnings}\n\n  \n  \n## Anything Else Judges Should Know  \n${anythingElse}`
}
