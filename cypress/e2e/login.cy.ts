import { interceptNostr, openConnectPopup } from '../utils/auth'
import { interceptGraphql } from '../utils/graphql'

describe('Login', () => {
  beforeEach(() => {
    interceptGraphql((req) => {})
    interceptNostr((req) => {
      req.reply({ statusCode: 200 })
    })
    cy.visit('https://staging.geyser.fund')
  })

  it('Should open login popup on landing page', () => {
    openConnectPopup()
  })

  it('Should login with nostr', () => {
    openConnectPopup()

    cy.get('button').contains('Nostr').click()
  })
})
