import { shimmer_display_count } from "../Constant.js";

const shimmerCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-image"></div>
      <div className="shimmer-restaurant-name"></div>
      <div className="shimmer-cuisine"></div>
      <div className="shimmer-span"></div>
    </div>
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
