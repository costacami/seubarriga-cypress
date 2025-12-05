/// <reference types="cypress" />

describe('Autenticação - Seu Barriga', () => {
  it('Deve criar um novo usuário com sucesso', () => {
    //  Acessa a página de login
    cy.visit('https://seubarriga.wcaquino.me/login');

    //  Clica no link "Novo usuário?"
    cy.contains('a', 'Novo usuário?').click();

    //  Preenche o formulário de cadastro
    const timestamp = Date.now(); 
    const nome = `Usuário Teste ${timestamp}`;
    const email = `usuario${timestamp}@teste.com`;
    const senha = '123456';

    cy.get('#nome').type(nome);
    cy.get('#email').type(email);
    cy.get('#senha').type(senha);

    //  Clica em Cadastrar
    cy.contains('input[type=submit], button', 'Cadastrar').click();

    //  Valida mensagem de sucesso
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });
});

it('Não deve permitir login com usuário não cadastrado', () => {
  cy.visit('https://seubarriga.wcaquino.me/login');

  cy.get('#email').type('naoexiste@teste.com');
  cy.get('#senha').type('senhaerrada');

  cy.contains('button', 'Entrar').click();

  cy.contains('Problemas com o login do usuário').should('be.visible');
});

it('Deve realizar login com sucesso', () => {
  const timestamp = Date.now();
  const nome = `Usuario Login ${timestamp}`;
  const email = `login${timestamp}@teste.com`;
  const senha = '123456';

  // Cadastra o usuário
  cy.visit('https://seubarriga.wcaquino.me/login');
  cy.contains('Novo usuário?').click();

  cy.get('#nome').type(nome);
  cy.get('#email').type(email);
  cy.get('#senha').type(senha);

  cy.contains('Cadastrar').click();
  cy.contains('Usuário inserido com sucesso').should('be.visible');

  // Agora tenta logar
  cy.visit('https://seubarriga.wcaquino.me/login');

  cy.get('#email').type(email);
  cy.get('#senha').type(senha);
  cy.contains('Entrar').click();

  // Valida login bem-sucedido
  cy.contains('Contas').should('be.visible');

});
