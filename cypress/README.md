Automação do Seu Barriga (Cypress)

Este repositório foi criado para o desafio de automação utilizando a plataforma Seu Barriga.
Aqui eu automatizei o fluxo de gestão de movimentações, passando por:

criação de usuário

login

criação e edição de contas

criação de movimentações

validações de erros

uso do resumo mensal

exclusão de movimentações

logout

Meu objetivo com este projeto foi aprender na prática, aplicar meus estudos em Cypress e mostrar minha organização e entendimento de testes end-to-end.

--Tecnologias usadas

Node.js

Cypress (E2E)

JavaScript

Usei apenas o essencial para manter o projeto simples e funcional.

--Estrutura do projeto
cypress/
 ├─ e2e/
 │   ├─ auth.cy.js              → testes de login e criação de usuário
 │   ├─ contas.cy.js            → testes de criação, edição e validação de contas
 │   └─ movimentacoes.cy.js     → testes de movimentações e resumo mensal
 ├─ fixtures/                   → (não usado, mas deixei para estrutura padrão do Cypress)
 └─ support/
      ├─ e2e.js                 → configurações globais
      └─ commands.js            → espaço reservado para comandos customizados
cypress.config.js
package.json
README.md

--Como rodar o projeto

Baixe o repositório ou faça o clone:

git clone https://github.com/seu-usuario/seubarriga-cypress.git


Entre na pasta:

cd seubarriga-cypress


Instale as dependências:

npm install


Abra o Cypress:

npx cypress open


Escolha o modo E2E e execute os testes.

--Observação pessoal

Esse desafio foi uma oportunidade para eu praticar automação de testes de ponta a ponta e entender melhor como estruturar testes de forma organizada.
Procurei escrever cenários claros, pensando no uso real da aplicação e também criando fluxos alternativos para validar comportamentos inesperados.