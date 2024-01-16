import React from "react";
import { useParams, Link } from "react-router-dom";
import {
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
import { useSelector } from "react-redux";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { useState, useEffect } from "react";
import RestaurantMenuShimmer from "./RestaurantMenuShimmer";
import ResetCart from "./ResetCart";
import MyContext from "../Utils/MyContext";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resDetails, resOffers, resMenu, resLicense, resAddress] = useRestaurantMenu(id);
  const resDetailsData = {
    "id": resDetails?.id,
    "name": resDetails?.name,
    "areaName": resDetails?.areaName,
    "cloudinaryImageId": resDetails?.cloudinaryImageId,
    "slaString": resDetails?.sla?.slaString,
    "lastMileTravelString": resDetails?.sla?.lastMileTravelString,
    "deliveryFee": resDetails?.feeDetails?.totalFee
  };
  const locDetails = useSelector(store => store.location.locationDetails);
  const city = locDetails[0].district;
  const [showElement, setShowElement] = useState(false);
  const [resCartAlert, setResCartAlert] = useState(false);
  const contextValue = {
    resCartAlert,
    showResCartAlert: () => {setResCartAlert(true), setShowElement(false)},
    hideResCartAlert: () => {setResCartAlert(false), setShowElement(true)}
  };
  useEffect(() => {  
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
    const timeoutId = setTimeout(() => {
      setShowElement(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return resOffers.length === 0 ? (
    <RestaurantMenuShimmer />
  ) : (
    <MyContext.Provider value={contextValue}>
    <div className="min-h-screen mx-auto mt-32 max-w-[75%]">
      {resDetails.name && (
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
              {resDetails.name}
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
          <h1 className="font-black text-xl text-[#282c3f] pb-2">{resDetails.name}</h1>
          <h3 className="font-light text-sm text-[#7e808c] pb-1">{resDetails.cuisines.join(" ,")}</h3>
          {resDetails.sla.lastMileTravelString ? (
            <h3 className="font-light text-sm text-[#7e808c] pb-1">
              {resDetails.areaName}, {resDetails.sla.lastMileTravelString}
            </h3>
          ) : (
            <h3 className="font-light text-sm text-[#7e808c] pb-1">{resDetails.areaName}</h3>
          )}
        </div>
        {resDetails.avgRatingString && (
          <div className="flex flex-col p-2 h-fit border border-gray-300 shadow-sm rounded-md">
            <h2 className="flex justify-center text-sm items-baseline text-[#3d9b6d] pb-2 mb-2 border-b border-gray-300 font-semibold leading-tight">
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> &nbsp;
              {resDetails.avgRatingString}
            </h2>
            <h4 className="text-[10px] text-[#8b8d97] font-bold tracking-tighter text-shadow-xs">{resDetails.totalRatingsString}</h4>
          </div>
        )}
      </div>
      {resDetails.feeDetails.message ? (
        <div className="flex pb-3">
          <h4 className="flex items-center justify-center text-base text-[#7e808c] font-light ">
            <img src={ICON_CDN_URL_18 + resDetails.feeDetails.icon} className="pr-2"/>{" "}
            {resDetails.feeDetails.message}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {resDetails.sla.slaString && (
        <div className="flex mt-3 py-3 pl-3 justify-baseline items-baseline border-t border-dashed border-gray-300">
          {resDetails.sla.slaString ? (
            <h2 className="text-base text-[#282c3f] font-extrabold text-shadow-md pr-3">
              <FontAwesomeIcon icon={faCircleHalfStroke}></FontAwesomeIcon>{" "}
              &nbsp;
              {resDetails.sla.slaString}
            </h2>
          ) : (
            <></>
          )}
          {resDetails.costForTwoMessage ? (
            <h2 className="text-base text-[#282c3f] font-extrabold text-shadow-md">
              <FontAwesomeIcon icon={faIndianRupeeSign} className="px-[5px] py-[1.5px] text-sm rounded-full border-[1px] border-solid border-[#282c3f] text-[#282c3f]"/>{" "}
              &nbsp;
              {resDetails.costForTwoMessage}
            </h2>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="container-snap flex p-3 mb-3 gap-x-3 overflow-x-auto w-full">
        {resOffers.map((obj) => {
          return <OfferCard {...obj} key={{ ...obj }.offerIds} />;
        })}
      </div>
      <div className="menu font-black text-[#3e4152]">
        {resMenu.map((obj) => {
          return <MenuCategory {...obj} key={{ ...obj }.title} resDetailsData={resDetailsData}/>;
        })}
      </div>
      <div>
        {resLicense.map((x) => {
          return (
            <div key={x} className="flex items-center text-[#93959f] bg-[#f1f1f6] mt-4 py-4 pl-4">
              <img src={LICENSE_CDN_URL + x.imageId} className="w-[60px] h-[30px] mr-4"/>
              <h4 className="pt-[6px] text-sm font-normal">{x.text}</h4>
            </div>
          );
        })}
      </div>
      <div>
        {resAddress.map((x) => {
          return (
            <div className="text-[#93959f] bg-[#f1f1f6] px-4 pb-32" key={x}>
              <h3 className="border-t border-gray-300 font-extrabold text-lg pt-4">{x.name}</h3>
              <h4 className="text-sm font-normal tracking-tighter">(Outlet : {x.area})</h4>
              <h5 className="text-sm font-light tracking-tight mt-1">
                <FontAwesomeIcon icon={faLocationDot} />
                &nbsp; {x.completeAddress}
              </h5>
            </div>
          );
        })}
      </div>
      {(resMenu.length !==0 && showElement) && 
      <div className={`bottom-8 left-[50%] -translate-x-1/2 flex z-40 text-center pb-3 pt-3 px-4 text-white rounded-full bg-[#5d8ed5] w-fit whitespace-nowrap sticky shadow-[0px_8px_12px_0px_#0000004d]`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4"/></svg>
        <button className="leading-3 pl-2 tracking-tight text-sm font-black self-end">BROWSE MENU</button>
    </div>}
    {resCartAlert ? <ResetCart /> : ''}
    </div>
    </MyContext.Provider>
  )
};

export default RestaurantMenu;
