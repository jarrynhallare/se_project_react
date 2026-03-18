import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, onAddItemClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button" onClick={onAddItemClick}>+ Add new</button>
      </div>
      <div className="clothes-section__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
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
