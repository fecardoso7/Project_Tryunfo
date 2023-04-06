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
  };

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState(() => ({
      [name]: value,

    }), this.hButton);
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

    const completeSec = validation.every((item) => item === true);

    this.setState({
      isSaveButtonDisabled: !completeSec,
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
      hasTrunfo: prevState.hasTrunfo === true ? true : prevState.cardTrunfo,
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cardSalvo: [...prevState.cardSalvo, novoCard],
    }));
  };

  cardRemove = (event, index) => {
    event.preventDefault();
    const { cardSalvo } = this.state;
    cardSalvo.splice(index, 1);

    this.setState({
      cardSalvo: cardSalvo.splice(index, 1),
      hasTrunfo: cardSalvo.some(({ cardTrunfo }) => cardTrunfo === true),
    });
  };

  render() {
    const { state } = this;
    return (
      <>
        <h1>Tryunfo</h1>
        <main>
          <Form
            cardName={ state.cardName }
            cardDescription={ state.cardDescription }
            cardAttr1={ state.cardAttr1 }
            cardAttr2={ state.cardAttr2 }
            cardAttr3={ state.cardAttr3 }
            cardImage={ state.cardImage }
            cardRare={ state.cardRare }
            cardTrunfo={ state.cardTrunfo }
            onInputChange={ this.handleChange }
            isSaveButtonDisabled={ state.isSaveButtonDisabled }
            onSaveButtonClick={ (event) => this.handleClick(event) }
            hasTrunfo={ state.hasTrunfo }
          />
          <Card
            cardName={ state.cardName }
            cardDescription={ state.cardDescription }
            cardAttr1={ state.cardAttr1 }
            cardAttr2={ state.cardAttr2 }
            cardAttr3={ state.cardAttr3 }
            cardImage={ state.cardImage }
            cardRare={ state.cardRare }
            cardTrunfo={ state.cardTrunfo }
          />
        </main>
        <section>
          {
            state.cardSalvo
              .map((card, index) => (
                <div key={ index }>
                  <Card
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <button
                    data-testid="delete-button"
                    onClick={ (event) => this.cardRemove(event, index) }
                  >
                    Excluir
                  </button>
                </div>
              ))
          }
        </section>
      </>
    );
  }
}

export default App;
