import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodVillaLogo from "../Images/Food Villa Logo.png";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faPaperPlane,
  faNoteSticky,
  faFontAwesome,
} from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { GET_LOCATION_API_URL, apiKey } from "../Helpers/Constant";

const Header = () => {
  const cartTotals = 0;
  [searchText, setSearchText] = useState("");
  async function getLocation() {
    const data = await fetch(GET_LOCATION_API_URL+searchText, 
      {
        method: 'GET',
	      headers: {
		      'X-RapidAPI-Key': `${apiKey}`,
		      'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
	      },
    })
    const json = await data.json();
    console.log(json[0])
  }
  const handleSubmit = () => {
    getLocation()
    console.log(GET_LOCATION_API_URL+searchText)
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className="header">
      <div className="Title">
          <Link to="/">
            <img className="logo" src={FoodVillaLogo} alt="Food Villa Logo" />
          </Link>
          <input
            type="text"
            className="search-location"
            placeholder="Enter Pincode"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to="/search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              &nbsp; Search
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to="/help"
            >
              <FontAwesomeIcon icon={faFontAwesome} />
              &nbsp; Help
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to="/contact"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              &nbsp; Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to="/profile"
            >
              <FontAwesomeIcon icon={faUser} />
              &nbsp; Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to="/cart"
            >
              <FontAwesomeIcon icon={faNoteSticky} />
              &nbsp; Cart {cartTotals === 0 ? null : cartTotals}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
