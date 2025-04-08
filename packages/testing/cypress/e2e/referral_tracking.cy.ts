describe('Referral Hero ID Tracking', () => {
  const REFERRAL_KEY = 'referringHeroId'
  const TEST_PROJECT_SLUG = 'geyser' // Example project slug - PLEASE UPDATE
  const CONTRIBUTION_AMOUNT_SATS = 1000 // Example contribution

  beforeEach(() => {
    // Clear sessionStorage before each test to ensure isolation
    cy.window().then((win) => {
      win.sessionStorage.removeItem(REFERRAL_KEY)
    })
    // Intercept the contribution create mutation before each relevant test
    cy.intercept('POST', '/graphql', (req) => {
      // Check if the request body contains the operationName for contribution creation
      // Adjust 'contributionCreate' if your actual operation name is different
      if (req.body.operationName === 'contributionCreate') {
        req.alias = 'contributionCreateMutation'
      }
    }).as('graphqlIntercept') // Give the interceptor a base alias
  })

  it('should capture the first heroId from URL parameter into sessionStorage', () => {
    const heroId = `test-hero-${Date.now()}`
    cy.visit(`/project/${TEST_PROJECT_SLUG}?hero=${heroId}`)

    // Assert sessionStorage has the correct value
    cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('eq', heroId)
  })

  it('should NOT overwrite the existing heroId if navigating with a new one in the same session', () => {
    const firstHeroId = `first-${Date.now()}`
    const secondHeroId = `second-${Date.now()}`

    // Visit with the first heroId
    cy.visit(`/project/${TEST_PROJECT_SLUG}?hero=${firstHeroId}`)
    cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('eq', firstHeroId)

    // Navigate to another page (or same page) with a different heroId
    cy.visit(`/project/${TEST_PROJECT_SLUG}/about?hero=${secondHeroId}`) // Example navigation

    // Assert sessionStorage STILL has the FIRST value (Capture First approach)
    cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('eq', firstHeroId)
  })

  it('should NOT store a heroId if the URL parameter is absent', () => {
    cy.visit(`/project/${TEST_PROJECT_SLUG}`)

    // Assert sessionStorage does not contain the key or it's null
    cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('be.null')
  })

  // Test for session clearing is implicitly handled by beforeEach

  context('Contribution Flow with Referral ID', () => {
    // Define contribution steps based on likely actions from funding.ts helpers
    const performContributionSteps = () => {
      // These selectors/actions are educated guesses based on funding.ts
      // PLEASE VERIFY AND UPDATE these with your actual implementation / data-cy attributes
      cy.get('[data-cy=project-contribute-button]').should('be.visible').click() // Or similar button to start funding
      cy.get('[data-cy=funding-amount-input]').should('be.visible').type(`${CONTRIBUTION_AMOUNT_SATS}`)
      cy.get('[data-cy=funding-checkout-button]').should('be.visible').click() // Or next step button
      // Skip comment/email screen for simplicity or add steps if mandatory
      cy.get('[data-cy=funding-comment-next-button]').should('be.visible').click() // Or final checkout button
      // Payment screen is shown - we don't need to pay, just trigger the mutation
    }

    it('should include the captured referringHeroId in the contributionCreate mutation', () => {
      const heroId = `contribution-referrer-${Date.now()}`

      cy.visit(`/project/${TEST_PROJECT_SLUG}?hero=${heroId}`)
      cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('eq', heroId)

      performContributionSteps()

      // Wait specifically for the aliased mutation
      cy.wait('@contributionCreateMutation').then((interception) => {
        // Add detailed logging for debugging
        cy.log('Intercepted contributionCreate mutation:', interception)
        expect(interception.request.body.variables.input.ambassadorHeroId).to.equal(heroId)
      })
    })

    it('should send null or undefined for ambassadorHeroId when no referral ID was captured', () => {
      cy.visit(`/project/${TEST_PROJECT_SLUG}`)
      cy.window().its('sessionStorage').invoke('getItem', REFERRAL_KEY).should('be.null')

      performContributionSteps()

      // Wait specifically for the aliased mutation
      cy.wait('@contributionCreateMutation').then((interception) => {
        cy.log('Intercepted contributionCreate mutation (no referral):', interception)
        // Assert that the ambassadorHeroId is either null or not present
        expect(interception.request.body.variables.input.ambassadorHeroId).to.be.oneOf([null, undefined])
      })
    })
  })
})
