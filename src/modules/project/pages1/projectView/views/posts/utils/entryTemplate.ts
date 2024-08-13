import { EntryStatus, EntryType } from '@/types'

export const defaultEntry = {
  id: 0,
  title: '',
  description: '',
  image: '',
  content: '',
  status: EntryStatus.Unpublished,
  type: EntryType.Article,
  createdAt: '',
  updatedAt: '',
  fundersCount: 0,
  amountFunded: 0,
  creator: { id: 0, username: '' },
  project: { id: 0, name: '', title: '' },
  publishedAt: '',
}

export const entryTemplateForGrantApplicants = {
  title: 'Application to Bitcoin Circular Economies',
  // eslint-disable-next-line prettier/prettier
  content: "{\"ops\":[{\"insert\":\"Only Bitcoin Circular Economies will be considered for this grant. Note the following:\\nYou must share a vision and plan for the Bitcoin circular economy you are building. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Applications that are looking to only focus on education, events, content creation, travel, or other such requests do not quality for this grant. These should be part of a Bitcoin circular project.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Your application must provide the information requested within the four sections below. All applications will be evaluated according to information provided. Each application will receive an overall score out of 100%, with sections weighted as indicated below (ie, 10%, 30%, 30%, 30%). \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\",\"bold\":true},\"insert\":\"Core Project Details:\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\"},\"insert\":\"Where is your Bitcoin Circular Economy located (town, community, state, region)?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"What problems and challenges are you and your community experiencing?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"How can Bitcoin support your community? \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Why are you creating a Bitcoin Circular Economy? What inspired you to start it?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\",\"bold\":true},\"insert\":\"Proof of Work\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\"},\"insert\":\"Can you showcase your Circular Economy’s work and traction so far?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"What activities have been done to date to build and advance a local Bitcoin circular economy? (Education, outreach with merchants to accept BTC, etc.)\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\",\"bold\":true},\"insert\":\"Vision & Plan\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\"},\"insert\":\"What’s your vision and plan for evolving this circular economy? Provide some steps and goals that you are setting to grow the circular economy. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"What are the next steps/activities from your plan that this grant funding will enable?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"What is the projected timeframe for using these funds to carry out these steps/activities? \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"What amount are you requesting (5M sats, 2M sats, 1M sats)? Include a budget with some breakdown of projected costs (see sample budget on next page)\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\",\"bold\":true},\"insert\":\"Impact & Sustainability\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"var(--chakra-colors-chakra-body-text)\"},\"insert\":\"What are the projected outcomes of activities covered by the grant?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"How will this funding and activities contribute to sustainability of your BTC circular economy project?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Are there other sources of funding that this grant will enable you to pursue?\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Sample Budget\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"The following is a sample budget for a project requesting a 2,000,000 sats grant to be used over a period of 8 months. This provides a sense of the minimum level of details we require for the budget. All amounts listed below are hypothetical and not based on actual costs in any particular region of the world. They are strictly for the purpose of illustrating the details we are requesting. Please provide additional description of the proposed activities within the four sections of the application as described above. The more detail you can provide about any targets you are aiming for, the better. \\n\\n-----\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Timeline: Aug 2024 – March 2025\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nEDUCATION SESSIONS (3) & MEET-UPS (6)\\nSpace and food \\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t460,000 sats\\nMaterials \\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t350,000 sats\\nSats give away / cards \\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t225,000 sats\\n\\nMERCHANT EDUCATION / ADOPTION\\nMaterials (stickers, signs, handouts, etc) \\t\\t\\t\\t\\t175,000 sats\\nPromotion (small purchases at stores) \\t\\t\\t\\t\\t\\t115,000 sats\\n\\nPROJECT MANAGEMENT / VOLUNTEERS\\nHonoraria for volunteers\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t200,000 sats\\nPhone data, printing/promotion, other project costs\\t450,000 sats\\n\\nTOTAL\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t1,975,000 sats\\n\\n\\n\"}]}",
}