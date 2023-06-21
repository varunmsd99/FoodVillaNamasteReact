/*export const helpTitles = [];
helpTitles.push(...support_data.map((data) => {return data.title}));
export const queries_question = [];
queries_question.push(...support_data.map((dat) => { return dat.data.map((key) => {return key.title})}));
export const queries_solution = [];
queries_solution.push(...support_data.map((dat) => { return dat.data.map((key) => {return key.description})}));*/
import React, { useState, useEffect } from 'react';

export function CurrentTabLink() {
  const [currentURL, setCurrentURL] = useState('');
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);
  return ({currentURL});
}

export const handleClick = (event) => {
    event.preventDefault(); 
  };
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
      <li key={dat.id}>{dat.title}</li>
      <div className="footer-element-items">
        <ul>
          {[...dat.data].map((k) =>{return <li key={k}><a href="#" onClick={handleClick}>{k}</a></li>})}
        </ul>
      </div>
    </ul>
  </div>);
}



