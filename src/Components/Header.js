import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FoodVillaLogo from "../Images/Food Villa Logo.png";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { faUser, faPaperPlane ,faContactCard} from "@fortawesome/free-regular-svg-icons"
const Title = () => (
    <a href="/">
      <img className="logo" src={FoodVillaLogo} alt="Food Villa Logo" />
    </a>
  );
const Header = () => {
    return (
      <div className="header">
        <Title className="Title" />
        <div className="nav-items">
          <ul>
            <li><a href="/"><FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp; Search</a></li>
            <li><a href="/"><FontAwesomeIcon icon={faContactCard} />&nbsp; About</a></li>
            <li><a href="/"><FontAwesomeIcon icon={faPaperPlane} />&nbsp; Contact</a></li>
            <li><a href="/"><FontAwesomeIcon icon={faUser} />&nbsp; Sign In</a></li>
          </ul>
        </div>
      </div>
    );
  };
export default Header;