# Pokémon TCG 

## Descrição

O Pokémon TCG é uma aplicação web que permite aos usuários consultar a API do Pokémon TCG e criar seus próprios baralhos de cartas. O projeto foi desenvolvido utilizando Angular 16+, TailwindCSS e a biblioteca de UI Infragistics.

## Arquitetura

A arquitetura do projeto segue o padrão de Componentes do Angular, dividido nas seguintes partes principais:

- **Componentes**: Responsáveis por renderizar a interface do usuário e gerenciar a lógica de interação.
  - `PokemonListComponent`: Exibe a lista de todas as cartas disponíveis.
  - `CreateDeckModalComponent`: Modal para criação e edição de baralhos.
  - `PokemonDetailsComponent`: Exibe detalhes de um baralho específico.

- **Serviços**: Responsáveis por fazer chamadas HTTP e fornecer dados para os componentes.
  - `PokemonTcgService`: Serviço que faz a consulta à API do Pokémon TCG.

## Funcionalidades

- **Lista de Baralhos**
  - Visualizar baralhos criados.
  - Criar um novo baralho.
  - Editar um baralho existente.
  - Remover um baralho.
  - Visualizar detalhes de um baralho.

- **Criação de Baralho**
  - Adicionar um nome ao baralho.
  - Inserir cartas no baralho.
  - Respeitar as regras de quantidade mínima e máxima de cartas (24 a 60).
  - Permitir no máximo 4 cartas com o mesmo nome no baralho.
  - Salvar baralho em memória.

- **Detalhes do Baralho**
  - Exibir quantidades de Pokémon e cartas de treinador.
  - Exibir quantidade de tipos únicos de cartas no baralho.
  - Exibir quantidade de cores únicas no baralho.

## Ambiente de Desenvolvimento

### Tecnologias Utilizadas

- **Angular 16+**: Framework front-end usado para desenvolver a aplicação.
- **TailwindCSS**: Biblioteca de CSS para estilização dos componentes.
- **Infragistics UI for Angular**: Biblioteca de componentes de UI para Angular.
- **RxJS**: Biblioteca para programação reativa.
- **TypeScript**: Linguagem de programação usada para desenvolver a aplicação.
- **Node.js & npm**: Ambiente de execução e gerenciador de pacotes.
