import React, {FC} from 'react';

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
          <p>{card.name}</p>
        ))}
      </div>
    </div>
  );
}

export default CardsBlock;
