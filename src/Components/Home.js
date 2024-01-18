import {
  CAROUSEL_CDN_URL,
  WOYM_CARD_IMG_CDN_URL,
  IMG_CDN_URL,
  footer_data,
} from "../Helpers/Constant";
import React from "react";
import Footer from "./Footer";
import foodVillaLogoWhite from "../Images/Food Villa Logo White.png";
import RestaurantCard from "./RestaurantCard";
import Slider from "./Slider";
import HomeShimmer from "./HomeShimmer";
import { useState } from "react";
import {
  faChevronDown,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Unservicable from "./Unservicable";
import useRestaurantsData from "../Hooks/useRestaurantsData";

const Home = () => {
  const [
    topicalBanner,
    wOYM,
    topResList,
    sort,
    resList,
    filteredResList,
    setFilteredResList,
    appInstallLinks,
    footerCities,
    bestPlaces,
    bestCuiNearMe,
    expResNearMe,
    notServicable,
  ] = useRestaurantsData();
  const locDetails = useSelector((store) => store.location.locationDetails);
  const locSearchVisibility = useSelector((store) => store.locSearch.visible);
  const [city, setCity] = useState(locDetails[0].district);
  const [sortActive, setSortActive] = useState(undefined);
  const [bestPlacesOpen, setBestPlacesOpen] = useState(false);
  const [bestCuiOpen, setBestCuiOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const toggleCitites = () => {
    setCityOpen(!cityOpen);
  };
  const toggleBestCui = () => {
    setBestCuiOpen(true);
  };
  const toggleBestPlaces = () => {
    setBestPlacesOpen(true);
  };
  const handleSortClick = (text) => {
    if (text === sortActive && sortActive !== undefined) {
      setSortActive(undefined);
      setFilteredResList(resList);
    } else {
      setSortActive(text);
      if (text === "Relevance (Default)") {
        setFilteredResList(resList.slice());
      } else if (text === "Delivery Time") {
        setFilteredResList(
          filteredResList
            .slice()
            .sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime)
        );
      } else if (text === "Rating") {
        setFilteredResList(
          filteredResList
            .slice()
            .sort((a, b) => b.info.avgRating - a.info.avgRating)
        );
      } else if (text === "Cost: Low to High") {
        setFilteredResList(
          filteredResList
            .slice()
            .sort(
              (a, b) =>
                a.info.costForTwo.split(" ")[0].slice(1) -
                b.info.costForTwo.split(" ")[0].slice(1)
            )
        );
      } else if (text === "Cost: High to Low") {
        setFilteredResList(
          filteredResList
            .slice()
            .sort(
              (a, b) =>
                b.info.costForTwo.split(" ")[0].slice(1) -
                a.info.costForTwo.split(" ")[0].slice(1)
            )
        );
      }
    }
  };
  if (appInstallLinks.title && typeof appInstallLinks.title === "string") {
    appInstallLinks.title = appInstallLinks.title.replace("Swiggy ", "");
  }
  return resList?.length === 0 ? (
    <HomeShimmer />
  ) : (
    <>
      {notServicable !== undefined ? (
        <div>
          <Unservicable />
        </div>
      ) : (
        <div className="xl:max-w-[80%] lg:max-w-[80%] md:max-w-[90%] sm:max-w-[90%] mx-auto min-h-screen pt-24">
          {topicalBanner && (
            <>
              <div className="flex justify-between mt-6 ml-4 pl-2 items-center">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  Best Offers for you
                </h1>
                <Slider className="topicalBanner" amount={450} />
              </div>
              <div className="topicalBanner container-snap flex overflow-x-auto">
                {topicalBanner.map((img) => {
                  return (
                    <div
                      className="ml-6 mt-8 cursor-pointer flex-shrink-0"
                      key={img.imageId}
                    >
                      <img
                        src={CAROUSEL_CDN_URL + img.imageId}
                        className="h-64 w-106"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {wOYM && (
            <>
              <div className="flex justify-between mt-8 ml-4 pl-2 items-center">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  What's on your mind?
                </h1>
                <Slider className="foodCategory" amount={350} />
              </div>
              <div className="foodCategory container-snap flex p-4 overflow-x-auto">
                {wOYM.map((img) => {
                  return (
                    <div
                      key={img.id}
                      className="cursor-pointer flex-shrink-0 pr-6 first:pl-4"
                    >
                      <img
                        src={WOYM_CARD_IMG_CDN_URL + img.imageId}
                        className="h-[180px] w-[144px]"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {topResList && (
            <>
              <div className="flex justify-between mt-8 ml-4 pl-2 items-center">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  Top restaurant chains in {city}
                </h1>
                <Slider className="topResList" key="topResList" amount={450} />
              </div>
              <div className="topResList container-snap flex mt-8 gap-x-8 pl-4 pb-8 overflow-x-auto">
                {topResList.map((res) => {
                  return <RestaurantCard {...res.info} locSearchVisibility={locSearchVisibility} key={res.info.id} />;
                })}
              </div>
            </>
          )}
          {filteredResList && (
            <>
              <div className="mt-8 mb-4 ml-4 pl-2">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold truncate">
                  Restaurants with online food delivery in {city}
                </h1>
              </div>
              <div className="container-snap flex mx-4 mb-4 w-full overflow-auto">
                <div
                  className={`px-3 py-2 mr-3 min-w-fit rounded-full transition-all duration-100 ease-in delay-0 ${
                    sortActive !== undefined
                      ? "bg-[#02060c26] border-[#36393e] border-[1px]"
                      : "border-[1px] border-solid border-[#02060c1f]"
                  }`}
                >
                  <h1
                    className={`text-center flex-1 text-base tracking-tight font-medium whitespace-nowrap ${
                      sortActive !== undefined
                        ? "text-orange"
                        : "text-[#050e1bbf]"
                    }`}
                  >
                    Filter &nbsp; <FontAwesomeIcon icon={faFilter} />
                  </h1>
                </div>
                {sort.map((x, index) => {
                  return (
                    <div
                      key={x.title}
                      onClick={() => handleSortClick(x.title)}
                      className={`container-snap flex justify-between min-w-fit truncate px-3 py-2 mr-3 cursor-pointer rounded-full transition-all duration-100 ease-in delay-0 ${
                        sortActive === x.title
                          ? "bg-[#02060c26] border-[#36393e] border-[1px]"
                          : "border-[1px] border-solid border-[#02060c1f]"
                      }`}
                    >
                      <h1 className="text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                        {x.title}
                      </h1>
                      {sortActive === x.title ? (
                        <div className="pl-1">
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-[#050e1bbf] text-center text-sm"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
                </div>
              <div className="grid place-items-center gap-8 mx-auto my-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {filteredResList &&
                  filteredResList?.map((res) => {
                    return <RestaurantCard {...res.info} locSearchVisibility={locSearchVisibility} key={res.info.id} />;
                  })}
              </div>
            </>
          )}
          {bestPlaces && (
            <>
              <div className="mt-16 ml-4 pl-2">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  Best Places to Eat Across Cities
                </h1>
              </div>
              <div className="flex flex-wrap gap-x-2 justify-between my-8">
                {bestPlaces?.slice(0, 11).map((x) => {
                  return (
                    <div
                      className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl"
                      key={x.text}
                    >
                      <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                        {x.text}
                      </h2>
                    </div>
                  );
                })}
                <div
                  onClick={toggleBestPlaces}
                  className={
                    bestPlacesOpen
                      ? "hidden"
                      : "w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl truncate text-center text-base text-[#050e1bbf] tracking-tight font-bold"
                  }
                >
                  Show more &nbsp;
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={bestPlacesOpen ? "rotate-180" : ""}
                  />
                </div>
                {bestPlacesOpen &&
                  bestPlaces?.slice(11).map((x) => {
                    return (
                      <div
                        className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl"
                        key={x.text}
                      >
                        <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                          {x.text}
                        </h2>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {bestCuiNearMe && (
            <>
              <div className="mt-16 ml-4 pl-2">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  Best Cuisines Near Me
                </h1>
              </div>
              <div className="flex flex-wrap gap-x-2 justify-between my-8">
                {bestCuiNearMe?.slice(0, 11).map((x) => {
                  return (
                    <div
                      className="w-[20%] flex-grow p-4  mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl"
                      key={x.text}
                    >
                      <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                        {x.text}
                      </h2>
                    </div>
                  );
                })}
                <div
                  onClick={toggleBestCui}
                  className={
                    bestCuiOpen
                      ? "hidden"
                      : "w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl truncate text-center text-base text-[#050e1bbf] tracking-tight font-bold"
                  }
                >
                  Show more &nbsp;
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={bestCuiOpen ? "rotate-180" : ""}
                  />
                </div>
                {bestCuiOpen &&
                  bestCuiNearMe?.slice(11).map((x) => {
                    return (
                      <div
                        className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl"
                        key={x.text}
                      >
                        <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">
                          {x.text}
                        </h2>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {expResNearMe && (
            <>
              <div className="mt-16 ml-4 pl-2">
                <h1 className="text-2xl h-fit leading-5 tracking-tighter font-extrabold">
                  Explore Every Restaurants Near Me
                </h1>
              </div>
              <div className="flex items-center my-8 flex-wrap">
                {expResNearMe &&
                  expResNearMe.map((x) => {
                    return (
                      <div
                        key={x.text}
                        className="w-[20%] flex-grow p-4 mx-4 mb-4 text-center cursor-pointer border-[1.5px] border-solid border-[#02060c2f] rounded-xl"
                      >
                        <h1 className="text-[#050e1bbf] tracking-tight font-medium truncate">
                          {x.text}
                        </h1>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      )}
      <div className="">
        {appInstallLinks && (
          <div
            key={appInstallLinks.id}
            className="max-w-screen mt-10 bg-[#f0f0f5] mx-auto justify-center py-6 w-full items-center flex"
          >
              <h1 className="text-xl text-clip font-black tracking-tighter text-center text-[#02060cbf] mr-4">
                {appInstallLinks.title}
              </h1>
            <div className="flex h-16">
              <div className="">
                <img
                  src={IMG_CDN_URL + appInstallLinks.androidAppImage}
                  className="h-full mx-2 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
              <div className="">
                <img
                  src={IMG_CDN_URL + appInstallLinks.iosAppImage}
                  className="h-full mx-2 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex bg-[#02060C] text-[#ffffff99] flex-col items-center justify-center p-10">
          <div className="grid grid-cols-4 gap-x-[5%] w-[85%] mx-auto">
            <div>
              <div className="flex items-center" key="footer-details">
                <img
                  src={foodVillaLogoWhite}
                  className="h-16"
                  key={foodVillaLogoWhite}
                />
                <h1 className="font-BasisGrotesquePro font-extrabold text-xl leading-10 tracking-tighter text-white">
                  Food Villa
                </h1>
              </div>
              <h1 className="truncate">&nbsp;&nbsp;&nbsp;© 2023 Bundl Technologies Pvt. Ltd</h1>
            </div>
            {footer_data.map((x, index) => {
              return (
                <div
                  className={`${index === 2 ? "col-start-3 -mt-32" : ""}`}
                  key={index}
                >
                  <h1 className="font-BasisGrotesquePro font-extrabold text-base leading-10 tracking-tighter text-white">
                    {x.title}
                  </h1>
                  {[...x.data].map((k, index) => {
                    return (
                      <div key={`${index + k}`}>
                        <h2 className="my-2 cursor-pointer">{k}</h2>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className="col-start-4 row-start-1">
              <h1 className="font-BasisGrotesquePro font-extrabold text-base leading-10 tracking-tighter text-white">
                We deliver to:
              </h1>
              {footerCities?.slice(0, 6).map((x) => {
                return (
                  <div key={x.text}>
                    <h1 className="py-1">{x.text}</h1>
                  </div>
                );
              })}
              <div
                className="flex mt-6 justify-between align-center items-center cursor-pointer border-[#ffffff26] border-solid border-[1px] w-fit px-2 rounded-xl"
                onClick={toggleCitites}
              >
                <h1 className="p-1 h-fit truncate">
                  {footerCities?.slice(6).length} cities &nbsp;
                </h1>
                <div className="ml-2 pr-1">
                  {
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={cityOpen ? "rotate-180" : ""}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            cityOpen
              ? "flex flex-col items-center justify-center pt-6 pb-10 text-[#ffffff99] bg-[#02060c] w-full h-fit border-t-[#ffffff26] border-solid border-t-[1px]"
              : "hidden"
          }
        >
          <h2 className="pb-6 font-bold text-lg text-white w-[80%] tracking-tight">
            Other cities that we deliver:
          </h2>
          <div className="grid grid-cols-4 gap-x-16 w-[80%]">
            {footerCities &&
              footerCities?.slice(6).map((x) => {
                return (
                  <div className="py-1" key={x.text}>
                    <h4 className="cursor-pointer p-1">{x.text}</h4>
                  </div>
                );
              })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
