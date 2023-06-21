import MenuItem from "./MenuItem";

const MenuCategory = ({title, itemCards}) => {
  const menuData = itemCards.map((x) => {return x.card.info});
  return (
    <div className="menu-category">
        <h3>{title} ({itemCards.length})</h3>
        <div className="menu-item">
        {menuData.map((obj) => {
          return <MenuItem {...obj} key={{...obj}.id} />
        })} 
        </div>
    </div>
  )
}

export default MenuCategory