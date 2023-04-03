import { IMG_CDN_URL } from "../Constant";
const RestaurantCard = ({cloudinaryImageId, name, cuisines, area, avgRating, lastMileTravelString, costForTwoString}) => {
    return(
        <a href="/">
            <div className="card">
                <img alt="restaurant-image" src={IMG_CDN_URL+cloudinaryImageId}></img>
                <h2>{name}</h2>
                <h5>{cuisines.join(", ")}</h5>
                <h5><i class="fa-solid fa-location-dot"></i>&nbsp;{area}</h5>
                <span className="rating">
                    <h4><i className="fa-solid fa-star"></i>&nbsp;{avgRating}</h4>
                    <h5>{lastMileTravelString}</h5>
                    <h5>{costForTwoString}</h5>
                </span>
            </div>
        </a>
    );
  };
export default RestaurantCard;