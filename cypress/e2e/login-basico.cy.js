/// <reference types="cypress" />

describe('Teste básico', () => {
  it('Deve abrir a página de login', () => {
    cy.visit('https://seubarriga.wcaquino.me/login');

    // garante que o botão "Entrar" está na tela
    cy.contains('button', 'Entrar').should('exist');
  });
});

