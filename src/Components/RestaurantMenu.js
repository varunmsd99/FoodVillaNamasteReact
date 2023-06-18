import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { REST_API_MENU_URL, ICON_CDN_URL_18 } from "../Constant";
import { faIndianRupeeSign, faCircleHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OfferCard from "./OfferCard";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resDetails, setResDetails] = useState();
  const [resOffers, setResOffers] = useState([]);
  const [resMenu, setResMenu] = useState([]);
  useEffect(() => {
    getRestaurantMenu();
  }, []);
  async function getRestaurantMenu() {
    const data = await fetch(REST_API_MENU_URL + id);
    const json = await data.json();
    const restaurantData =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )?.card?.info || null;
    const restaurantOffers =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
        )
        ?.card?.gridElements?.infoWithStyle?.offers.map((x) => x?.info) || [];
    // const offers = [];
    // restaurantOffers.forEach(obj => {
    //   offers.push({...obj.info});
    // });
    console.log(restaurantOffers);
    setResDetails(restaurantData);
    setResOffers(restaurantOffers);
  }
  console.log(
    resOffers.map((obj) => {
      return obj.offerTag;
    })
  );
  return (
    <div className="restaurant-menu-page">
      <div className="res-details">
        <div className="res-title">
          <h1>{resDetails?.name}</h1>
          <h3>{resDetails?.cuisines.join(" ,")}</h3>
          {resDetails?.sla?.lastMileTravelString ? (
            <h3>
              {resDetails?.areaName}, {resDetails?.sla?.lastMileTravelString}
            </h3>
          ) : (
            <h3>{resDetails?.areaName}</h3>
          )}
        </div>
        <div className="res-rating">
          <h2>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> &nbsp;
            {resDetails?.avgRatingString}
          </h2>
          <h4>{resDetails?.totalRatingsString}</h4>
        </div>
      </div>
      {resDetails?.feeDetails?.message ? (
        <div className="extra-fee">
          <h4>
            <img src={ICON_CDN_URL_18 + resDetails?.feeDetails?.icon} />{" "}
            {resDetails?.feeDetails?.message}
          </h4>
        </div>
      ) : (
        <></>
      )}
      <div className="res-dist-cost">
        {resDetails?.sla?.slaString ? (
          <h2>
            <FontAwesomeIcon icon={faCircleHalfStroke}></FontAwesomeIcon> &nbsp;
            {resDetails?.sla?.slaString}
          </h2>
        ) : (
          <></>
        )}
        {resDetails?.costForTwoMessage ? (
          <h2 className="rupee-svg">
            <FontAwesomeIcon icon={faIndianRupeeSign}></FontAwesomeIcon> &nbsp;
            {resDetails?.costForTwoMessage}
          </h2>
        ) : (
          <></>
        )}
      </div>
      <div className="offers">
        {resOffers.map((obj) => {
              return (
                <OfferCard {...obj} key={{...obj}.header}/>
              );
            })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
