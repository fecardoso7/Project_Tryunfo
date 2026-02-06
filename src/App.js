import React from "react";
import Form from "./components/Form";
import Card from "./components/Card";
import "./index.css";

class App extends React.Component {
  state = {
    cardName: "",
    cardDescription: "",
    cardAttr1: "0",
    cardAttr2: "0",
    cardAttr3: "0",
    cardImage: "",
    cardRare: "normal",
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    cardSalvo: [],
    hasTrunfo: false,
    nameFilter: "",
    rareFilter: "todas",
    trunfoFilter: false,
    isGameStarted: false,
    gameDeck: [],
    cardIndex: 0,
  };

  handleChange = ({ target }) => {
    const { name, type, checked, value } = target;
    this.setState(
      { [name]: type === "checkbox" ? checked : value },
      this.hButton,
    );
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
    const maxValue = 90;
    const totalValue = 210;
    const validation = [
      cardName.length > 0,
      cardDescription.length > 0,
      cardImage.length > 0,
      cardRare.length > 0,
      Number(cardAttr1) >= 0 && Number(cardAttr1) <= maxValue,
      Number(cardAttr2) >= 0 && Number(cardAttr2) <= maxValue,
      Number(cardAttr3) >= 0 && Number(cardAttr3) <= maxValue,
      Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= totalValue,
    ];
    this.setState({ isSaveButtonDisabled: !validation.every((item) => item) });
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
      cardSalvo: [...prevState.cardSalvo, novoCard],
      cardName: "",
      cardDescription: "",
      cardAttr1: "0",
      cardAttr2: "0",
      cardAttr3: "0",
      cardImage: "",
      cardRare: "normal",
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: prevState.hasTrunfo || cardTrunfo,
    }));
  };

  cardRemove = (name, isTrunfo) => {
    this.setState((prevState) => ({
      cardSalvo: prevState.cardSalvo.filter((card) => card.cardName !== name),
      hasTrunfo: isTrunfo ? false : prevState.hasTrunfo,
    }));
  };

  startGame = () => {
    const { cardSalvo } = this.state;
    const shuffled = [...cardSalvo].sort(() => Math.random() - 0.5);
    this.setState({ gameDeck: shuffled, cardIndex: 0, isGameStarted: true });
  };

  render() {
    const {
      cardSalvo,
      nameFilter,
      rareFilter,
      trunfoFilter,
      isGameStarted,
      gameDeck,
      cardIndex,
    } = this.state;
    const filteredCards = cardSalvo.filter((card) => {
      if (trunfoFilter) return card.cardTrunfo;
      return (
        card.cardName.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (rareFilter === "todas" || card.cardRare === rareFilter)
      );
    });

    return (
      <div className="app-container">
        <header className="main-header">
          <div className="logo-wrapper">
            <h1 className="main-logo">TRYUNFO</h1>
            <div className="gradient-line" />
          </div>
        </header>

        {!isGameStarted ? (
          <main className="content-wrapper">
            {/* SEÇÃO 1: CRIAÇÃO (Container Branco Figma) */}
            <section className="creation-card-container">
              <div className="form-side">
                <h2 className="section-title">ADICIONE NOVA CARTA</h2>
                <Form
                  {...this.state}
                  onInputChange={this.handleChange}
                  onSaveButtonClick={this.handleClick}
                />
              </div>
              <div className="preview-side">
                <h2 className="section-title">PRÉ-VISUALIZAÇÃO</h2>
                <Card {...this.state} />
              </div>
            </section>

            {/* SEÇÃO 2: BARALHO */}
            <section className="deck-section">
              <h2 className="deck-title">TODAS AS CARTAS</h2>
              <div className="filters-bar">
                <input
                  data-testid="name-filter"
                  name="nameFilter"
                  placeholder="Nome da carta"
                  disabled={trunfoFilter}
                  onChange={this.handleChange}
                />
                <select
                  data-testid="rare-filter"
                  name="rareFilter"
                  disabled={trunfoFilter}
                  onChange={this.handleChange}
                >
                  <option value="todas">Raridade</option>
                  <option value="normal">normal</option>
                  <option value="raro">raro</option>
                  <option value="muito raro">muito raro</option>
                </select>
                <label className="trunfo-filter-label">
                  <input
                    type="checkbox"
                    data-testid="trunfo-filter"
                    name="trunfoFilter"
                    onChange={this.handleChange}
                  />{" "}
                  Super Trunfo
                </label>
                {cardSalvo.length > 0 && (
                  <button className="play-btn" onClick={this.startGame}>
                    JOGAR
                  </button>
                )}
              </div>

              <div className="cards-grid">
                {filteredCards.map((card) => (
                  <div key={card.cardName} className="card-item-wrapper">
                    <Card {...card} />
                    <button
                      type="button"
                      data-testid="delete-button"
                      className="delete-btn"
                      onClick={() =>
                        this.cardRemove(card.cardName, card.cardTrunfo)
                      }
                    >
                      EXCLUIR
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        ) : (
          /* MODO JOGO */
          <section className="game-mode-overlay">
            <div className="game-container">
              <Card {...gameDeck[cardIndex]} />
              <div className="game-info">
                <p>Cartas restantes: {gameDeck.length - cardIndex}</p>
                {cardIndex < gameDeck.length - 1 ? (
                  <button
                    className="next-btn"
                    onClick={() => this.setState({ cardIndex: cardIndex + 1 })}
                  >
                    PRÓXIMA CARTA
                  </button>
                ) : (
                  <button className="next-btn" onClick={this.startGame}>
                    EMBARALHAR E RECOMEÇAR
                  </button>
                )}
                <button
                  className="exit-btn"
                  onClick={() => this.setState({ isGameStarted: false })}
                >
                  SAIR
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default App;
