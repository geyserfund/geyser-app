import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'

import { AppFooter } from '../../components/molecules'

export const PrivacyPolicy = () => {
  return (
    <VStack backgroundColor="neutral.0" align={'flex-start'}>
      <VStack backgroundColor="neutral.0" align={'flex-start'} p={8}>
        <h1>Geyser Privacy Policy</h1>
        <p>Last updated: October 31, 2023</p>
        <p>
          At Geyser Fund, accessible from geyser.fund, we highly prioritize the privacy of our visitors and users. This
          Privacy Policy document contains types of information that is collected and recorded by Geyser Fund and how we
          use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to
          contact us at hello@geyser.fund.
        </p>
        <p>
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with
          regards to the information that they shared and/or collect in Geyser Fund. This policy is not applicable to
          any information collected offline or via channels other than this website.
        </p>

        <strong>Consent</strong>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms described below.</p>

        <strong>Information we collect</strong>
        <p>Each user gets a notice prior to being asked to provide information regarding its purpose and reason.</p>
        <p>
          <em>When you contact us directly</em>, we may receive additional information about you including but not
          limited to:
        </p>
        <UnorderedList p={2}>
          <ListItem>name,</ListItem>
          <ListItem>email address,</ListItem>
          <ListItem>
            the contents of the message and/or attachments you may send.{' '}
            <strong>
              <em>When you register for our services and/or open an Account</em>
            </strong>
            , we may ask for your contact information, including items such as name and email address.
          </ListItem>
        </UnorderedList>

        <p>
          <strong>
            <em>When you contribute a project on Geyser</em>
          </strong>
          , we collect the following information:
        </p>
        <UnorderedList p={2}>
          <ListItem>Rounded amount being contributed</ListItem>
          <ListItem>Day of contribution</ListItem>
          <ListItem>Reward selected</ListItem>
          <ListItem>Country of IP address</ListItem>
        </UnorderedList>

        <strong>How we use your information</strong>
        <p>The information provided upon the consent of the users will be used for the following purposes:</p>
        <UnorderedList p={2}>
          <ListItem>Provide, operate, and maintain our website,</ListItem>
          <ListItem>Improve, personalize, and expand our website,</ListItem>
          <ListItem>Understand and analyze how you use our website,</ListItem>
          <ListItem>Develop new products, services, features, and functionality,</ListItem>
          <ListItem>Broadcast your data to external relays</ListItem>
          <ListItem>
            Communicate with you, either directly or through one of our partners, including for customer service, to
            provide you with updates and other information relating to the website, and for marketing and promotional
            purposes,
          </ListItem>
          <ListItem>Send you emails,</ListItem>
          <ListItem>Find and prevent fraud.</ListItem>
        </UnorderedList>

        <strong>Log Files</strong>
        <p>
          As a hosting company, Geyser Fund follows a standard procedure of using log files within the scope of its
          hosting service analytics. The information collected by log files include:
        </p>
        <UnorderedList p={2}>
          <ListItem>internet protocol (IP) addresses,</ListItem>
          <ListItem>browser type,</ListItem>
          <ListItem>Internet Service Provider (ISP),</ListItem>
          <ListItem>date and time stamp, referring/exit pages, and possibly the number of clicks.</ListItem>
        </UnorderedList>
        <p>
          No sensitive or personally identifiable information is collected within the scope of it. The data is used fot
          the purposes of analyzing trends, website administration, tracking users' movement on the website, and
          gathering demographic information.
        </p>

        <strong>Propagation of data over relays</strong>
        <p>
          Geyser stores project and user data on a Nostr Relay and propagates information to other Nostr Relays in order
          for data to be accessible across clients. This means that your information will be broadcast to other Nostr
          Relays. The relays to which your data will be broadcast to are visible in your project settings.{' '}
        </p>

        <strong>Cookies and Web Beacons</strong>
        <p>
          Like any other website, Geyser Fund uses 'cookies'. These cookies are used to store information including
          visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page content based on visitors' browser type
          and/or other information.
        </p>
        <p>
          For more general information on cookies, please read{' '}
          <a href="https://www.generateprivacypolicy.com/#cookies" target="_blank" rel="noreferrer">
            the Cookies article on Generate Privacy Policy website
          </a>
          .
        </p>

        <strong>Advertising Partners Privacy Policies</strong>
        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Geyser Fund.</p>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used
          in their respective advertisements and links that appear on Geyser Fund, which are sent directly to users'
          browser. They automatically receive your IP address when this occurs. These technologies are used to measure
          the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on
          websites that you visit.
        </p>
        <p>
          Note that Geyser Fund has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <strong>Third Party Privacy Policies</strong>
        <p>
          Geyser Fund's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to
          consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may
          include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information
          about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <strong>CCPA Privacy Rights (Do Not Sell My Personal Information)</strong>
        <p>Under the CCPA, among other rights, California consumers have the right to request from a business:</p>
        <UnorderedList p={2}>
          <ListItem>
            That collects consumer's personal data disclose the categories and specific pieces of personal data
            collected
          </ListItem>
        </UnorderedList>
        <p>To delete any personal data collected about the consumer that a business has collected.</p>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
          please contact us at hello@geyser.fund
        </p>

        <strong>GDPR Data Protection Rights</strong>
        <p>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled
          to the following:
        </p>
        <UnorderedList p={2}>
          <ListItem>
            The right to access – You have the right to request copies of your personal data. We may charge you a small
            fee for this service.
          </ListItem>
          <ListItem>
            The right to rectification – You have the right to request that we correct any information you believe is
            inaccurate. You also have the right to request that we complete the information you believe is incomplete.
          </ListItem>
          <ListItem>
            The right to erasure – You have the right to request that we erase your personal data from our Relay, under
            certain conditions.
          </ListItem>
          <ListItem>
            The right to restrict processing – You have the right to request that we restrict the processing of your
            personal data, under certain conditions.
          </ListItem>
          <ListItem>
            The right to object to processing – You have the right to object to our processing of your personal data,
            under certain conditions.
          </ListItem>
          <ListItem>
            The right to data portability – You have the right to request that we transfer the data that we have
            collected to another organization, or directly to you, under certain conditions.
          </ListItem>
        </UnorderedList>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
          please contact us.
        </p>

        <strong>Children's Information</strong>
        <p>
          Protection of children’s rights and information is an integral part of our values. We encourage parents and
          guardians to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          Geyser Fund does not knowingly collect any Personal Identifiable Information from children under the age of
          13. If you think that your child provided this kind of information on our website, we strongly encourage you
          to contact us immediately and we will do our best efforts to promptly remove such information from our
          records.
        </p>
      </VStack>
      <AppFooter />
    </VStack>
  )
}

export default PrivacyPolicy
