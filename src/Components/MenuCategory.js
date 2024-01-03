import React from "react";
import MenuItem from "./MenuItem";
import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuCategory = ({title, itemCards, resDetailsData}) => {
  const menuData = itemCards.map((x) => {return x.card.info});
  const [isOpen, setIsOpen] = useState(true);
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="mb-4 cursor-pointer border-b-[16px] border-[#f1f1f6] border-solid last:border-b-0">
        <div className="flex justify-between mr-3" onClick={toggleCategory}>
          <h3 className="mb-2 font-black text-[#3e4152]">{title} ({itemCards.length})</h3>
          <div>{<FontAwesomeIcon icon={faChevronDown} className={`${isOpen ? 'rotate-180' : ''}`}/>}</div>
        </div>
        <div className="mb-5">
        {isOpen && menuData.map((obj) => {
          return <MenuItem {...obj} key={{...obj}.id} resDetailsData={resDetailsData}/>
        })} 
        </div>
    </div>
  )
}

export default MenuCategory