/// <reference types="Cypress" />

const userSeed = require('../../server/seed/users')

context('User setup', () => {
  beforeEach(() => {
    cy.task('clear:db')
    cy.task('seed:db', userSeed.data)
  })

  it('login user', () => {
    cy.visit('http://localhost:8080/login')

    cy.login('amir@cypress.io', '1234')

    cy.location('pathname').should('eq', '/board')
  })
})
