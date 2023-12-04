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
import { faChevronDown, faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestaurantCardShimmer from "./RestaurantCardShimmer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Unservicable from "./Unservicable";

const Home = () => {
  const locDetails = useSelector((store) => store.location.locationDetails);
  [latitude, setLatitude] = useState(locDetails[0].lat);
  [city, setCity] = useState(locDetails[0].district);
  [longitude, setLongitude] = useState(locDetails[0].lng);
  [notServicable, setNotServicable] = useState([]);
  [topicalBanner, setTopicalBanner] = useState([]);
  [wOYM, setWOYM] = useState([]);
  [sort, setSort] = useState([]);
  [sortActive, setSortActive] =useState(undefined);
  [topResList, setTopResList] = useState([]);
  [resList, setResList] = useState([]);
  [filteredResList, setFilteredResList] = useState([]);
  [appInstallLinks, setAppInstallLinks] = useState([]);
  [footerCities, setFooterCities] = useState([]);
  [bestPlaces, setBestPlaces] = useState([]);
  [bestCuiNearMe, setBestCuiNearMe] = useState([]);
  [expResNearMe, setExpResNearMe] = useState([]);
  [bestPlacesOpen, setBestPlacesOpen] = useState(false);
  [bestCuiOpen, setBestCuiOpen] = useState(false);
  [cityOpen, setCityOpen] = useState(false);
  const toggleCitites = () => {
    setCityOpen(!cityOpen);
  };
  const toggleBestCui = () => {
    setBestCuiOpen(true);
  }
  const toggleBestPlaces = () => {
    setBestPlacesOpen(true);
  }
  const handleSortClick = (event, index) => {
    event.preventDefault();
    console.log("clicked");
    if(sortActive === index) {
      setSortActive(undefined);
    }
    else {
    setSortActive(index);
  }
  }
  const handleSortReset = (event) => {
    event.preventDefault();
    setSortActive("cancelled");
  }
  async function getRestaurants(latitude, longitude) {
    setResList([]);
    const data = await fetch(swiggyAPI(latitude, longitude));
    const json = await data.json();
    const notDeliverable = json?.data?.cards
      ?.map((x) => {
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
    const sortData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x.sortConfigs;
      })
      ?.map((x) => {
        return x.sortConfigs;
      });
    const resListData = json?.data?.cards
      ?.map((x) => {
        return x?.card?.card;
      })
      ?.filter((x) => {
        return x["id"] === "restaurant_grid_listing";
      })
      ?.map((x) => {
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
    const bestPlacesData = json?.data?.cards
    ?.map((x) => {
      return x?.card?.card;
    })
    ?.filter((x) => {
      return x["title"] === "Best Places to Eat Across Cities";
    })
    ?.map((x) => {
      return x.brands;
    });
    const bestCuiNearMeData = json?.data?.cards
    ?.map((x) => {
      return x?.card?.card;
    })
    ?.filter((x) => {
      return x["title"] === "Best Cuisines Near Me";
    })
    ?.map((x) => {
      return x.brands;
    });
    const expResNearMeData = json?.data?.cards
    ?.map((x) => {
      return x?.card?.card;
    })
    ?.filter((x) => {
      return x["title"] === "Explore Every Restaurants Near Me";
    })
    ?.map((x) => {
      return x.brands;
    });
    setTopicalBanner(...topicalBannerData);
    setWOYM(...wOYMData);
    setTopResList(...topResListData);
    setSort(...sortData);
    setResList(...resListData);
    setAppInstallLinks(...appInstallLinksData);
    setFooterCities(...footerCitiesData);
    setBestPlaces(...bestPlacesData);
    setBestCuiNearMe(...bestCuiNearMeData);
    setExpResNearMe(...expResNearMeData);
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
              <Slider className="topicalBanner" amount={450}/>
            </div>
            <div className="topicalBanner flex overflow-hidden">
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
              <Slider className="foodCategory" amount={350}/>
            </div>
            <div className="foodCategory flex p-4 overflow-hidden">
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
              <Slider className="topResList" key="topResList" amount={450}/>
            </div>
            <div className="topResList flex mt-8 gap-x-8 pl-4 pb-8 scrollbar-none overflow-hidden">
              {topResList.map((res) => {
                return <RestaurantCard {...res.info} key={res.info.id} />;
              })}
            </div>
          </>
        )}
        {resList && (
          <>
            <div className="mt-8 mb-4 ml-4 pl-2">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
                Restaurants with online food delivery in {city}
              </h1>
            </div>
            <div className="flex mx-8 mb-4">
              <div className={`px-3 py-2 mr-3 rounded-full shadow-sm transition-all duration-100 ease-in delay-0 ${sortActive !== undefined ? "bg-[#02060c26] border-[#36393e] border-[1px]" : "border-[1px] border-solid border-[#02060c1f]"}`}>
                <h1 className={`text-center text-base tracking-tight font-medium whitespace-nowrap ${sortActive !== undefined ? "text-orange" : "text-[#050e1bbf]"}`}>Filter &nbsp; <FontAwesomeIcon icon={faFilter}/></h1>
              </div>
              {sort.map((x, index) => {
                return(
                  <div key={x.title} onClick={(event) => handleSortClick(event, index)} className={`flex justify-between whitespace-nowrap px-3 py-2 mr-3 cursor-pointer rounded-full shadow-sm transition-all duration-100 ease-in delay-0 ${sortActive === index ? "bg-[#02060c26] border-[#36393e] border-[1px]" : "border-[1px] border-solid border-[#02060c1f]"}`}>
                    <h1 className="text-center text-base text-[#050e1bbf] tracking-tight font-medium">{x.title}</h1>
                    {sortActive === index ? 
                      <div className="pl-1" onClick={(event) => handleSortReset(event)}>
                        <FontAwesomeIcon icon={faXmark} className="text-[#050e1bbf] text-center text-sm"/>
                      </div> : <></>}
                  </div>
                )
              })}
            </div>
            <div className="grid gap-x-3 gap-y-8 mx-8 my-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {resList &&
                resList.map((res) => {
                  return <RestaurantCard {...res.info} key={res.info.id} />;
                })}
            </div>
          </>
        )}
        {bestPlaces && (
          <>
            <div className="mt-16 ml-4 pl-2">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
              Best Places to Eat Across Cities
              </h1>
            </div>
            <div className="flex flex-wrap gap-x-2 justify-between my-8">
              {bestPlaces?.slice(0, 11).map((x) => {
                return (
                  <div className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl" key={x.text}>
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">{x.text}</h2>
                  </div>
                )
              })
              }
              <div onClick={toggleBestPlaces} className={bestPlacesOpen ? "hidden" : "w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl truncate text-center text-base text-[#050e1bbf] tracking-tight font-bold"}>Show more &nbsp;<FontAwesomeIcon icon={faChevronDown} className={bestPlacesOpen ? "rotate-180" : ""}/></div>
              {bestPlacesOpen && bestPlaces?.slice(11).map((x) => {
                return (
                  <div className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl" key={x.text}>
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">{x.text}</h2>
                  </div>
                )
              })}
            </div>
          </>
        )}
        {bestCuiNearMe && (
          <>
            <div className="mt-16 ml-4 pl-2">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
              Best Cuisines Near Me
              </h1>
            </div>
            <div className="flex flex-wrap gap-x-2 justify-between my-8">
              {bestCuiNearMe?.slice(0, 11).map((x) => {
                return (
                  <div className="w-[20%] flex-grow p-4  mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl" key={x.text}>
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">{x.text}</h2>
                  </div>
                )
              })
              }
              <div onClick={toggleBestCui} className={bestCuiOpen ? "hidden" : "w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl truncate text-center text-base text-[#050e1bbf] tracking-tight font-bold"}>Show more &nbsp;<FontAwesomeIcon icon={faChevronDown} className={bestCuiOpen ? "rotate-180" : ""}/></div>
              {bestCuiOpen && bestCuiNearMe?.slice(11).map((x) => {
                return (
                  <div className="w-[20%] flex-grow p-4 mx-2 mb-4 cursor-pointer border-[1px] border-solid border-[#02060c1f] rounded-xl" key={x.text}>
                    <h2 className="truncate text-center text-base text-[#050e1bbf] tracking-tight font-medium">{x.text}</h2>
                  </div>
                )
              })}
            </div>
          </>
        )}
        {expResNearMe && (
          <>
            <div className="mt-16 ml-4 pl-2">
              <h1 className="text-2xl leading-5 tracking-tighter font-extrabold">
              Explore Every Restaurants Near Me
              </h1>
            </div>
            <div className="flex items-center my-8 flex-wrap">
              {expResNearMe && 
                expResNearMe.map((x) => {
                  return (
                    <div key={x.text} className="w-[20%] flex-grow p-4 mx-4 mb-4 text-center cursor-pointer border-[1.5px] border-solid border-[#02060c2f] rounded-xl">
                      <h1 className="text-[#050e1bbf] tracking-tight font-medium truncate">{x.text}</h1>
                    </div>
                  )
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
export default Home;
