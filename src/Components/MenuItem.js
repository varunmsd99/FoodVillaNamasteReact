import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MENU_ITEM_CDN_URL } from "../Helpers/Constant";

const MenuItem = ({name, description, imageId, defaultPrice, price, isVeg, variants, variantsV2}) => {
    return(
        <div className="flex justify-between items-center border-b-solid border-b-[0.5px] border-b-[#d3d3d3] my-5 pb-3 w-full last:border-b-0">
          <div className="menu-item-details">
            {(!isVeg)?(<h5 className="menu-item-veg-icon">{<FontAwesomeIcon className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90" icon={faPlay} />}</h5>):(<h5>{<FontAwesomeIcon className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-[2px] text-[8px]" icon={faCircle} />}</h5>)}
            <h4 className="menu-item-name">{name}</h4>
            {price ? (<h4 className="menu-item-price">₹ {price/100}</h4>) : (<h4 className="menu-item-price">₹ {defaultPrice/100}.00</h4>)}
            <h5 className="menu-item-description">{description}</h5>
          </div>
          <div className="menu-item-img">
            {(!imageId)?(<div />):(<img src={MENU_ITEM_CDN_URL+imageId} />)}
            <button className="add-button">ADD</button>
          </div> 
        </div>
    )
}
export default MenuItem;