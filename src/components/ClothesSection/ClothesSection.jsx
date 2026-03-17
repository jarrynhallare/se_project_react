import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection ( { clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button">+ Add new</button>
      </div>
        <div className="clothes-section__cards">
          {clothingItems
            .map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              );
            })}
        </div>
    </div>
  );
}

export default ClothesSection;