import { RES_CARD_IMG_CDN_URL, RES_CARD_IMG_CDN_URL_GREY } from "../Helpers/Constant";
import { ratingColor } from "../Helpers/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RestaurantCard = ({
  aggregatedDiscountInfoV3,
  areaName,
  avgRating,
  cloudinaryImageId,
  id,
  isOpen,
  name,
  cuisines,
}) => {
  const color = ratingColor(avgRating)
  return (
    <div key={id} className="">
      <Link to={"/restaurant/" + id} key={id} className="grid grid-flow-row justify-stretch gap-2 h-auto w-64 transition-all ease-in delay-75 hover:scale-95 hover:transition-all hover:origin-center">
        <div className="w-64 h-40 relative">
          {cloudinaryImageId ? (
            <img
              src={isOpen===true?(RES_CARD_IMG_CDN_URL + cloudinaryImageId):(RES_CARD_IMG_CDN_URL_GREY + cloudinaryImageId)}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="res-card-img-shimmer" />
          )}
          <div className="bg-gradient-to-t from-[#000000] to-transparent h-24 px-3 pb-1 rounded-b-2xl inset-x-0 bottom-0 absolute">
          {aggregatedDiscountInfoV3 && (
            <span className="absolute flex bottom-0 text-[#FFFFFF] font-black shadow-md uppercase text-[22px] inset-x-0 -mt-7 px-3 pb-1 text-left truncate rounded-b-2xl  ">
                <h1 className="-tracking-[1.75px] leading-[22px]">
                    {aggregatedDiscountInfoV3?.header}
                </h1>
                    {aggregatedDiscountInfoV3?.subHeader && 
                <h1 className="-tracking-[1.75px] leading-[22px]">
                    &nbsp;{aggregatedDiscountInfoV3?.subHeader}
                </h1>}
            </span>
            )}
          </div>
        </div>
        <div className="w-64 ml-3">
          <h2 className="truncate text-[#02060cbf] text-lg font-bold tracking-tighter" title={name}>
            {name}
          </h2>
          {avgRating && (
            <div className="text-base font-light">
              <FontAwesomeIcon
                icon={faStar}
                className={`bg-green text-xs rounded-full text-[#FFFFFF] p-1`}
              />{" "}
              {avgRating}
            </div>
          )}
          <h5 className="truncate text-[#02060c99] text-sm base leading-4 pb-1 font-normal tracking-tighter">{cuisines?.join(", ")}</h5>
          <h5 className="truncate text-[#02060c99] text-sm leading-4 pb-1 font-normal tracking-tighter">{areaName}</h5>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
