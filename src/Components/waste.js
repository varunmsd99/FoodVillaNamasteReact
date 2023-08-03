const [filteredRestaurants, setFilteredRestaurants] = useState();
const [restaurants, setRestaurants] = useState(RestaurantList);

function isAvgRatingContent(avgRating){
    if(avgRating==='--')
    return false;
    else
    return true;
}
function AvgRatingColor(avgRating){
    
}

