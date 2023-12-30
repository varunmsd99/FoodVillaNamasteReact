import React from "react";
import { shimmer_display_count } from "../Constant.js";

const shimmerCard = () => {
  return (
    <div className="shimmer-card" />
  );
};
const shimmer = () => {
    return(
        <div className="shimmer-container">
            {Array(shimmer_display_count).fill("").map((element, index) => {
                return <shimmerCard key={index} />
            })}
        </div>
    );
};
export default shimmer;
