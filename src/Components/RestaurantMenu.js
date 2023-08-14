import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  REST_API_MENU_URL,
  ICON_CDN_URL_18,
  LICENSE_CDN_URL,
} from "../Helpers/Constant";
import {
  faIndianRupeeSign,
  faCircleHalfStroke,
  faStar,
  faLocationDot,
  faSearch,
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
  const city = "Vizag";
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
    <div className="min-h-screen max-w-[60%] mx-auto mt-32">
      {resDetails?.name && (
        <div className="flex justify-between items-center">
          <div className="flex text-xs text-[#93959f] ">
            <Link to="/">
              <h4 className="cursor-pointer px-1 hover:text-[#000000]">Home</h4>
            </Link>
            &nbsp;/
            <Link to="/">
              <h4 className="cursor-pointer px-1 hover:text-[#000000]">
                {city}
              </h4>
            </Link>
            &nbsp;/
            <h4 className="text-[#000000] px-1 font-normal">
              {resDetails?.name}
            </h4>
          </div>
          <div className="p-1">
            <Link to="/search">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-lg text-[#93959f]"
              />
            </Link>
          </div>
        </div>
      )}
      <div className="flex justify-between my-5">
        <div>
          <h1 className="font-black text-xl text-[#282c3f] pb-2">{resDetails?.name}</h1>
          <h3 className="font-light text-sm text-[#7e808c] pb-1">{resDetails?.cuisines.join(" ,")}</h3>
          {resDetails?.sla?.lastMileTravelString ? (
            <h3 className="font-light text-sm text-[#7e808c] pb-1">
              {resDetails?.areaName}, {resDetails?.sla?.lastMileTravelString}
            </h3>
          ) : (
            <h3 className="font-light text-sm text-[#7e808c] pb-1">{resDetails?.areaName}</h3>
          )}
        </div>
        {resDetails?.avgRatingString && (
          <div className="flex flex-col p-2 h-fit border border-gray-300 shadow-sm rounded-md">
            <h2 className="flex justify-center text-sm items-baseline text-[#3d9b6d] pb-2 mb-2 border-b border-gray-300 font-semibold leading-tight">
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> &nbsp;
              {resDetails?.avgRatingString}
            </h2>
            <h4 className="text-[10px] text-[#8b8d97] font-bold tracking-tighter text-shadow-xs">{resDetails?.totalRatingsString}</h4>
          </div>
        )}
      </div>
      {resDetails?.feeDetails?.message ? (
        <div className="flex pb-3">
          <h4 className="flex items-center justify-center text-base text-[#7e808c] font-light ">
            <img src={ICON_CDN_URL_18 + resDetails?.feeDetails?.icon} className="pr-2"/>{" "}
            {resDetails?.feeDetails?.message}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {resDetails?.sla?.slaString && (
        <div className="flex mt-3 py-3 pl-3 justify-baseline items-baseline border-t border-dashed border-gray-300">
          {resDetails?.sla?.slaString ? (
            <h2 className="text-base text-[#282c3f] font-extrabold text-shadow-md pr-3">
              <FontAwesomeIcon icon={faCircleHalfStroke}></FontAwesomeIcon>{" "}
              &nbsp;
              {resDetails?.sla?.slaString}
            </h2>
          ) : (
            <></>
          )}
          {resDetails?.costForTwoMessage ? (
            <h2 className="text-base text-[#282c3f] font-extrabold text-shadow-md">
              <FontAwesomeIcon icon={faIndianRupeeSign} className="px-[5px] py-[1.5px] text-sm rounded-full border-[1px] border-solid border-[#282c3f] text-[#282c3f]"/>{" "}
              &nbsp;
              {resDetails?.costForTwoMessage}
            </h2>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="flex p-3 mb-3 gap-x-3 overflow-hidden w-full">
        {resOffers.map((obj) => {
          return <OfferCard {...obj} key={{ ...obj }.offerIds} />;
        })}
      </div>
      <div className="menu font-black text-[#3e4152]">
        {resMenu.map((obj) => {
          return <MenuCategory {...obj} key={{ ...obj }.title} />;
        })}
      </div>
      <div className="res-license">
        {resLicense.map((x) => {
          return (
            <div key={x} className="res-license-card">
              <img src={LICENSE_CDN_URL + x.imageId} />
              <h4>{x.text}</h4>
            </div>
          );
        })}
      </div>
      <div className="res-address">
        {resAddress.map((x) => {
          return (
            <div className="res-address-card" key={x}>
              <h3>{x.name}</h3>
              <h4>(Outlet : {x.area})</h4>
              <h5>
                <FontAwesomeIcon icon={faLocationDot} />
                &nbsp; {x.completeAddress}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
