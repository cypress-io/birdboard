/// <reference types="Cypress" />

const userSeed = require('../../server/seed/users')

context('BirdBoard', () => {
  beforeEach(() => {
    // Prepare database
    cy.task('clear:db')
    cy.task('seed:db', userSeed.data)

    // Visit Login page
    cy.visit('http://localhost:8080/login')

    // Login to account
    cy.login('amir@cypress.io', '1234')
  })

  it('load tweets for selected hashtags', () => {
    cy.server()

    // Fixture is stored in cypress/fixtures/tweets.json
    cy.route('GET', '/tweets*', 'fixture:tweets')
      .as('tweets')

    cy.get('#hashtags')
      .type('javascript{enter}')
      .type('cypressio{enter}')

    cy.window().then(win => {
      cy.wait('@tweets')
        .its('response.body.tweets')
        .should('have.length', win.app.$store.state.tweets.length)
    })
  })
})
