import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = Boolean(
    currentUser?._id && item.likes?.some((id) => id === currentUser._id)
  );

  function handleLike(event) {
    event.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  }

  return (
    <li className="card" onClick={onClick}>
      <h2 className="card__name">{item.name}</h2>

      {currentUser && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
          onClick={handleLike}
        >
          ♥
        </button>
      )}

      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;