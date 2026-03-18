import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, handleCardClick, setActiveModal }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onAddItemClick={() => setActiveModal('add-garment')}
      />
    </section>
  );
}

export default Profile;
