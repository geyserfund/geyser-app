import {
  getDropdownButton,
  loginWithNostr,
  logoutUser,
  openConnectPopup,
} from '../utils/auth'
import {
  aliasQuery,
  hasOperationName,
  interceptGraphql,
} from '../utils/graphql'

/**
 * THIS IS THE NOSTR EVENT USED FOR TESTING THIS MODULE
  {
    "id": "d0d5289d90e8ffd7ebff068ffd93e1a84b69f1b890a3055d5039b353e73ca46f",
    "pubkey": "217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02",
    // npub1y9avpq5vgjxpu6xzu7qalzvgf09wz6s708lxmun8scc4t2mcnspqrmt40y
    // nsec1smf92mawwjfluyj8neww9xllwyeq88dhu70zuvdyc54mq9hg286ql40vtq
    "created_at": 1688585029,
    "kind": 1,
    "tags": [],
    "content": "hello",
    "sig": "5d097183ae4b599a83f6f78249bc35be58c6d58ce35d0c4ca165a41f980902378437711c288d9f3410741009b8459e65e824f927ca8f8072247de93144fa51fd"
  }
 */

describe('Login', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', (win: any) => {
      win.nostr = {
        signEvent: () => ({
          sig: '5d097183ae4b599a83f6f78249bc35be58c6d58ce35d0c4ca165a41f980902378437711c288d9f3410741009b8459e65e824f927ca8f8072247de93144fa51fd',
        }),
        getPublicKey: () =>
          '217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02',
      }
    })

    cy.intercept('GET', '/auth/nostr', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          event: {
            id: 'd0d5289d90e8ffd7ebff068ffd93e1a84b69f1b890a3055d5039b353e73ca46f',
            pubkey:
              '217ac0828c448c1e68c2e781df89884bcae16a1e79fe6df267863155ab789c02',
            // eslint-disable-next-line camelcase
            created_at: 1688585029,
            kind: 1,
            tags: [],
            content: 'hello',
          },
        },
      })
    }).as('NostrAuth')

    cy.intercept(
      'GET',
      'auth/nostr?token=eyJzaWciOiI1ZDA5NzE4M2FlNGI1OTlhODNmNmY3ODI0OWJjMzViZTU4YzZkNThjZTM1ZDBjNGNhMTY1YTQxZjk4MDkwMjM3ODQzNzcxMWMyODhkOWYzNDEwNzQxMDA5Yjg0NTllNjVlODI0ZjkyN2NhOGY4MDcyMjQ3ZGU5MzE0NGZhNTFmZCJ9',
      (req) => {
        req.reply({
          statusCode: 200,
        })
      },
    ).as('NostrAuthToken')

    cy.visit('https://staging.geyser.fund')
  })

  it('Should open login popup on landing page', () => {
    openConnectPopup()
  })

  it('Should login with nostr', () => {
    getDropdownButton().find('img').should('not.exist')

    loginWithNostr()

    getDropdownButton().find('img').should('exist')
  })

  it('Should login and logout', () => {
    loginWithNostr()

    getDropdownButton().find('img').should('exist')

    logoutUser()

    getDropdownButton().find('img').should('not.exist')
  })
})
