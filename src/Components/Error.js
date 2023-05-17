import { useRouteError, Link } from "react-router-dom";
import empty404 from "../Images/empty404.webp"

const Error = () => {
    const err = useRouteError();
    return (
        <div className="error">
            <img src={empty404}></img>
            <h1>Oops! Page not found.</h1>
            <h3>Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</h3>
            <Link to="/" className="home">GO HOME</Link>
        </div>
    );
};

export default Error;