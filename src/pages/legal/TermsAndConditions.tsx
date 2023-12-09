import { OrderedList, ListItem, UnorderedList, VStack } from '@chakra-ui/react'

import { AppFooter } from '../../components/molecules'

export const TermsAndConditions = () => {
  return (
    <VStack backgroundColor="neutral.0" align={'flex-start'}>
      <VStack backgroundColor="neutral.0" align={'flex-start'} p={8}>
      <h1>Terms and Conditions</h1>
      <p>Effective Date and Last Updated: October 31, 2023</p>
      <strong>Welcome to Geyser</strong>
      <p>This page explains our terms of use. When you use Geyser, you’re agreeing to all the rules below. By using this website (the “Site”) and services (together with the Site, the “Services”) offered by Geyser Inc., you’re agreeing to these legally binding rules (the “Terms”). You’re also agreeing to our Privacy Policy. We may change these terms from time to time. If we do, we’ll let you know about any material changes, either by notifying you on the Site or by sending you an email.</p>
      <OrderedList spacing={2}>
        <ListItem>
          <strong>About Creating an Account</strong>
          <p>You can browse Geyser without registering for an account. But to use some of Geyser’s functions, you’ll need to create an account. When you do that, the information you give us has to be accurate and complete. Don’t impersonate anyone else or choose names that are offensive or that violate anyone’s rights. If you don’t follow these rules, we may cancel your account.</p>
          <p>You’re responsible for all the activity on your account, and for keeping your sign in confidential. If you find out that someone’s used your account without your permission, you should report it to hello@geyser.fund. </p>
          <p>To sign up for an account, you need to be at least 18 years old, or old enough to form a binding contract where you live. If necessary, we may ask you for proof of age.</p>
        </ListItem>
        <ListItem>
          <strong>Things You Definitely Shouldn’t Do</strong>
          <p>Thousands of people use Geyser. We expect all of them to behave responsibly and help keep this a nice place. Don’t do any of these things on the Site:</p>
          <UnorderedList p={2}>
            <ListItem><strong>Don’t break the law.</strong> Don’t take any action that infringes or violates other people’s rights, violates the law, or breaches any contract or legal duty you have toward anyone.</ListItem>
            <ListItem><strong>Don’t victimize anyone.</strong> Don’t do anything threatening, abusive, harassing, defamatory, libelous, tortious, obscene, profane, or invasive of another person’s privacy.</ListItem>
            <ListItem><strong>Don’t spam.</strong> Don’t distribute unsolicited or unauthorized advertising or promotional material, or any junk mail, spam, or chain letters. </ListItem>
            <ListItem><strong>Don’t lie to people.</strong> Don’t post information you know is false, misleading, or inaccurate. Don’t do anything deceptive or fraudulent.</ListItem>
            <ListItem><strong>Don’t offer prohibited items.</strong> Don’t offer any rewards that are illegal, violate any of Geyser policies, rules, or guidelines, or violate any applicable law, statute, ordinance, or regulation.</ListItem>
            <ListItem><strong>Don’t scam.</strong> Use of the Services to facilitate scams or deception is strictly prohibited, including, but not limited to, the promotion of altcoins or non-bitcoin crypto tokens. Geyser is a Bitcoin-only platform, and this will be enforced.</ListItem>
            <ListItem><strong>Don’t harm anyone’s computer.</strong> Don’t distribute software viruses, or anything else (code, films, programs) designed to interfere with the proper function of any software, hardware, or equipment on the Site (whether it belongs to Geyser or another party).</ListItem>
            <ListItem><strong>Don’t abuse other users’ personal information.</strong> When you use Geyser — and especially if you create a successful project — you may receive information about other users, including things like their names, email addresses, and postal addresses. This information is provided for the purpose of participating in a Geyser project: don’t use it for other purposes, and don’t abuse it.</ListItem>
          </UnorderedList>
          <p>We also need to make sure that the Site is secure and our systems function properly. So don’t do any of these things—most of which boil down to “don’t mess with our system.”</p>
          <UnorderedList p={2}>
            <ListItem>Don’t try to interfere with the proper workings of the Services.</ListItem>
            <ListItem>Don’t bypass any measures we’ve put in place to secure the Services.</ListItem>
            <ListItem>Don’t try to damage or get unauthorized access to any system, data, password, or other information, whether it belongs to Geyser or another party.</ListItem>
            <ListItem>Don’t take any action that imposes an unreasonable load on our infrastructure, or on our third-party providers. (We reserve the right to determine what’s reasonable.)</ListItem>
            <ListItem>Don’t use any kind of software or device (whether it’s manual or automated) to “crawl” or “spider” any part of the Site.</ListItem>
            <ListItem>Don’t take apart or reverse engineer any aspect of Geyser in an effort to access things like source code, underlying ideas, or algorithms.</ListItem>
          </UnorderedList>
          <p>Geyser reserves the right to delist any project from the Site and from Geyser’s platform that does not conform to these Terms.</p>
        </ListItem>
        <ListItem>
          <strong>How Project Donations and Rewards Work</strong>
          <p>Geyser provides a funding platform for creative projects. When a creator posts a project on Geyser, they’re inviting other people to participate. A contributor who makes a donation to the project is doing so voluntarily with no expectations of financial or returns. </p>
          <p>A contributor who funds with a reward based on the creator’s offer forms a contract with the creator. Geyser is not party to this contract. The contract is an agreement between creators and their backers. Here are the terms that govern that agreement:</p>
          <p>When a creator purchases an item with a reward, the creator must fulfill each reward. Once a creator has done so, they’ve satisfied their obligation to their contributors. Throughout the process, creators owe their contributors a high standard of effort, honest communication, and a dedication to bringing the project to life. Geyser take no responsibility for the failure of creators to live up to their contracts with contributors, and by using the Services, creators and contributors both hereby waive any claims against and hold harmless Geyser, its employees, officers, directors, agents, successors, and assigns relating to a breach of contract between creators and contributors. </p>
          <p>At the same time, contributors must understand that when they purchase a reward they may not be buying something when they contribute towards a project—they’re helping to create something that may be new, that does not yet already exists. There may be changes or delays, and there’s a chance something could happen that prevents the creator from being able to finish the project as promised.</p>
          <p>If a creator is unable to fulfill rewards, they’ve failed to live up to the basic obligations of this agreement. To right this, they must make every reasonable effort to find another way of bringing the project to the best possible conclusion for contributors. A creator in this position has only remedied the situation and met their obligations to backers if:</p>
          <UnorderedList p={2}>
            <ListItem>They post an update that explains what work has been done, how funds were used, and what prevents them from finishing the project as planned</ListItem>
            <ListItem>They work diligently and in good faith to bring the project to the best possible conclusion in a timeframe that’s communicated to contributors</ListItem>
            <ListItem>They’re able to demonstrate that they’ve used funds appropriately and made every reasonable effort to complete the project as promised</ListItem>
            <ListItem>They’ve been honest, and have made no material misrepresentations in their communication to contributors; and</ListItem>
            <ListItem>They offer to return any remaining funds to contributors who have not received their reward (in proportion to the amounts pledged), or else explain how those funds will be used to complete the project in some alternate form.</ListItem>
          </UnorderedList>
          <p>The creator is solely responsible for fulfilling the promises made in their project. If they’re unable to satisfy the terms of this agreement, they may be subject to legal action by contributors who selected a reward.</p>
        </ListItem>
        <ListItem>
          <strong>How Funding Works</strong>
          <UnorderedList p={2}>
            <ListItem><strong>Geyser does not custody any funds.</strong> When you contribute to a project the funds go straight to the creator. Geyser does not custody the funds at any time.</ListItem>
            <ListItem><strong>The creator may need to reach out with questions about your reward.</strong> To deliver rewards, the creator might need information from you, like your mailing address or t-shirt size. They’ll request that information after the campaign has succeeded by using email. To receive the reward, you’ll need to provide the information in a reasonable amount of time. Creators should not ask for personal information that is not necessary to provide your reward, and should never request sensitive personal information such as your Social Security number or payment information. Contact us at <a href="mailto:hello@geyser.fund">hello@geyser.fund</a> if you receive a request for information that seems inappropriate or excessive.</ListItem>
            <ListItem><strong>Geyser doesn’t offer refunds.</strong> Responsibility for finishing a project lies entirely with the project creator. Geyser doesn’t hold funds on creators’ behalf, cannot guarantee creators’ work, and does not offer refunds.</ListItem>
            <ListItem><strong>Geyser relies on the Bitcoin/Lightning network to process all payments.</strong> This means that payments are cash final, there can be no reimbursement. Geyser does not have control over the Bitcoin network, and by using the Services, creators and contributors hereby acknowledge that they alone, and not Geyser, will be responsible for lost funds due to incorrect addresses, missing liquidity, failed payments, nodes going offline, network downtime, malicious or faulty software, hard-forks, hashrate attacks, or any other foreseen or unforeseen risks inherent to the Bitcoin network.</ListItem>
           </UnorderedList>
        </ListItem>
        <ListItem>
          <strong>Stuff We Don’t Do and Aren’t Responsible For</strong>
          <p>Geyser isn’t liable for any damages or losses related to your use of the Services. We don’t become involved in disputes between users, or between users and any third party relating to the use of the Services. We don’t oversee the performance or punctuality of projects, and we don’t endorse any content users submit to the Site. When you use the Services, you release Geyser from claims, damages, and demands of every kind—known or unknown, suspected or unsuspected, disclosed or undisclosed—arising out of or in any way related to such disputes and the Services. All content you access through the Services is at your own risk. You’re solely responsible for any resulting damage or loss to any party.</p>
        </ListItem>
        <ListItem>
          <strong>Our Fees</strong>
          <UnorderedList>
            <ListItem>We will not collect any fees without giving you a chance to review and accept them. If our fees ever change, we’ll announce that on our Site. </ListItem>
            <ListItem>We will take a 2% fee from any contribution taking place if a project uses a lightning address. </ListItem>
            <ListItem>Geyser will be taking fees from processing on-chain transactions to projects using lightning addresses. We will be doing that in the process of transfering on-chain funds to lightning funds using a third party service provider. </ListItem>
            <ListItem>You’re responsible for paying any additional fees or taxes associated with your bitcoin activity, such as on-chain fees or lightning routing fees.</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <strong>Other Websites</strong>
          <p>The Site may contain links to other websites. (For instance, project pages, user profiles, and comments may link to other sites.) When you access third-party websites, you do so at your own risk. We don’t control or endorse those sites.</p>
        </ListItem>
        <ListItem>
          <strong>Your Intellectual Property</strong>
          <p>Geyser doesn’t own content you submit to us (your “Content”). But we do need certain licenses from you in order to perform our Services. When you submit a project for review, or launch a project, you agree to these terms:</p>
          <UnorderedList>
            <ListItem><strong>Geyser has no obligation to review your the content.</strong> Geyser may, but will not have any obligation to, review, monitor, display, post, store, maintain, accept, or otherwise make use of, any of your Content</ListItem>
            <ListItem><strong>We can use the Content you’ve submitted.</strong> You grant to us, and others acting on our behalf, the worldwide, non-exclusive, perpetual, irrevocable, royalty-free, sublicensable, transferable right to use, exercise, commercialize, and exploit the copyright, publicity, trademark, and database rights with respect to your Content. In general, we use this Content to promote projects and showcase our community on the website. </ListItem>
            <ListItem><strong>Geyser may reject and remove content.</strong> Geyser may, in its sole discretion, reject, delete, move, re-format, remove, or refuse to post or otherwise make use of UGC without notice or any liability to you or any third-party in connection with our operation of Content venues in an appropriate manner.</ListItem>
            <ListItem><strong>When we use the Content, we can make changes, like editing or translating it.</strong> You grant us the right to edit, modify, reformat, excerpt, delete, or translate any of your Content.</ListItem>
            <ListItem><strong>You won’t submit stuff you don’t hold the copyright for (unless you have permission).</strong> Your Content will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material, or you are otherwise legally entitled to post the material (and to grant Geyser all the license rights outlined here).</ListItem>
            <ListItem><strong>Any royalties or licensing on your Content are your responsibility.</strong> You will pay all royalties and other amounts owed to any person or entity based on your Content, or on Geyser hosting of that Content.</ListItem>
            <ListItem><strong>You promise that if we use your Content, we’re not violating anyone’s rights or copyrights.</strong> If Geyser or its users exploit or make use of your submission in the ways contemplated in this agreement, you promise that this will not infringe or violate the rights of any third party, including (without limitation) any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.</ListItem>
            <ListItem><strong>You’re responsible for the stuff you post.</strong> All information submitted to the Site, whether publicly posted or privately transmitted, is the sole responsibility of the person from whom that Content originated.</ListItem>
            <ListItem><strong>We’re not responsible for mistakes in your Content.</strong> Geyser will not be liable for any errors or omissions in any Content.</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <strong>Geyser’s Intellectual Property</strong>
          <p>Geyser’s Services are legally protected in various ways, including copyrights, trademarks, service marks, patents, trade secrets, and other rights and laws. You agree to respect all copyright and other legal notices, information, and restrictions contained in any content accessed through the Site. You also agree not to change, translate, or otherwise create derivative works of the Service.</p>
          <p>Geyser grants you a license to reproduce content from the Services for personal use only. This license covers both Geyser’s own protected content and user-generated content on the Site. (This license is worldwide, non-exclusive, non-sublicensable, and non-transferable.) If you want to use, reproduce, modify, distribute, or store any of this content for a commercial purpose, you need prior written permission from Geyser or the relevant copyright holder. A “commercial purpose” means you intend to use, sell, license, rent, or otherwise exploit content for commercial use, in any way.</p>
        </ListItem>
        <ListItem>
          <strong>How We Deal with Copyright Issues</strong>
          <p>The Digital Millennium Copyright Act lays out a system of legal requirements for dealing with allegations of copyright infringement. Geyser complies with the DMCA, and we respond to notices of alleged infringement if they comply with the law and the requirements set forth in our Copyright Policy. We reserve the right to delete or disable content alleged to be infringing, and to terminate accounts for repeat infringers. (We do this when appropriate and at our sole discretion.)</p>
          <p>If you’d like to submit a claim of copyright infringement, please email us at <a href={"mailto:hello@geyser.fund"}>hello@geyser.fund</a>.</p>
        </ListItem>
        <ListItem>
          <strong>Deleting Your Account</strong>
          <p>You may Deactivate your project at any time, which will not allow anyone to fund your initiative. But you may not be able to delete your project at any time in order for Geyser to ensure that no scam is being carried out. </p>
          <p>You can delete your profile or project directly in the project or profile settings. If you have any issues you can reach out to the team at hello@geyser.fund. Once we delete it, we may retain certain information as required by law or as necessary for our legitimate business purposes. All provisions of this agreement survive termination of an account, including our rights regarding any content you’ve already submitted to the Site. (For instance, if you’ve launched a project, deleting your account will not automatically remove the project from the Site.) You can contact us at <a href="mailto:hello@geyser.fund">hello@geyser.fund</a> for additional information or to request project page deletion (this is not available in all circumstances).</p>
          <p>Additionally, since Geyser is built on Nostr, any data that is deleted on Geyser may still exist on other Nostr Relays. More on this in the next section</p>
        </ListItem>
        <ListItem>
          <strong>Propagation of information over relays</strong>
          <p>Geyser stores project and user data on a Nostr Relay and propagates information to other Nostr Relays in order for data to be accessible across Nostr clients. </p>
          <p>This means that your project and profile information will be broadcast to other Nostr Relays. You can check which Relays data is being broadcast to by checking your project settings. </p>
        </ListItem>
        <ListItem>
          <strong>Our Rights</strong>
          <p>To protect the health and integrity of our system and to help ensure that creators and backers enjoy a safe and secure environment, Geyser reserves these rights:</p>
          <UnorderedList p={2}>
            <ListItem>We can make changes to the Geyser Site and Services without notice or liability.</ListItem>
            <ListItem>We have the right to decide who’s eligible to use Geyser. We may in limited circumstances impose restrictions or limitations on accounts, or—for particularly significant or repeated violations of our Terms or any other rules on the Site, we may cancel accounts or decline to offer our Services. (Especially if you’re abusing them.) We can change our eligibility criteria at any time. If these things are prohibited by law where you live, then we revoke your right to use Geyser in that jurisdiction.</ListItem>
            <ListItem>We have the right to cancel any pledge to any project, at any time and for any reason.</ListItem>
            <ListItem>We have the right to reject, cancel, interrupt, remove, or suspend any project at any time and for any reason.</ListItem>
          </UnorderedList>
          <p>Geyser is not liable for any damages as a result of any of these actions.
            It is our general policy not to comment on the reasons for any such action. However, if we impose restrictions on or limit a verified account holder’s access to any of our Services or if we intend to cancel a verified account, we will let the account holder know the reasons for this action and how they can remedy any issues (where appropriate), unless we’re prohibited from doing so by law or in the interest of safety. For account cancelations, we will let the account holder know the reasons for this action at least 30 days in advance, unless we’re canceling for reasons related to illicit or inappropriate content, the safety of a good or service, counterfeiting, fraud, malware, spam, data breaches, other cybersecurity risks, or the suitability of a good or service for minors.</p>
        </ListItem>
        <ListItem>
          <strong>Warranty Disclaimer</strong>
          <p>You use our Services solely at your own risk. They are provided to you “as is” and “as available” and <em>without warranty of any kind</em>, express or implied.
            GEYSER SPECIFICALLY DISCLAIMS ANY AND ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE. NO ADVICE OR INFORMATION (ORAL OR WRITTEN) OBTAINED BY YOU FROM GEYSER SHALL CREATE ANY WARRANTY.</p>
        </ListItem>
        <ListItem>
          <strong>Indemnification</strong>
          <p>If you do something that gets us sued, or break any of the promises you make in this agreement, you agree to defend, indemnify, and hold us harmless from all liabilities, claims, and expenses (including reasonable attorneys’ fees and other legal costs) that arise from or relate to your use or misuse of Geyser. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to this indemnification clause, in which case you agree that you’ll cooperate and help us in asserting any defenses.</p>
          <p>As part of this, by accepting these Terms of Use, you consent to service of process for any action that could be brought against Geyser, for any reason.</p>
        </ListItem>
        <ListItem>
          <strong>Limitation of Liability</strong>
          <p><strong>To the fullest extent permitted by law, in no event will Geyser, its directors, employees, partners, suppliers, agents, successors, affiliates, assigns, or content providers be liable for any indirect, incidental, punitive, consequential, special, or exemplary damages of any kind, including but not limited to damages (i) resulting from your access to, use of, or inability to access or use the Services; (ii) for any lost profits, data loss, or cost of procurement or substitute goods or services; or (iii) for any conduct of content of any third party on the Site. In no event shall Geyser’s liability for direct damages be in excess of (in the aggregate) one hundred U.S. dollars ($100.00).</strong></p>
        </ListItem>
        <ListItem>
          <strong>Dispute Resolution and Governing Law</strong>
          <p>We at Geyser encourage you to contact us if you’re having an issue before resorting to the courts. Our Geyser support team is on hand and ready to answer your questions. You can reach out to <a href="mailto:hello@geyser.fund">hello@geyser.fund</a>.  These resources are easily accessible and free.</p>
          <p>If you’re a creator based in the European Union and, after contacting us through those channels, you still don’t feel as if your issue has been resolved, we may agree with you to engage in mediation to resolve any complaints in good faith. You may address your complaint with one of these two mediation organizations:</p>
          <UnorderedList p={2}>
            <ListItem><a href={"https://www.cedr.com/"} target="_blank">The Centre for Effective Dispute Resolution (CEDR)</a></ListItem>
            <ListItem><a href={"https://mediate.co.uk/"} target="_blank">[IPOS Mediation](https://mediate.co.uk/)</a></ListItem>
          </UnorderedList>
          <p>In the unfortunate situation where legal action does arise, these Terms (and all other rules, policies, or guidelines incorporated by reference) will be governed by and construed in accordance with the laws of the State of Wyoming and the United States, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods. You agree that Geyser and its Services are deemed a passive website that does not give rise to jurisdiction over Geyser or its parents, subsidiaries, affiliates, assigns, employees, agents, directors, officers, or shareholders, either specific or general, in any jurisdiction other than the State of Wyoming. You agree that any action at law or in equity arising out of or relating to these Terms, or your use or non-use of Geyser, shall be filed only in the state or federal courts located in the State of Wyoming, and you hereby consent and submit to the personal jurisdiction of these courts for the purposes of litigating any such action. You hereby irrevocably waive any right you may have to trial by jury in any dispute, action, or proceeding.</p>
        </ListItem>
        <ListItem>
          <strong>The Rest</strong>
          <p>These Terms and the other material referenced in them are the entire agreement between you and Geyser with respect to the Services. They supersede all other communications and proposals (whether oral, written, or electronic) between you and Geyser with respect to the Services and govern our future relationship. If any provision of these Terms is found to be invalid under the law, that provision will be limited or eliminated to the minimum extent necessary so that the Terms otherwise will remain in full force and effect and enforceable. The failure of either you or Geyser to exercise any right provided for in these Terms in any way won’t be deemed a waiver of any other rights.</p>
          <p>These Terms are personal to you. You can’t assign them, transfer them, or sublicense them unless you get Geyser’s prior written consent. Geyser has the right to assign, transfer, or delegate any of its rights and obligations under these Terms without your consent. Geyser will provide you notice via email, written notice, or by conspicuously posting the notice on our Site.</p>
        </ListItem>
      </OrderedList>
      </VStack>
      <AppFooter />
    </VStack>
  )
}

export default TermsAndConditions
