import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MENU_ITEM_CDN_URL } from "../Constant";

const MenuItem = ({name, description, imageId, defaultPrice, price, isVeg, variants, variantsV2}) => {
    return(
        <div className="menu-item-card">
          <div className="menu-item-details">
            {(!isVeg)?(<h5 className="menu-item-veg-icon">{<FontAwesomeIcon className="nonVeg-icon" icon={faPlay}></FontAwesomeIcon>}</h5>):(<h5>{<FontAwesomeIcon className="veg-icon" icon={faCircle}></FontAwesomeIcon>}</h5>)}
            <h4 className="menu-item-name">{name}</h4>
            {price ? (<h4 className="menu-item-price">₹ {price/100}.00</h4>) : (<h4 className="menu-item-price">₹ {defaultPrice/100}.00</h4>)}
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