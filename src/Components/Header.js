import FoodVillaLogo from "../Images/Food Villa Logo.png";
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
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/"><i className="fa-solid fa-bag-shopping"></i> Cart</a></li>
          </ul>
        </div>
      </div>
    );
  };
export default Header;