import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodVillaLogo from "../Images/Food Villa Logo.png";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faPaperPlane,
  faNoteSticky,
  faFontAwesome
} from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import LocationSearch from "./LocationSearch";
import { useDispatch, useSelector } from "react-redux/es/hooks/useSelector";

const Header = () => {
  const cartTotals = 0;
  const locDetails = useSelector(store => store.location.locationDetails);
  [area, setArea] = useState("");
  [cityName, setCityName] = useState("");
  [state, setState] = useState("");
  [locationSearchisVisisble, setLocationSearchisVisisble] = useState(false);
  const handleLocationClick = () => {
    console.log("triggered")
    setLocationSearchisVisisble(!locationSearchisVisisble);
  }
  const handleFocus = () => {
    setLocationSearchisVisisble(true);
    document.addEventListener('mousedown', preventInteraction);
    document.addEventListener('keydown', preventInteraction);
  };

  const handleBlur = () => {
    setLocationSearchisVisisble(false);
    document.removeEventListener('mousedown', preventInteraction);
    document.removeEventListener('keydown', preventInteraction);
  };

  const preventInteraction = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCityName(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails]);
  return (
    <>
    <div>{locationSearchisVisisble && <LocationSearch />}</div>
    <div className={`header flex items-center justify-around z-10 fixed bg-[#ffffffd9] px-5 w-full top-0 left-0 right-0 shadow-[0_15px_40px_-20px_rgba(40,44,63,0.15)] ${locationSearchisVisisble ? "opacityName-50 bg-transparent" : ""}`}>
      <div className="flex gap-2 items-center max-w-xs">
          <Link to="/" className="flex-shrink-0">
            <img className="h-20 transition-transform duration-300 ease-cubic-bezier(.215,.61,.355,1) hover:scale-110" src={FoodVillaLogo} alt="Food Villa Logo" />
          </Link>
          <div className="flex truncate cursor-pointer" onClick={handleLocationClick} onFocus={handleFocus} onBlur={handleBlur}>
            <h2 title={area+", "+cityName+", "+state} className="text-sm tracking-normal text-[#38383a] truncate hover:text-[#7f828f]">{area+", "+cityName+", "+state}</h2>
            <FontAwesomeIcon icon={faChevronDown} className="text-orange"/>
          </div>
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
    </>
  );
};
export default Header;
