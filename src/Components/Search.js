import React from "react";
import { useState, useEffect } from "react";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRestaurantsData from "../Hooks/UseRestaurantsData";
import usePopularCuisinesData from "../Hooks/usePopularCuisinesData";
import { IMG_CDN_URL } from "../Helpers/Constant";
import RestaurantSearchCard from "./RestaurantSearchCard";
import Home from ".Home";

const Search = () => { 
  const Data = useRestaurantsData();
  const restData = [...Data[Data.indexOf(Data.resList)]];
  // console.log(restData);
  const [popularCuisines] = usePopularCuisinesData();
  const [searchText, setSearchText] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [filteredResList, setFilteredResList] = useState([]);
  popularCuisines?.map((x) => {return x.action.link = x.action.link.replace("swiggy://explore?query=", "").replace("%20", ' ')});
  window.scrollTo(0, 0);
  const handleCuisineClick = (text) => {
    setSearchText(text);
  }
  const handleXClick= () => {
    if(searchText !== ''){
      setSearchText('')
    }
  }
  const handleSearch = () => {
    const filteredData = restData.filter((res) => res?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
    setFilteredResList(filteredData);
    setErrorMessage("");
    if (filteredData?.length === 0) {
      setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`)
    }
  }
  useEffect(() => {handleSearch()}, [searchText]);
  return (
    <div className="mt-32 min-h-screen mx-auto w-[60%]">
      <div className="px-2 flex items-center justify-start mx-auto w-full border-2 border-[text-[#686b78]] text-[#686b78]">
        <input
          type="text"
          className="flex-1 px-3 py-3 focus:outline-none"
          placeholder="Search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleSearch}
        ></input>
        <FontAwesomeIcon icon={searchText === '' ? faSearch : faXmark} className="text-[#7e818d] py-2 pr-4 cursor-pointer" onClick={() => {handleXClick()}}/>
      </div>
      <div className="mx-auto mt-10 w-full">
        {searchText === '' ? (
          <>
            <h2 className="text-left font-black text-[#3d4152] pl-2 pb-15 pt-5 text-2xl tracking-tighter leading-tight">Popular Cuisines</h2>
            <div className="flex overflow-hidden h-36 flex-start">
              {popularCuisines?.map((img) => {
                return (
                  <div className="ml-1 mt-2 cursor-pointer flex-shrink-0" key={img.imageId} onClick={() => {handleCuisineClick(img.action.link)}}>
                    <img src={IMG_CDN_URL + img.imageId} className="h-full w-auto"/>
                  </div>);
              })}
            </div>
          </>
        ) : (
        <div>
          <div className="my-2 text-lg font-medium">Search Results for <strong>"{searchText}"</strong></div>
          <div>
          {filteredResList &&
              filteredResList?.map((res) => {
                return <RestaurantSearchCard {...res.info} key={res.info.id} />;
            })}
          </div>
          {ErrorMessage && <div className="text-center mb-3 mt-5 text-xl bg-[#f2f6fc] py-6">{ErrorMessage}</div>}
        </div>)}
      </div>
    </div>
  );
};
export default Search;
