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
               <span className= "sidebar__avatar sidebar__avatar_none">
                {username?.toUpperCase().charAt(0) || ""}
               </span>
            )}
          </div>
    </aside>
  );
}

export default SideBar;