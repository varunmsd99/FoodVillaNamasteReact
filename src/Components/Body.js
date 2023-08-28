import {
  CAROUSEL_CDN_URL,
  shimmer_display_count,
  WOYM_CARD_IMG_CDN_URL,
  IMG_CDN_URL,
  footer_data,
  swiggyAPI,
} from "../Helpers/Constant";
import Footer from "./Footer";
import foodVillaLogoWhite from "../Images/Food Villa Logo White.png";
import RestaurantCard from "./RestaurantCard";
import Slider from "./Slider";
import { useState, useEffect } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestaurantCardShimmer from "./RestaurantCardShimmer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Unservicable from "./Unservicable";

const Body = () => {
  const locDetails = useSelector((store) => store.location.locationDetails);
  [latitude, setLatitude] = useState(locDetails[0].lat);
  [city, setCity] = useState(locDetails[0].district);
  [longitude, setLongitude] = useState(locDetails[0].lng);
  [notServicable, setNotServicable] = useState([]);
  [topicalBanner, setTopicalBanner] = useState([]);
  [wOYM, setWOYM] = useState([]);
  [topResList, setTopResList] = useState([]);
  [resList, setResList] = useState([]);
  [appInstallLinks, setAppInstallLinks] = useState([]);
  [footerCities, setFooterCities] = useState([]);
  [cityOpen, setCityOpen] = useState(false);
  console.log(locDetails);
  const toggleCitites = () => {
    setCityOpen(!cityOpen);
  };
  async function getRestaurants(latitude, longitude) {
    const data = await fetch(swiggyAPI(latitude, longitude));
    console.log(swiggyAPI(latitude, longitude));
    const json = await data.json();
    console.log(json);
    const notDeliverable = json?.data?.cards
      .map((x) => {
        return x?.card?.card;
      })
      .filter((x) => {
        return x["id"] === "swiggy_not_present";
      });
    const topicalBannerData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "topical_banner";
      })
      ?.map((x) => {
        return x?.imageGridCards?.info;
      });
    const wOYMData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "whats_on_your_mind";
      })
      ?.map((x) => {
        return x?.imageGridCards?.info;
      });
    const topResListData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "top_brands_for_you";
      })
      ?.map((x) => {
        return x?.gridElements?.infoWithStyle?.restaurants;
      });
    const resListData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "restaurant_grid_listing";
      })
      .map((x) => {
        return x?.gridElements?.infoWithStyle?.restaurants;
      });
    const appInstallLinksData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "app_install_links";
      });
    const footerCitiesData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "footer_content";
      })
      ?.map((x) => {
        return x.cities;
      });
    console.log(topicalBannerData);
    console.log(wOYMData);
    console.log(topResListData);
    console.log(resListData);
    console.log(appInstallLinksData);
    console.log(footerCitiesData);
    console.log(notDeliverable);
    setTopicalBanner(...topicalBannerData);
    setWOYM(...wOYMData);
    setTopResList(...topResListData);
    setResList(...resListData);
    setAppInstallLinks(...appInstallLinksData);
    setFooterCities(...footerCitiesData);
    setNotServicable(...notDeliverable);
  }
  useEffect(() => {
    if (locDetails && locDetails[0]) {
      const newLatitude = locDetails[0].lat;
      const newCity = locDetails[0].district;
      const newLongitude = locDetails[0].lng;
      setLatitude(newLatitude);
      setCity(newCity);
      setLongitude(newLongitude);
      getRestaurants(newLatitude, newLongitude);
    }
  }, [locDetails]);
  if (appInstallLinks.title && typeof appInstallLinks.title === "string") {
    appInstallLinks.title = appInstallLinks.title.replace("Swiggy ", "");
  }
  return resList?.length === 0 ? (
    <div>Shimmer</div>
  ) : (
    <>
    {notServicable !== undefined ? (
      <div>
        <Unservicable />
      </div>
    ) : (
      <div className="max-w-[80%] mx-auto min-h-screen pt-24">
        {topicalBanner && (
          <>
            <div className="flex justify-between mt-6 ml-4 pl-2 items-center">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
                Best Offers for you
              </h1>
              <Slider />
            </div>
            <div className="flex overflow-hidden">
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
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
                What's on your mind?
              </h1>
              <Slider />
            </div>
            <div className="flex p-4 overflow-hidden">
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
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
                Top restaurant chains in {city}
              </h1>
              <Slider />
            </div>
            <div className="flex mt-8 gap-x-8 pl-4 pb-8 overflow-hidden">
              {topResList.map((res) => {
                return <RestaurantCard {...res.info} key={res.info.id} />;
              })}
            </div>
          </>
        )}
        {resList && (
          <>
            <div className="mt-8 ml-4 pl-2">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
                Restaurants with online food delivery in {city}
              </h1>
            </div>
            <div className="grid gap-6 mx-4 my-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {resList &&
                resList.map((res) => {
                  return <RestaurantCard {...res.info} key={res.info.id} />;
                })}
            </div>
          </>
        )}
      </div>
    )}
    <div className="">
      <div className="flex w-full justify-center mt-10 bg-[#f0f0f5]">
        {appInstallLinks && (
          <div key={appInstallLinks.id} className="flex py-6">
            <div className="w-96 flex content-center mr-4">
              <h1 className="text-2xl font-black tracking-tighter text-[#02060cbf]">
                {appInstallLinks.title}
              </h1>
            </div>
            <div className="flex h-16">
              <img
                src={IMG_CDN_URL + appInstallLinks.androidAppImage}
                className="h-full mx-2 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <img
                src={IMG_CDN_URL + appInstallLinks.iosAppImage}
                className="h-full mx-2 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex bg-[#02060C] text-[#ffffff99] flex-col items-center justify-center p-10">
        <div className="grid grid-cols-4 gap-x-[5%] w-[80%] mx-auto">
          <div>
            <div className="flex items-center" key="footer-details">
              <img
                src={foodVillaLogoWhite}
                className="h-16"
                key={foodVillaLogoWhite}
              />
              <h1 className="font-BasisGrotesquePro font-extrabold text-2xl leading-10 tracking-tighter text-white">
                Food Villa
              </h1>
            </div>
            <h1>&nbsp;&nbsp;&nbsp;© 2023 Bundl Technologies Pvt. Ltd</h1>
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
              <h1 className="p-1">
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
export default Body;
