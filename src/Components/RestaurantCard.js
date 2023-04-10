import { IMG_CDN_URL } from "../Constant";
const RestaurantCard = ({cloudinaryImageId, name, cuisines, area, avgRating, lastMileTravelString, costForTwoString}) => {
    function AvgRatingColor(avgRating){
        if(avgRating>=4 && avgRating<5){
            return ({
                backgroundColor: "#48C479",
                color: "#FFFFFF"
            });
        }
        else if(avgRating>=3 && avgRating<4){
            return ({
                backgroundColor: "#DB7C38",
                color: "#FFFFFF"
            });
        }
        else if(avgRating>=2&&avgRating<3){
            return ({
                backgroundColor: "#E1B055",
                color: "#FFFFFF"
            });
        }
        else if(avgRating>=1&&avgRating<2){
            return ({
                backgroundColor: "#E9250B",
                color: "#FFFFFF"
            });
        }
        else if(avgRating === '--'){
            return ({
                backgroundColor: "inherit",
                color: "inherit"
            });
        }
    }
    return(
        <a href="/">
            <div className="card">
                <img alt="restaurant-image" src={IMG_CDN_URL+cloudinaryImageId}></img>
                <h2 className="restaurantName">{name}</h2>
                <h5 className="cuisine">{cuisines.join(", ")}</h5>
                <h5 className="location"><i class="fa-solid fa-location-dot"></i>&nbsp;{area}</h5>
                <span className="rating">
                    <h4 
                    style={AvgRatingColor(avgRating)}
                    className="avgRating">
                        <i className="fa-solid fa-star"></i>
                        &nbsp;{avgRating}
                    </h4>
                    <h5 className="distance"><i class="fa-solid fa-route"></i>&nbsp;{lastMileTravelString}</h5>
                    <h5>{costForTwoString}</h5>
                </span>
            </div>
        </a>
    );
  };
export default RestaurantCard;