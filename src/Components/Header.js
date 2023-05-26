import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodVillaLogo from "../Images/Food Villa Logo.png";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { faUser, faPaperPlane, faNoteSticky, faFontAwesome } from "@fortawesome/free-regular-svg-icons"
import { Link, NavLink } from "react-router-dom";
const Title = () => (
    <Link to="/">
      <img className="logo" src={FoodVillaLogo} alt="Food Villa Logo" />
    </Link>
  );
const Header = () => {
  const cartTotals=0;
    return (
      <div className="header">
        <Title className="Title" />
        <div className="nav-items">
          <ul>
            <li><NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp; Search</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/help"><FontAwesomeIcon icon={faFontAwesome} />&nbsp; Help</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/contact"><FontAwesomeIcon icon={faPaperPlane} />&nbsp; Contact</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/user"><FontAwesomeIcon icon={faUser} />&nbsp; Sign In</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to="/cart"><FontAwesomeIcon icon={faNoteSticky} />&nbsp; Cart {(cartTotals===0?null:cartTotals)}</NavLink></li>
          </ul>
        </div>
      </div>
    );
  };
export default Header;