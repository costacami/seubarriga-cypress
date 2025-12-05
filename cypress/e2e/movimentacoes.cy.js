/// <reference types="cypress" />

describe('Gestão de Movimentações - Seu Barriga', () => {
  const timestamp = Date.now();

  const user = {
    nome: `UserMov ${timestamp}`,
    email: `usermov${timestamp}@teste.com`,
    senha: '123456'
  };

  const conta1 = `Conta Mov 1 ${timestamp}`;
  const conta2 = `Conta Mov 2 ${timestamp}`;

  const datas = {
    mes1: '01/01/2024',
    mes2: '01/02/2024'
  };

  
  function criarMovimentacao({
    tipo,
    dataMov,
    dataPag,
    descricao,
    interessado,
    valor,
    conta,
    situacao
  }) {
    cy.contains('Criar Movimentação').click();

    cy.get('#tipo').select(tipo); // 'Receita' ou 'Despesa'
    cy.get('#data_transacao').clear().type(dataMov);
    cy.get('#data_pagamento').clear().type(dataPag);
    cy.get('#descricao').clear().type(descricao);
    cy.get('#interessado').clear().type(interessado);
    cy.get('#valor').clear().type(valor);
    cy.get('#conta').select(conta);

    // Situação: 'Paga' ou 'Pendente'
    cy.contains('label', situacao).click();

    cy.contains('Salvar').click();
    cy.contains('Movimentação adicionada com sucesso').should('be.visible');
  }

  before(() => {
    // Cria usuário específico para os testes de movimentação
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.contains('Novo usuário?').click();

    cy.get('#nome').type(user.nome);
    cy.get('#email').type(user.email);
    cy.get('#senha').type(user.senha);

    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');

    // Faz login para criar as contas
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.get('#email').type(user.email);
    cy.get('#senha').type(user.senha);
    cy.contains('Entrar').click();

    // Cria conta 1
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(conta1);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso').should('be.visible');

    // Cria conta 2
    cy.contains('Contas').click();
    cy.contains('Adicionar').click();
    cy.get('#nome').type(conta2);
    cy.contains('Salvar').click();
    cy.contains('Conta adicionada com sucesso').should('be.visible');
  });

  beforeEach(() => {
    // Login antes de cada teste
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.get('#email').type(user.email);
    cy.get('#senha').type(user.senha);
    cy.contains('Entrar').click();
    cy.contains('Home').click();
  });

  it('Deve criar movimentações de Receita e Despesa para duas contas, situações e meses diferentes', () => {
    // 1) Receita - Conta 1 - Paga - mês 1
    criarMovimentacao({
      tipo: 'Receita',
      dataMov: datas.mes1,
      dataPag: datas.mes1,
      descricao: 'Salário conta 1',
      interessado: 'Empresa X',
      valor: '5000',
      conta: conta1,
      situacao: 'Paga'
    });

    // 2) Despesa - Conta 1 - Pendente - mês 2
    criarMovimentacao({
      tipo: 'Despesa',
      dataMov: datas.mes2,
      dataPag: datas.mes2,
      descricao: 'Aluguel conta 1',
      interessado: 'Imobiliária',
      valor: '2000',
      conta: conta1,
      situacao: 'Pendente'
    });

    // 3) Receita - Conta 2 - Pendente - mês 1
    criarMovimentacao({
      tipo: 'Receita',
      dataMov: datas.mes1,
      dataPag: datas.mes1,
      descricao: 'Freelancer conta 2',
      interessado: 'Cliente Y',
      valor: '1500',
      conta: conta2,
      situacao: 'Pendente'
    });

    // 4) Despesa - Conta 2 - Paga - mês 2
    criarMovimentacao({
      tipo: 'Despesa',
      dataMov: datas.mes2,
      dataPag: datas.mes2,
      descricao: 'Cartão de crédito conta 2',
      interessado: 'Banco Z',
      valor: '800',
      conta: conta2,
      situacao: 'Paga'
    });
  });

  it('Não deve permitir criar movimentação com data inválida', () => {
    cy.contains('Criar Movimentação').click();

    cy.get('#tipo').select('Receita');
    cy.get('#data_transacao').clear().type('32/13/2024'); // data impossível
    cy.get('#data_pagamento').clear().type('32/13/2024');
    cy.get('#descricao').type('Teste data inválida');
    cy.get('#interessado').type('Teste');
    cy.get('#valor').type('100');
    cy.get('#conta').select(conta1);
    cy.contains('label', 'Paga').click();

    cy.contains('Salvar').click();

    
    cy.contains('Data da Movimentação inválida').should('exist');
  });

  it('Não deve permitir criar movimentação com valor inválido', () => {
    cy.contains('Criar Movimentação').click();

    cy.get('#tipo').select('Receita');
    cy.get('#data_transacao').clear().type(datas.mes1);
    cy.get('#data_pagamento').clear().type(datas.mes1);
    cy.get('#descricao').type('Teste valor inválido');
    cy.get('#interessado').type('Teste');

    cy.get('#valor').clear().type('abc'); // valor inválido
    cy.get('#conta').select(conta1);
    cy.contains('label', 'Paga').click();

    cy.contains('Salvar').click();

    
    cy.contains('Valor deve ser um número').should('exist');
  });

  it('Deve filtrar movimentações no Resumo Mensal e excluir uma', () => {
    cy.contains('Resumo Mensal').click();

        cy.get('#mes').select('Janeiro');   
    cy.get('#ano').select('2024');      
    cy.contains('Buscar').click();

   
    cy.contains('Salário conta 1').should('exist');

    
    cy.contains('tr', 'Salário conta 1').within(() => {
      cy.get('a').last().click();
    });

    cy.contains('Movimentação removida com sucesso').should('be.visible');
  });

  it('Deve deslogar do sistema', () => {
    cy.contains('Sair').click();
    cy.contains('Login').should('be.visible');
  });
});
