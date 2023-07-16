import React, {FC} from 'react';
import {Link} from "react-router-dom";
import CardMenu from "modules/Dashboard/components/Recent/CardMenu";

// TODO: Type for card
interface ICardsBlock {
  title: string,
  cards: Array<any>
}

const CardsBlock: FC<ICardsBlock> = (props) => {
  const {title, cards} = props;

  return (
    <div className="cards-block__container">
      <h3>{title}</h3>

      <div className="cards-block__list">
        {cards.map((card, i) => (
          <Link to={`/p/${card.name}`} className="cards-block__card">
            <header className="card__header">
              <h4>{card.name}</h4>
              <CardMenu />
            </header>
            <footer className="card__footer">
              <time>{card.lastUpdate}</time>
            </footer>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardsBlock;
