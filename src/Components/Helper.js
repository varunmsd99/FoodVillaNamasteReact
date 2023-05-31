export function filterData(searchText, restaurants) {
    const filterData = restaurants.filter((restaurant) =>
      restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData;
}
export  function footData(dat){
  return (
  <div className="footer-element">
    <ul>
      <li key={dat.title}>{dat.title}</li>
      <div className="footer-element-items">
        <ul>
          {[...dat.data].map((k) =>{return <li key={k}><a href="">{k}</a></li>})}
        </ul>
      </div>
    </ul>
  </div>);
}

