import Logo from "../../assets/Logo/InStock-Logo.svg";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/warehouses">
          <img className="header__logo" src={Logo} alt="instock logo" />
        </Link>
        <div className="header__links">
          <NavLink className="header__links-anchor" to="/warehouses">
            <p className="header__links header__links--p">Warehouses</p>
          </NavLink>
          <NavLink className="header__links-anchor" to="/inventories">
            <p className="header__links header__links--p">Inventory</p>
          </NavLink>
        </div>
      </div>
      <div className="header__margin"></div>
    </header>
  );
}

export default Header;
