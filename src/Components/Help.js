import { support_data } from "../Constant.js";

const Help = () => {
    const helpTitles = [];
    helpTitles.push(...support_data.map((data) => {return data.title}));
    const queries_question = [];
    queries_question.push(...support_data.map((dat) => { return dat.data.map((key) => {return key.title})}));
    const queries_solution = [];
    queries_solution.push(...support_data.map((dat) => { return dat.data.map((key) => {return key.description})}));
    //console.log(queries_question);
    //console.log(queries_solution);
    console.log(...queries_question[0].map((n) => {return n}));
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
                    {helpTitles.map((curr, index, value) => {return <li key={index} className={index}><a href="/">{value[index]}</a></li>})} 
                </ul>
            </div>
            <div className="help-quiries-content">
                <ul>
                    {...queries_question[4].map((n) => {return <li>{n}</li>})}
                </ul>
            </div>
        </div>
        </div>
    </div>
  );
};
export default Help;
