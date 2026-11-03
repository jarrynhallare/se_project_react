import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";


function ClothesSection({ clothingItems, handleCardClick, onAddItemClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(item => item.owner === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button" onClick={onAddItemClick}>+ Add new</button>
      </div>
      <div className="clothes-section__cards">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onClick={() => handleCardClick(item)}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ClothesSection;
