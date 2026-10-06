import { ProjectCreationWalletConnectionForm } from '../../forms/ProjectCreationWalletConnectionForm.tsx'
import { ProjectCreationLayoutDesktop, ProjectCreationLayoutMain } from './layouts/ProjectCreationLayout.tsx'
import { ProjectCreation } from './ProjectCreation.tsx'
import { DeprecatedProjectCreation } from './views/DeprecatedProjectCreation.tsx'
import { LaunchFundingGoal } from './views/fundingStrategy/LaunchFundingGoal.tsx'
import { LaunchFundingStrategy } from './views/fundingStrategy/LaunchFundingStrategy.tsx'
import { Launch } from './views/launch/Launch.tsx'
import { LaunchAboutYou } from './views/LaunchAboutYou.tsx'
import { LaunchPayment } from './views/LaunchPayment.tsx'
import { LaunchProducts } from './views/LaunchProducts.tsx'
import { LaunchProjectDetails } from './views/LaunchProjectDetails.tsx'
import { LaunchStory } from './views/LaunchStory.tsx'

export {
  DeprecatedProjectCreation,
  Launch,
  LaunchAboutYou,
  LaunchFundingGoal,
  LaunchFundingStrategy,
  LaunchPayment,
  LaunchProducts,
  LaunchProjectDetails,
  LaunchStory,
  ProjectCreation as ProjectCreationContainer,
  ProjectCreationLayoutDesktop as ProjectCreationContainerContentDesktop,
  ProjectCreationLayoutMain as ProjectCreationContentMain,
  ProjectCreationWalletConnectionForm,
}
