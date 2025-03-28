# Tests


## E2E


### Auth

- [X] Login with nostr
- [X] Logout
- [ ] Login with Facebook
- [ ] Login with Twitter
- [ ] Logout with Google
- [ ] Logout with Github
- [ ] Logout With Lightning

### Funding Flow

#### When invoice mutation fails
- [X] when invoice is higher than limit, should show wallet max error page
- [X] when invoice is lower than limit, should show wallet min error page
- [X] when wallet is unreachable, should show wallet unreachable error page
- [X] when project is inactive, should show project inactive error page
- [X] when reward is unavilable, should show reward outofstock error page
- [X] when server responds with internal server error, should show general error page

#### When invoice is received successfully
- [X] Successfully made donation to Project with lightning Node, with Lightning Invoice payment.
- [X] Successfully made donation to Project with lightning Node, with onChain address.
- [X] Successfully purchased reward from Project with lightning Node, with onChain payment.
- [X] Failed to make donation to Project with lightning Node, with onChain payment, and then refunded the amount.

- [X] Successfully made donation to Project with lightning Address, with Lightning Invoice payment.
- [X] Successfully made donation to Project with lightning Address, with onChain payment.
- [X] Successfully purchased reward from Project with lightning Address, with onChain payment.
- [X] Failed to make donation to Project with lightning Address, with onChain payment, and then refunded the amount.

- [ ] When swap data is not available, onChain tab should be disabled.


### Project Creation

- [ ] Create draft project
- [ ] Throw error When same project name detected
- [ ] Update project links, tags and region
- [ ] Update project story
- [ ] Add project wallet with Lightning address
- [ ] Add project wallet with Lightning node.
- [ ] Save project as Draft.
- [ ] Publish project.

### Project Dashboard
- [ ] Create reward
- [ ] Create goal
- [ ] Create entries
- [ ] Update project details
- [ ] Update project links, tags and region
- [ ] Update project story
- [ ] Update project wallet
- [ ] Update project status - active/inactive