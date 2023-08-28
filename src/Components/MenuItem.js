import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MENU_ITEM_CDN_URL } from "../Helpers/Constant";

const MenuItem = ({name, description, imageId, defaultPrice, price, isVeg, variants, variantsV2}) => {
    return(
        <div className="flex justify-between items-center border-b-solid border-b-[0.5px] border-b-[#d3d3d3] my-5 pb-3 w-full last:border-b-0">
          <div className="max-w-[80%]">
            {(!isVeg)?(<h5 className="menu-item-veg-icon">{<FontAwesomeIcon className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90" icon={faPlay} />}</h5>):(<h5>{<FontAwesomeIcon className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-[2px] text-[8px]" icon={faCircle} />}</h5>)}
            <h4 className="text-[#3e4152] font-bold text-base mt-1">{name}</h4>
            {price ? (<h4 className="text-[#3e4152] font-light text-base mt-1">₹ {price/100}</h4>) : (<h4 className="text-[#3e4152] font-light text-base mt-1">₹ {defaultPrice/100}.00</h4>)}
            <h5 className="text-[#1b1c2473] font-light text-sm mt-3 tracking-tighter leading-5">{description}</h5>
          </div>
          <div className="flex flex-col items-center  ">
            {(!imageId)?(<div />):(<img src={MENU_ITEM_CDN_URL+imageId} className="object-cover rounded-md w-[120px] h-24"/>)}
            <button className="relative w-24 h-9 bottom-2 text-[#60b246] bg-white cursor-pointer rounded text-sm font-bold border-[1.11px] border-solid border-gray-300 shadow-sm transform -translate-y-1/2 z-1 hover:shadow-md">ADD</button>
          </div> 
        </div>
    )
}
export default MenuItem;