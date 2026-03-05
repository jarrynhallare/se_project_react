import './Header.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'

function Header({ setActiveModal }) {
    return (
        <header className="header">
        <img src={logo} className="header__logo" alt="Logo" />
        <p className="header__date-and-location">Date, Location</p>
        <button 
          className="header__add-clothes-btn"
          onClick={() => setActiveModal('add-garment')}
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
        </header>
    )
}

export default Header;