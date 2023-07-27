import {
  swiggy_api_URL,
  swiggy_api_URL_new,
  CAROUSEL_CDN_URL,
  shimmer_display_count,
} from "../Constant";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCardShimmer from "./RestaurantCardShimmer";

const Body = () => {
  [carousel, setCarousel] = useState([]);
  [carouselNew, setCarouselNew] = useState([]);
  [resData, setResData] = useState([]);
  [resDataNew, setResDataNew] = useState([]);
  async function getRestaurants() {
    const data = await fetch(swiggy_api_URL);
    const json = await data.json();
    const carouselData = json.data.cards
      .map((x) => {
        return x;
      })
      .filter((x) => {
        return x["cardType"] === "carousel";
      })
      .map((x) => {
        return x?.data;
      })
      .filter((x) => {
        return x["subtype"] === "topCarousel";
      })
      .map((x) => {
        return x?.data?.cards;
      });
    const resDetailsData = json.data.cards
      .map((x) => {
        return x;
      })
      .filter((x) => {
        return x["cardType"] === "seeAllRestaurants";
      })
      .map((x) => {
        return x?.data;
      })
      .map((x) => {
        return x?.data?.cards;
      });
    setCarousel(...carouselData);
    console.log(...carouselData);
    setResData(...resDetailsData);
  }
  
  async function getRestaurantsNew() {
    const data = await fetch(swiggy_api_URL_new);
    const json = await data.json();
    const carouselDataNew = json.data.cards.map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "topical_banner";
    })
    .map((x) => {
      return x?.imageGridCards?.info
    })
    const resDetailsDataNew = json.data.cards
    .map((x) => {
      return x?.card?.card;
    })
    .filter((x) => {
      return x["id"] === "restaurant_grid_listing";
    })
    .map((x) => {
      return x?.gridElements?.infoWithStyle?.restaurants
    })
    setCarouselNew(...carouselDataNew);
    setResDataNew(...resDetailsDataNew);
  }
  useEffect(() => {
    getRestaurants();
    getRestaurantsNew();
  }, []);
  return (
    <div key="body" className="body">
      {carousel ? (
        <div key="bodyCarousel" className="carousel">
          <div key="bodyCarouselContent" className="carousel-content">
            {carousel.map((x) => {
              return (
                <div key={x.data.creativeId} className="carousel-card">
                  <img src={CAROUSEL_CDN_URL + x?.data?.creativeId} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div />
      )}
      {resData?.length === 0 ? (
        <div />
      ) : (
        <div key="resListHeader" className="Restaurant-list-header">
          <div>
            <h2>{resData.length} Restaurants</h2>
          </div>
          <div className="filter-data">
            <ul>
              <li>
                <Link to="/" key="Relevance">
                  Relevance
                </Link>
              </li>
              <li>
                <Link to="/" key="Delivery Time">
                  Delivery Time
                </Link>
              </li>
              <li>
                <Link to="/" key="Rating">
                  Rating
                </Link>
              </li>
              <li>
                <Link to="/" key="Cost: High to Low">
                  Cost: Low to High
                </Link>
              </li>
              <li>
                <Link to="/" key="Cost: High to Low">
                  Cost: High to Low
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {resData?.length === 0 ? (
        <RestaurantCardShimmer />
      ) : (
        <div key="resCards" className="Restaurant-list">
          {resData.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.data.id}
                className="card-link"
                key={`link${restaurant.data.id}`}
              >
                <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Body;
