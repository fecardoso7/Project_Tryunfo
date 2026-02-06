import React from "react";
import PropTypes from "prop-types";

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
      hasTrunfo,
    } = this.props;

    return (
      <form className="nebula-form">
        <label htmlFor="cardName" className="form-label">
          NOME DA CARTA
          <input
            id="cardName"
            name="cardName"
            type="text"
            data-testid="name-input"
            value={cardName}
            onChange={onInputChange}
            className="form-input"
          />
        </label>

        <label htmlFor="cardDescription" className="form-label">
          DESCRIÇÃO
          <textarea
            name="cardDescription"
            id="cardDescription"
            data-testid="description-input"
            value={cardDescription}
            onChange={onInputChange}
            className="form-textarea"
          />
        </label>

        <div className="attr-group">
          <label htmlFor="cardAttr1" className="form-label">
            ATTR01
            <input
              name="cardAttr1"
              id="cardAttr1"
              type="number"
              data-testid="attr1-input"
              value={cardAttr1}
              onChange={onInputChange}
              className="form-input-attr"
            />
          </label>
          <label htmlFor="cardAttr2" className="form-label">
            ATTR02
            <input
              name="cardAttr2"
              id="cardAttr2"
              type="number"
              data-testid="attr2-input"
              value={cardAttr2}
              onChange={onInputChange}
              className="form-input-attr"
            />
          </label>
          <label htmlFor="cardAttr3" className="form-label">
            ATTR03
            <input
              name="cardAttr3"
              id="cardAttr3"
              type="number"
              data-testid="attr3-input"
              value={cardAttr3}
              onChange={onInputChange}
              className="form-input-attr"
            />
          </label>
        </div>

        <label htmlFor="cardImage" className="form-label">
          IMAGEM (URL)
          <input
            name="cardImage"
            id="cardImage"
            type="text"
            data-testid="image-input"
            value={cardImage}
            onChange={onInputChange}
            className="form-input"
          />
        </label>

        <label htmlFor="cardRare" className="form-label">
          RARIDADE
          <select
            name="cardRare"
            id="cardRare"
            data-testid="rare-input"
            value={cardRare}
            onChange={onInputChange}
            className="form-select"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        <div className="trunfo-container">
          {hasTrunfo ? (
            <span className="trunfo-alert">
              Você já tem um Super Trunfo em seu baralho
            </span>
          ) : (
            <label htmlFor="cardTrunfo" className="trunfo-checkbox-label">
              <input
                data-testid="trunfo-input"
                type="checkbox"
                name="cardTrunfo"
                id="cardTrunfo"
                checked={cardTrunfo}
                onChange={onInputChange}
              />
              SUPER TRUNFO?
            </label>
          )}
        </div>

        <button
          type="button"
          data-testid="save-button"
          disabled={isSaveButtonDisabled}
          onClick={onSaveButtonClick}
          className="save-button"
        >
          SALVAR
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
