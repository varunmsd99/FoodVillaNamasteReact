import { GET_LOCATION_API_URL, apiKey } from "../Helpers/Constant";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateLocation } from "../Utils/locationSlice";

const LocationSearch = () => {
  [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  async function getLocation() {
    const data = await fetch(GET_LOCATION_API_URL + searchText, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${apiKey}`,
        "X-RapidAPI-Host":
          "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
      },
    });
    const json = await data.json();
    dispatch(updateLocation([json[0]]));
  }
  const handleSubmit = () => {
    getLocation();
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
  <>
    <div className="w-full top-0 bottom-0 bg-gray-400 absolute opacity-50 ease-in-out duration-1000 transition-all"></div>
    <div className="top-0 left-0 bottom-0 h-screen w-[30%] bg-white z-50 absolute shadow-xl ease-in-out duration-1000 transition-all">
      <div className="flex flex-col items-center mx-auto w-fit">
        <div className="self-start py-4 pr-4 text-[#878996] text-2xl"><FontAwesomeIcon icon={faXmark}/></div>
        <input
          type="text"
          className="h-fit my-auto focus:outline-none py-2 px-3 border-2 border-[text-[#686b78]] min-w-[300px] shadow-lg"
          placeholder="Enter Pincode"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  </>
  );
};

export default LocationSearch;
