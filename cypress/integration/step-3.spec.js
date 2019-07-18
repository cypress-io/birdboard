/// <reference types="Cypress" />


context('User setup', () => {
  beforeEach(() => {
    cy.task('clear:db')
  })

  it('signup and login user', () => {
    cy.visit('http://localhost:8080/signup')

    cy.get('input[name="email"]').type('amir@cypress.io')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="confirm-password"]').type('1234')
    cy.get('#signup-button').click()

    cy.location('pathname').should('eq', '/login')

    cy.login('amir@cypress.io', '1234')

    cy.location('pathname').should('eq', '/board')
  })
})
