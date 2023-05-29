import { NavLink } from "react-router-dom";
import { support_data } from "../Constant.js"

const Help = () => {
  const helpTitles = [];
  helpTitles.push(...support_data.map((data) => {return data.title}));
  const queries = [];
  queries.push(...support_data.map((dat) => {return dat.title, dat.data}));
  console.log(queries);
  return (
    <div className="help">
      <div className="help-container">
        <div className="help-container-title">
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </div>
        <div className="help-quiries">
            <ul>
               {helpTitles.map((value) => {return <li key={value}><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to="/">{value}</NavLink></li>})} 
            </ul>
        </div>
      </div>
    </div>
  );
};
export default Help;
