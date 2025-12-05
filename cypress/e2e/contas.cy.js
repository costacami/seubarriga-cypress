/// <reference types="cypress" />

describe('Gestão de Contas - Seu Barriga', () => {
  const timestamp = Date.now();

  const user = {
    nome: `UserContas ${timestamp}`,
    email: `usercontas${timestamp}@teste.com`,
    senha: '123456'
  };

  const conta1 = `Conta 1 ${timestamp}`;
  const conta2 = `Conta 2 ${timestamp}`;
  const conta1Editada = `Conta 1 Editada ${timestamp}`;

  before(() => {
    // Cria usuário específico para os testes de contas
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.contains('Novo usuário?').click();

    cy.get('#nome').type(user.nome);
    cy.get('#email').type(user.email);
    cy.get('#senha').type(user.senha);

    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });

  beforeEach(() => {
    // Faz login antes de CADA teste e volta pra Home
    cy.visit('https://seubarriga.wcaquino.me/login');

    cy.get('#email').type(user.email);
    cy.get('#senha').type(user.senha);

    cy.contains('Entrar').click();
    cy.contains('Home').click(); // garante que o menu está visível
  });

  it('Deve adicionar duas contas com sucesso', () => {
    // Conta 1
    cy.contains('Contas').should('be.visible').click();
    cy.contains('Adicionar').click();

    cy.get('#nome').type(conta1);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso').should('be.visible');

    // Conta 2
    cy.contains('Contas').should('be.visible').click();
    cy.contains('Adicionar').click();

    cy.get('#nome').type(conta2);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso').should('be.visible');
  });

  it('Deve listar as contas cadastradas', () => {
    cy.contains('Contas').should('be.visible').click();
    cy.contains('Listar').click();

    cy.contains(conta1).should('exist');
    cy.contains(conta2).should('exist');
  });

  it('Deve alterar o nome de uma conta', () => {
  cy.contains('Contas').should('be.visible').click();
  cy.contains('Listar').click();

  cy.contains('tr', conta1).within(() => {
    // clica no primeiro link/ícone da coluna Ações (ícone de editar)
    cy.get('a').first().click();
  });

  cy.get('#nome').clear().type(conta1Editada);
  cy.contains('Salvar').click();

  cy.contains('Conta alterada com sucesso').should('be.visible');
  cy.contains(conta1Editada).should('exist');
});


  it('Não deve permitir criar conta com nome já existente', () => {
  cy.contains('Contas').should('be.visible').click();
  cy.contains('Adicionar').click();

  cy.get('#nome').type(conta1Editada);
  cy.contains('Salvar').click();

  // comportamento ESPERADO: não deixa duplicar
  cy.contains('Já existe uma conta com esse nome').should('be.visible');
});
});
