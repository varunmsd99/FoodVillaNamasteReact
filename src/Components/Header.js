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
    <div className="header flex items-center justify-around z-50 fixed bg-[#ffffffd9] px-5 w-full top-0 left-0 right-0 shadow-[0_15px_40px_-20px_rgba(40,44,63,0.15)]">
      <div className="flex gap-2">
          <Link to="/">
            <img className="h-20 transition-transform duration-300 ease-cubic-bezier(.215,.61,.355,1) hover:scale-110" src={FoodVillaLogo} alt="Food Villa Logo" />
          </Link>
          <input
            type="text"
            className="h-fit my-auto focus:outline-none"
            placeholder="Enter Pincode"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
      </div>
      <div className="nav-items">
        <ul className="flex list-none">
          <li className="transition duration-250 ease-in-out m-3 pl-8 text-[#303031] hover:text-orange">
            <NavLink
              className={({ isActive }) => (isActive ? "text-orange" : "text-inherit")}
              to="/search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              &nbsp; Search
            </NavLink>
          </li>
          <li className="transition duration-250 ease-in-out m-3 pl-8 text-[#303031] hover:text-orange">
            <NavLink
              className={({ isActive }) => (isActive ? "text-orange" : "text-inherit")}
              to="/help"
            >
              <FontAwesomeIcon icon={faFontAwesome} />
              &nbsp; Help
            </NavLink>
          </li>
          <li className="transition duration-250 ease-in-out m-3 pl-8 text-[#303031] hover:text-orange">
            <NavLink
              className={({ isActive }) => (isActive ? "text-orange" : "text-inherit")}
              to="/contact"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              &nbsp; Contact
            </NavLink>
          </li>
          <li className="transition duration-250 ease-in-out m-3 pl-8 text-[#303031] hover:text-orange">
            <NavLink
              className={({ isActive }) => (isActive ? "text-orange" : "text-inherit")}
              to="/profile"
            >
              <FontAwesomeIcon icon={faUser} />
              &nbsp; Sign In
            </NavLink>
          </li>
          <li className="transition duration-250 ease-in-out m-3 pl-8 text-[#303031] hover:text-orange">
            <NavLink
              className={({ isActive }) => (isActive ? "text-orange" : "text-inherit")}
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
