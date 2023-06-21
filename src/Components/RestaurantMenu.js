import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { REST_API_MENU_URL, ICON_CDN_URL_18, LICENSE_CDN_URL } from "../Constant";
import {
  faIndianRupeeSign,
  faCircleHalfStroke,
  faStar,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OfferCard from "./OfferCard";
import MenuCategory from "./MenuCategory";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resDetails, setResDetails] = useState();
  const [resOffers, setResOffers] = useState([]);
  const [resMenu, setResMenu] = useState([]);
  const [resLicense, setResLicense] = useState([]);
  const [resAddress, setResAddress] = useState([]);
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
    const restaurantMenu =
      json?.data?.cards
        ?.find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x?.card?.card)
        .filter(
          (x) =>
            x["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];
    const restaurantLicense =
      json?.data?.cards
        ?.find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x?.card?.card)
        .filter(
          (x) =>
            x["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
        ) || [];
    const restaurantAddress =
      json?.data?.cards
        ?.find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x?.card?.card)
        .filter(
          (x) =>
            x["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
        ) || [];
    setResDetails(restaurantData);
    setResOffers(restaurantOffers);
    setResMenu(restaurantMenu);
    setResLicense(restaurantLicense);
    setResAddress(restaurantAddress);
  }
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
          return <OfferCard {...obj} key={{ ...obj }.offerIds} />;
        })}
      </div>
      <div className="menu">
        {resMenu.map((obj) => {
          return <MenuCategory {...obj} key={{ ...obj }.title} />;
        })}
      </div>
      <div className="res-license">
        {resLicense.map((x) => {
          return(
            <div className="res-license-card">
              <img src={LICENSE_CDN_URL+x.imageId}/>
              <h4>{x.text}</h4>
            </div>
          )
        })}
      </div>
      <div className="res-address">
        {resAddress.map((x) => {
          return(
            <div className="res-address-card">
              <h3>{x.name}</h3>
              <h4>(Outlet : {x.area})</h4>
              <h5><FontAwesomeIcon icon={faLocationDot} />&nbsp;  {x.completeAddress}</h5>
            </div>  
          )
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
