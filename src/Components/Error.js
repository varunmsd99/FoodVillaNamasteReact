import React from "react";
import { useRouteError, Link } from "react-router-dom";
import empty404 from "../Images/empty404.webp"

const Error = () => {
    const err = useRouteError();
    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-4">
            <img src={empty404} className="w-auto mt-12 h-[50vh]"></img>
            <h1 className="text-3xl text-[#282c3f] font-bold pt-5 tracking-tighter">Oops! Page not found.</h1>
            <h3 className="text-lg font-light leading-6 text-gray-500 pb-2 truncate tracking-tighter">Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</h3>
            <Link to="/" className="px-4 py-2 bg-[#f3730a] text-white rounded-sm font-bold mb-4 hover:shadow-md">GO HOME</Link>
        </div>
    );
};

export default Error;
