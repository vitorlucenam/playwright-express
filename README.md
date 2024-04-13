#  🎭 PlaywrightExpress

Projeto desenvolvido  durante o curso de PlaywrightExpress da QAx.
O Projeto tem como objetivo mostrar as principais funciondalidade do playwright bem como mostrar os fundamento de desenvolvimento de uma automação.

## Funcionalidades

Foram realizadas a automações nos seguintes fluxos:

Home:
- Webapp deve estar online

Cadastro de task
- Cadastrar uma nova tarefa
- Não deve permitir cadastrar tarefa repetida
- Não deve permitir criar tarefa vazia

Atualização de status de uma task
- Deve conseguir concluir uma tarefa

Exclusão de uma task
- Deve conseguir excluir uma tarefa

## Tecnologias Utilizadas

- TypeScript
- Playwright

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js
- npm ou yarn

## Configuração do Ambiente

Siga estes passos para configurar seu ambiente de desenvolvimento:

```bash
# Clone o repositório
git clone git@github.com:vitorlucenam/playwright-express.git
cd playwright-express

# Instale as dependências
npm install

# Configure variáveis de ambiente (se necessário)
cp .env.example .env
