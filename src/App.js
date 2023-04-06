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

    }), this.verifyFields);
  };

  verifyFields = () => {
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

    const formComplete = validation.every((elem) => elem === true);

    this.setState({
      isSaveButtonDisabled: !formComplete,
    });
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
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
      cardTrunfo: false,
      hasTrunfo: prevState.cardTrunfo,
      isSaveButtonDisabled: true,
      cardSalvo: [...prevState.cardSalvo, newCard],
    }));
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
            hasTrunfo={ state.hasTrunfo }
            onInputChange={ this.handleChange }
            isSaveButtonDisabled={ state.isSaveButtonDisabled }
            onSaveButtonClick={ this.onSaveButtonClick }
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
      </>
    );
  }
}

export default App;
