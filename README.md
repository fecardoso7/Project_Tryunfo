# Tryunfo Project 🃏

O **Tryunfo** é uma aplicação desenvolvida em **React.js** que permite aos usuários criar, gerenciar e filtrar seu próprio baralho de cartas personalizado. O projeto foca no gerenciamento de estados complexos, validação de formulários e manipulação dinâmica de listas.

## 🚀 Funcionalidades

### 🃏 Criação de Cartas

* **Validação em Tempo Real**: O botão de salvar permanece desabilitado até que todos os campos (nome, descrição, imagem, raridade) sejam preenchidos e os atributos técnicos respeitem os limites (máximo de 90 por atributo e soma total de 210).
* **Preview Instantâneo**: À medida que o usuário preenche o formulário, uma prévia da carta é renderizada em tempo real.

### 🗃️ Gestão do Deck

* **Super Trunfo**: Lógica exclusiva que permite apenas uma carta especial "Super Trunfo" por baralho. Caso o usuário já possua uma, a opção é automaticamente ocultada no formulário.
* **Exclusão de Cartas**: Interface para remover cartas do deck, com atualização automática da lógica de Super Trunfo caso a carta removida seja a especial.

### 🔍 Filtros Avançados

* **Busca por Nome**: Filtro textual que atualiza a lista conforme a digitação.
* **Filtro por Raridade**: Seleção categórica para visualizar apenas cartas de um determinado nível.
* **Filtro Super Trunfo**: Uma busca exclusiva que isola a carta trunfo e desabilita os demais filtros para facilitar a localização.

---

## 🛠️ Tecnologias e Conceitos

* **React Context & State**: Gerenciamento de estado robusto para garantir fluidez na UI.
* **Conditional Rendering**: Exibição de elementos baseada em regras de negócio complexas.
* **Imutabilidade de Dados**: Uso de métodos como `.filter()` e `.some()` para manipulação de arrays sem efeitos colaterais.
* **PropTypes**: Documentação e validação de props para garantir estabilidade entre componentes.

---

## ⚙️ Como executar localmente

1. **Clone o repositório**:
```bash
git clone https://github.com/fecardoso7/Project_Tryunfo

```


2. **Instale as dependências**:
```bash
npm install

```


3. **Inicie o projeto**:
```bash
npm start

```


4. Acesse `http://localhost:3000` para visualizar a aplicação.

---