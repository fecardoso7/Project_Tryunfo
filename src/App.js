import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    cardSalvo: [],
    hasTrunfo: false,
    nameFilter: '',
    rareFilter: 'todas',
    trunfoFilter: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.hButton);
  };

  hButton = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const maxValueCard = 90;
    const totalValue = 210;

    const validation = [
      cardName.length > 0,
      cardDescription.length > 0,
      cardImage.length > 0,
      cardRare.length > 0,
      Number(cardAttr1) >= 0 && Number(cardAttr1) <= maxValueCard,
      Number(cardAttr2) >= 0 && Number(cardAttr2) <= maxValueCard,
      Number(cardAttr3) >= 0 && Number(cardAttr3) <= maxValueCard,
      Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= totalValue,
    ];

    this.setState({
      isSaveButtonDisabled: !validation.every((item) => item),
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    } = this.state;

    const novoCard = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      hasTrunfo: prevState.hasTrunfo || cardTrunfo,
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cardSalvo: [...prevState.cardSalvo, novoCard],
    }));
  };

  cardRemove = (name) => {
    this.setState((prevState) => {
      const filtered = prevState.cardSalvo.filter((card) => card.cardName !== name);
      return {
        cardSalvo: filtered,
        hasTrunfo: filtered.some((card) => card.cardTrunfo),
      };
    });
  };

  render() {
    const {
      cardSalvo,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;

    const filteredCards = cardSalvo.filter((card) => {
      if (trunfoFilter) return card.cardTrunfo;
      const matchName = card.cardName.toLowerCase().includes(nameFilter.toLowerCase());
      const matchRare = rareFilter === 'todas' || card.cardRare === rareFilter;
      return matchName && matchRare;
    });

    return (
      <>
        <h1>Tryunfo</h1>
        <main>
          <Form
            { ...this.state }
            onInputChange={ this.handleChange }
            onSaveButtonClick={ this.handleClick }
          />
          <Card { ...this.state } />
        </main>

        <section className="filters">
          <input
            type="text"
            data-testid="name-filter"
            name="nameFilter"
            disabled={ trunfoFilter }
            onChange={ this.handleChange }
          />
          <select
            data-testid="rare-filter"
            name="rareFilter"
            disabled={ trunfoFilter }
            onChange={ this.handleChange }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
          <label htmlFor="trunfo-filter">
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              name="trunfoFilter"
              id="trunfo-filter"
              onChange={ this.handleChange }
            />
            Super Trunfo
          </label>
        </section>

        <section>
          {filteredCards.map((card) => (
            <div key={ card.cardName }>
              <Card { ...card } />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.cardRemove(card.cardName) }
              >
                Excluir
              </button>
            </div>
          ))}
        </section>
      </>
    );
  }
}

export default App;