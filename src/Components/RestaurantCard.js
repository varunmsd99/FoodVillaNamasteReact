import { IMG_CDN_URL, swiggy_api_URL } from "../Constant";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantCard = ({cloudinaryImageId, id, name, cuisines, avgRating, lastMileTravelString, slaString, costForTwoString}) => {
    function isAvgRatingContent(avgRating){
        if(avgRating==='--')
        return false;
        else
        return true;
    }
    function AvgRatingColor(avgRating){
        if(avgRating>=4 && avgRating<5){
            return ({
                backgroundColor: "#48C479",
                color: "#FFFFFF",
                borderRadius: "50%"
            });
        }
        else if(avgRating>=3 && avgRating<4){
            return ({
                backgroundColor: "#DB7C38",
                color: "#FFFFFF",
                borderRadius: "50%"
            });
        }
        else if(avgRating>=2&&avgRating<3){
            return ({
                backgroundColor: "#E1B055",
                color: "#FFFFFF",
                borderRadius: "50%"
            });
        }
        else if(avgRating>=1&&avgRating<2){
            return ({
                backgroundColor: "#E9250B",
                color: "#FFFFFF",
                borderRadius: "50%"
            });
        }
        else if(avgRating === '--'){
            return ({
                backgroundColor: "inherit",
                color: "inherit"
            });
        }
    }
    const [showQuickMenu, setShowQuickMenu] = useState(false);
    const hover = () => setShowQuickMenu(true)
    return(
            <div key={id} className="card">
                {cloudinaryImageId ? (<img src={IMG_CDN_URL+cloudinaryImageId}></img>):(<div className="res-card-img-shimmer" />)}
                <h2 className="restaurantName">{name}</h2>
                <h5 className="cuisine" title={cuisines}>{cuisines?.join(", ")}</h5>
                <span className="rating">
                    {isAvgRatingContent(avgRating)?
                    <div 
                    style={AvgRatingColor(avgRating)}
                    className="avgRatingCard">
                        <FontAwesomeIcon key={id} className="avgRating" icon={faStar} />
                        <h4>&nbsp;{avgRating}&nbsp;</h4>
                    </div>:
                    <div 
                    style={AvgRatingColor(avgRating)}
                    className="avgRatingCard">
                        <h4>&nbsp;{avgRating}&nbsp;</h4>
                    </div>
                    }
                    <p>&nbsp;•&nbsp;</p>
                    <h5 className="distance" title={lastMileTravelString}>&nbsp;{slaString}</h5>
                    <p>&nbsp;•&nbsp;</p>
                    <h5>{costForTwoString}</h5>
                </span>
            </div>
    );
  };

export default RestaurantCard;