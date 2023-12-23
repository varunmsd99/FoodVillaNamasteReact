import { GET_LOCATION_API_URL, apiKey } from "../Helpers/Constant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLocation } from "../Utils/locationSlice";
import locationUnservicable from "../Images/empty_location_unserviceable.webp"

const LocationSearch = ({ childState, setChildState }) => {
  [searchText, setSearchText] = useState("");
  [locData, setLocData] = useState([]);
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
    if (json.length === 0) {
      setLocData(["noresults"]);
    } else {
      setLocData(json);
    }
  }
  const handleChildState = () => {
    setChildState(!childState);
  };
  const handleSubmit = (index) => {
    dispatch(updateLocation([locData[index]]));
    setChildState(!childState);
  };
  const handleKeyPress = (event) => {
    if ((typeof(Number(searchText)) === "number" && searchText.length === 6) || event.key === "Enter") {
      getLocation();
    }
  };
  return (
    <div className="z-30 min-h-[100vh-80px] flex">
      <div className="w-full top-0 left-0 h-full bg-gray-400 absolute opacity-50 ease-in-out duration-1000 transition-all" onClick={() => {setChildState(!childState);}}></div>
      <div className="left-0 top-0 h-full bg-white z-50 absolute shadow-xl ease-in-out duration-1000 transition-all w-[33%]">
        <div className="flex-col items-center ml-auto mr-8 w-[67%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 my-4 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#686b78"
            onClick={() => {
              handleChildState();
            }}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <div className="flex my-auto border-2 w-full shadow-[0px_1px_12px_1px_#d4d5d9]">
          <input
            type="text"
            className="focus:outline-none py-2 px-3 flex-1"
            placeholder="Enter Pincode"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {searchText === '' ? <></> : <div className="text-orange font-medium text-sm pr-2 tracking-tight cursor-pointer self-center" onClick={() => {setSearchText('')}}>Cancel</div>}
          </div>
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
            {locData && locData[0] !== "noresults" ? (
              locData?.map((x, index) => {
                return (
                  <div className="flex p-6 mx-auto cursor-pointer border-b border-dashed" key={index} onClick={() => handleSubmit(index)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="#535665"
                      className="w-5 h-5 mt-1"
                    >
                      <path d="M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M19.071 3.429C15.166-.476 8.834-.476 4.93 3.429c-3.905 3.905-3.905 10.237 0 14.142l.028.028 5.375 5.375a2.359 2.359 0 003.336 0l5.403-5.403c3.905-3.905 3.905-10.237 0-14.142zM5.99 4.489A8.5 8.5 0 0118.01 16.51l-5.403 5.404a.859.859 0 01-1.214 0l-5.378-5.378-.002-.002-.023-.024a8.5 8.5 0 010-12.02z"
                      />
                    </svg>
                    <div className="flex-1 pl-2 flex-col w-full">
                      <h1 className="text-[#282c3f] font-medium leading-3 text-base truncate">{x.area}</h1>
                      <h2 className="text-[#93959f] font-thin text-sm pt-2 truncate">{x.district}, {x.state}</h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <img src={locationUnservicable} alt="locationUnservicable" className="h-48 mx-auto my-10"/>
                <h2 className="text-xl font-bold tracking-tight text-[#282c3f]">No results</h2>
                <h3 className="text-[#93959f] text-sm font-light tracking-tight leading-3 pt-3">Are you sure you entered the right pincode?</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
