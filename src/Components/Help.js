import { useEffect, useState } from "react";
import { support_data } from "../Constant.js";
import FAQItem from "./FAQItem.js";

const Help = () => {
    const init = support_data.filter((x) => {return x.title === "General issues"}).map((x) => {return x.data});
    const titles = support_data.map((data) => {return data.title});
    [helpTitle, setHelpTitle] = useState([]);
    [FAQ, setFAQ] = useState([]);
    [activeTitle, setActiveTitle] = useState(false);
    useEffect(() => {
      setHelpTitle(titles);
      setActiveTitle(0);
      setFAQ(...init);
    }, []);
    const handleClick = (event, index) => {
      event.preventDefault();
      const text = event.target.textContent;
      const qna = support_data.filter((x) => {return x.title === text})
      setFAQ(...qna.map((x) => {return x.data}));
      setActiveTitle(index);
    };
  return (
    <div className="help">
      <div className="help-container">
        <div className="help-container-title">
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </div>
        <div className="help-quiries">
            <div className="help-quiries-title">
                <ul>                        
                  {helpTitle.map((curr, index, value) => {return <li key={index} className={`help-title-card${activeTitle === index ? '-active' : ''}`} onClick={(event) => handleClick(event, index)}><a href="">{value[index]}</a></li>})} 
                </ul>
            </div>
            <div className="help-quiries-content">
                {...FAQ.map((curr, index, val) => {
                  return (
                    <FAQItem {...val[index]} key={val[index].id} index={index}/>
                  );
                })}
            </div>
        </div>
        </div>
    </div>
  );
};
export default Help;
