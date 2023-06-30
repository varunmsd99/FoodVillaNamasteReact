import FoodVillaTempImg from "../Images/FoodVillaTempLandingPage.png";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <img src={FoodVillaTempImg}/>
      <h1 className="heading">We're Cooking Something Delicious!</h1>
      <p className="message">Our website is currently under construction. Come back soon to experience the taste of perfection.</p>
      <div className="button-wrapper">
        <a href="/" className="button">Go Back to Homepage</a>
      </div>
    </div>
  );
};

export default LandingPage;
