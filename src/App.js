import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import Orientation from "./Components/Orientation";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./Utils/store";

const Help = lazy(() => import('./Components/Help'));
const App = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  );
  useEffect(() => {
    const handleOrientationChange = (event) => {
      setIsPortrait(event.matches);
    };
    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleOrientationChange);
    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);
  return isPortrait ? (<Orientation />) : (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <Outlet />
      </React.Fragment>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "help",
        element: 
        <Suspense>
          <Help />
        </Suspense>
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenu />
      }
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

export default App
