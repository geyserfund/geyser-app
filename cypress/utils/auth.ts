import { RouteHandler } from 'cypress/types/net-stubbing'

import { aliasQuery, hasOperationName, interceptGraphql } from './graphql'

export const interceptNostr = (handler: RouteHandler) => {
  return cy.intercept('GET', '/auth/nostr', handler).as('NostrAuth')
}

export const openConnectPopup = () => {
  cy.get('button').contains('Login').click()
  cy.get('p').contains('Connect').should('be.visible')
}

export const getDropdownButton = () =>
  cy.get('button[data-testid="topnavbar-dropdown-menu"]')

export const loginWithNostr = () => {
  openConnectPopup()

  interceptGraphql((req) => {
    aliasQuery(req, 'Me')

    if (hasOperationName(req, 'Me')) {
      req.reply({
        body: {
          data: {
            me: {
              __typename: 'User',
              id: 1,
              email: 'test@geyser.fund',
              username: 'testusername',
              imageUrl:
                'https://storage.googleapis.com/geyser-projects-media/app/logo.png',
              externalAccounts: [],
              contributions: [],
              ownerOf: [],
              entries: [],
              fundingTxs: [],
              projects: [],
              projectFollows: [],
              badges: [],
              isEmailVerified: false,
            },
          },
        },
      })

      return
    }

    req.continue()
  }).as('Graphql')

  cy.get('button').contains('Nostr').click()
}

export const logoutUser = () => {
  getDropdownButton().click()

  cy.get('button').contains('Sign Out').click()

  interceptGraphql((req) => {
    aliasQuery(req, 'Me')

    if (hasOperationName(req, 'Me')) {
      req.reply({
        body: {
          data: {
            me: null,
          },
        },
      })

      return
    }

    req.continue()
  }).as('Graphql')
}
