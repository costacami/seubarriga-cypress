/// <reference types="cypress" />
describe('Teste básico', () => {
  it('Deve abrir a página', () => {
    cy.visit('https://seubarriga.wcaquino.me/login');

    cy.contains('Login').should('exist');
  });
});
