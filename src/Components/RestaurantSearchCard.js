import React from "react";
import { RES_CARD_IMG_CDN_URL, RES_CARD_IMG_CDN_URL_GREY } from "../Helpers/Constant";
import { Link } from "react-router-dom";

const RestaurantSearchCard = ({cloudinaryImageId, id, isOpen, name, cuisines,}) => {
  return (
    <div className="">
        <Link to={(isOpen) ? "/restaurant/" + id:''} key={id} className={`flex items-center h-24 rounded-md w-auto hover:bg-[#f2f6fc] ${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
            {cloudinaryImageId ? (
            <img
              src={isOpen===true?(RES_CARD_IMG_CDN_URL + cloudinaryImageId):(RES_CARD_IMG_CDN_URL_GREY + cloudinaryImageId)}
              className="p-3 h-full w-24 aspect-auto object-cover"
            />
          ) : (
            <div/>
          )}
            <div className="flex-col mx-2 py-2">
                <h2 className="text-[#49494e] text-base"><strong>{name}</strong></h2>
                <h3 className="text-[#7e808c] text-sm">Restaurant</h3>
            </div>
        </Link>
    </div>
  );
}

export default RestaurantSearchCard