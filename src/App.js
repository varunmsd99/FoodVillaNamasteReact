import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Contact from "./Components/Contact";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./Utils/store";

const AppLayout = () => {
  return (
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
    element: <AppLayout />,
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
        element: <Help />,
      },
      {
        path: "contact",
        element: <Contact />,
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