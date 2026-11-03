import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";

function SideBar() {
  const avatar = avatarDefault;
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__username">{username}</div>
        {avatar ? (
          <img
            className="sidebar__avatar"
            src={avatar || avatarDefault}
            alt="User Avatar"
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}
        <button
  type="button"
  className="sidebar__edit-button"
  onClick={onEditProfile}
>
  Edit profile
</button>
  <button
        type="button"
        className="sidebar__sign-out"
        onClick={onSignOut}
      >
        Sign out
      </button>
      </div>
    </aside>
    
  );
}

export default SideBar;
