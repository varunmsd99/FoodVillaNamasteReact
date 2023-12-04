import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Img from "../Images/popularCuisines/*.webp";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  window.scrollTo(0, 0);
  return (
    <div className="mt-32 min-h-screen">
      <div className="flex items-center justify-start mx-auto w-[60%] border-2 border-[text-[#686b78]] text-[#686b78]">
        <input
          type="text"
          className="flex-1 px-3 py-3 focus:outline-none"
          placeholder="Search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <FontAwesomeIcon icon={faSearch} className="text-[#7e818d] py-2 pr-4"/>
      </div>
      <div className="mx-auto mt-10 w-[60%]">
        <h2 className="text-left font-black text-[#3d4152] pl-2 pb-15 pt-5 text-2xl tracking-tighter leading-tight">Popular Cuisines</h2>
        <span className="flex h-[108px] flex-start overflow-hidden">
          {Object.entries(Img).map(([key, value]) => (
            <img key={key} src={value} className="p-2"/>
          ))}
        </span>
      </div>
    </div>
  );
};
export default Search;
