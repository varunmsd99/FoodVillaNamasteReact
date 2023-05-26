import { NavLink } from "react-router-dom";

const Help = () => {
  return (
    <div className="help">
      <div className="help-container">
        <div className="help-container-title">
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </div>
        <div className="help-quiries">
            <ul>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to='#'>Help with Orders</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>General Issues</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>Partner Onboarding</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>Legal, Terms & Conditions</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>FAQs</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>Swiggy One FAQs</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to=''>Swiggy Money FAQs</NavLink></li>
              <li><NavLink className={({ isActive }) => (isActive ? "tab-active" : "tab")} to='#'>Swiggy DineOut FAQs</NavLink></li>
            </ul>
        </div>
      </div>
    </div>
  );
};
export default Help;
