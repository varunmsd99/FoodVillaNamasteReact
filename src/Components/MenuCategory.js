import MenuItem from "./MenuItem";
import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuCategory = ({title, itemCards}) => {
  const menuData = itemCards.map((x) => {return x.card.info});
  const [isOpen, setIsOpen] = useState(true);
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`menu-category ${isOpen ? 'active' : ''}`}  onClick={toggleCategory}>
        <div className="menu-category-header">
          <h3>{title} ({itemCards.length})</h3>
          <div className={`menu-chevron-down ${isOpen ? 'active' : ''}`}>{<FontAwesomeIcon icon={faChevronDown} />}</div>
        </div>
        <div className="menu-item">
        {isOpen && menuData.map((obj) => {
          return <MenuItem {...obj} key={{...obj}.id} />
        })} 
        </div>
    </div>
  )
}

export default MenuCategory