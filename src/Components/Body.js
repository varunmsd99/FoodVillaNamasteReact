import {
  swiggy_api_URL,
  CAROUSEL_CDN_URL,
  shimmer_display_count,
  WOYM_CARD_IMG_CDN_URL,
  IMG_CDN_URL
} from "../Helpers/Constant";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCardShimmer from "./RestaurantCardShimmer";

const Body = () => {
  const city ="Vizag";
  [topicalBanner, setTopicalBanner] = useState([]);
  [wOYM, setWOYM] = useState([]);
  [topResList, setTopResList] = useState([]);
  [resList, setResList] = useState([]);
  [appInstallLinks, setAppInstallLinks] = useState([]);
  [citiesFooter, setCitiesFooter] = useState([]);
  async function getRestaurants() {
    const data = await fetch(swiggy_api_URL);
    const json = await data.json();
    const topicalBannerData = json.data.cards.map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "topical_banner";
    })
    .map((x) => {
      return x?.imageGridCards?.info
    });
    const wOYMData = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "whats_on_your_mind";
    })
    .map((x) => {
      return x?.imageGridCards?.info
    });
    const topResListData = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "top_brands_for_you";
    })
    .map((x) => {
      return x?.gridElements?.infoWithStyle?.restaurants
    });
    const resListData = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "restaurant_grid_listing";
    })
    .map((x) => {
      return x?.gridElements?.infoWithStyle?.restaurants
    })
    const appInstallLinksData = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "app_install_links";
    });
    const citiesFooterData = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "footer_content";
    });
    setTopicalBanner(...topicalBannerData);
    setWOYM(...wOYMData);
    setTopResList(...topResListData);
    setResList(...resListData);
    setAppInstallLinks(...appInstallLinksData);
    setCitiesFooter(...citiesFooterData);
  }
  useEffect(() => {
    getRestaurants();
  }, []);
  console.log(topicalBanner);
  console.log(wOYM);
  console.log(topResList);
  console.log(resList);
  console.log(appInstallLinks);
  console.log(citiesFooter);
  return (
    <div className="max-w-[80%] mx-auto min-h-screen">
      <div className="mt-24 ml-4 pl-4"><h1 className="text-2xl leading-5 tracking-tighter font-extrabold">Best Offers for you</h1></div>
      <div className="flex overflow-hidden">
      {topicalBanner && topicalBanner.map((img) => {
        return (
          <div className="ml-6 mt-8 cursor-pointer">
            <img src={CAROUSEL_CDN_URL+img.imageId} className="h-64 w-106"/>
          </div>
        )
      })}
      </div>
      <div className="mt-8 ml-4 pl-2"><h1 className="text-2xl leading-5 tracking-tighter font-extrabold">What's on your mind?</h1></div>
      <div className="flex p-4 overflow-hidden">
      {wOYM && wOYM.map((img) => {
        return (
          <div key={img.id} className="cursor-pointer flex-shrink-0 pr-6 first:pl-4">
            <img src={WOYM_CARD_IMG_CDN_URL+img.imageId} className="h-[180px] w-[144px]"/>
          </div>
        )
      })}
      </div>
      {city && <div className="mt-8 ml-4 pl-2"><h1 className="text-2xl leading-5 tracking-tighter font-extrabold">Top restaurant chains in {city}</h1></div>}
      <div className="flex mt-8 gap-x-8 pl-4 pb-8 overflow-hidden">
        {topResList && topResList.map((res) => {
        return <RestaurantCard {...res.info} key={res.info.id} />
      })}
      </div>
      {city && <div className="mt-8 ml-4"><h1 className=" text-2xl leading-5 tracking-tighter font-extrabold">Restaurants with online food delivery in {city}</h1></div>}
      <div className="grid gap-6 mx-4 my-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {resList && resList.map((res) => {
        return <RestaurantCard {...res.info} key={res.info.id}/>
      })}
      </div>
      <div className="flex justify-center mt-10 bg-[#f0f0f5]">
      {appInstallLinks && 
          <div key={appInstallLinks.id} className="flex py-6">
            <div className="w-96 flex content-center mr-4">
              <h1 className="text-2xl font-black text-[#02060cbf]">{appInstallLinks.title}</h1>
            </div>
            <div className="flex h-16">
              <img src={IMG_CDN_URL+appInstallLinks.androidAppImage} className="h-full mx-2 cursor-pointer"/>
              <img src={IMG_CDN_URL+appInstallLinks.iosAppImage} className="h-full mx-2 cursor-pointer"/>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
export default Body;
