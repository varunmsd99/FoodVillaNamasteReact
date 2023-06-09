import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Search from "./Components/Search";
import Contact from "./Components/Contact";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";

const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
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
        element: <Body />,
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