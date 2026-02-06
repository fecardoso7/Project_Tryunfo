import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
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
    } = this.props;

    return (
      <div className="nebula-card-outer">
        <div className="nebula-card-inner">
          <header className="card-header">
            <h2 data-testid="name-card" className="card-name">
              {cardName}
            </h2>
          </header>

          <div className="card-image-container">
            <img
              src={cardImage}
              alt={cardName}
              data-testid="image-card"
              className="card-image"
            />
            {cardTrunfo && (
              <span data-testid="trunfo-card" className="trunfo-badge">
                SUPER TRUNFO
              </span>
            )}
          </div>

          <div className="card-body">
            <p data-testid="description-card" className="card-description">
              {cardDescription}
            </p>

            <div className="card-stats">
              <div className="stat-row">
                <span>ATTR01</span>
                <span data-testid="attr1-card" className="stat-value">
                  {cardAttr1}
                </span>
              </div>
              <div className="stat-row">
                <span>ATTR02</span>
                <span data-testid="attr2-card" className="stat-value">
                  {cardAttr2}
                </span>
              </div>
              <div className="stat-row">
                <span>ATTR03</span>
                <span data-testid="attr3-card" className="stat-value">
                  {cardAttr3}
                </span>
              </div>
            </div>

            <footer className="card-footer">
              <span data-testid="rare-card" className="rare-text">
                {cardRare}
              </span>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
