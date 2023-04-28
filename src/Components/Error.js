import { useRouteError, Link } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return (
        <div className="error">
            <h1>Oops! Page not found.</h1>
            <h3>Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</h3>
            <Link to="/">Back Home</Link>
        </div>

    );
};

export default Error;