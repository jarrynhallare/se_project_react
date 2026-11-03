import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  setActiveModal,
  onSignOut,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar
        onSignOut={onSignOut}
        onEditProfile={() => setActiveModal("edit-profile")}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
        onAddItemClick={() => setActiveModal("add-garment")}
      />
    </section>
  );
}

export default Profile;
