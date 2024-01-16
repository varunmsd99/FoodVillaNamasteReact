import React from "react";
import { Link } from "react-router-dom";
import emptyCart from "../Images/emptyCart.webp";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems, removeItems, clearCart } from "../Utils/cartSlice";
import { RES_CARD_IMG_CDN_URL } from "../Helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import Success from "./Success";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const locDetails = useSelector((store) => store.location.locationDetails);
  const time = cartDetails[0]?.resDetailsData?.slaString;
  const deliveryFee = (cartDetails[0]?.resDetailsData?.deliveryFee / 100).toFixed(0);
  const distance = cartDetails[0]?.resDetailsData?.lastMileTravelString;
  const [area, setArea] = useState("");
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const handleConfirmAddress = () => {
    setConfirmAddress(!confirmAddress);
    setConfirmPayment(!confirmPayment);
  };
  const handleClearCart = () => {
    setOrderSuccess(false);
    dispatch(clearCart());
  };
  const handleIncreaseQuantity = (x) => {
    dispatch(addItems(x))
  }
  const handleDecreaseQuantity = (x) => {
    dispatch(removeItems(x))
  }
  useEffect(() => {
    if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCityName(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails]);
  useEffect(() => {
    if(orderSuccess) {
      const timeoutId = setTimeout(() => {
        handleClearCart();
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [orderSuccess]);
  const itemTotal = cartDetails.reduce((accumulator, currentItem) => {
    const itemPrice = (currentItem.price || currentItem.defaultPrice)/100 * currentItem.quantity;
    return accumulator + itemPrice;
  }, 0);
  return cartDetails.length === 0 ? (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <img src={emptyCart} className="w-auto mt-32 h-[40vh]"></img>
      <h1 className="text-2xl text-[#282c3f] font-bold pt-5 tracking-tighter">
        Your cart is empty
      </h1>
      <h3 className="text-base font-base leading-6 text-[#282c3f] pb-2 text-clip">
        You can go to home page to view more restaurants
      </h3>
      <Link
        to="/"
        className="px-4 py-2 bg-[#f3730a] text-white font-bold mb-4 hover:shadow-md"
      >
        SEE RESTAURANTS NEAR YOU
      </Link>
    </div>
  ) : (
    orderSuccess ? <Success /> : <div className="flex flex-col mt-20 bg-[#e9ecee] min-h-screen">
      <div className="flex mx-auto mt-4 xl:w-[85%] lg:w-[85%] md:w-[96%] sm:w-[96%]">
        <div className="flex-col flex-1 my-4 ml-8">
          <div className="p-8 mb-5 bg-white w-full flex">
            <div className="relative right-16 bg-[#282c3f] h-fit text-white p-2 shadow-[0px_3px_5px_0px_#282c3f66]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="-ml-4 flex-1">
              {confirmAddress ? (
                <>
                  <div className="flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex">
                        <h2 className="text-base self-center text-[#282c3f] font-bold tracking-tight leading-4 pr-3">
                          Delivery address
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="#60b246"
                          stroke="#fff"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-5" />
                        </svg>
                      </div>
                      <h2
                        className="text-orange font-bold text-sm cursor-pointer"
                        onClick={() => {
                          handleConfirmAddress();
                        }}
                      >
                        CHANGE
                      </h2>
                    </div>
                    <h2 className="text-base text-[#282c3f] font-semibold tracking-tight leading-4 mb-1">
                      Home
                    </h2>
                    <h3 className="text-sm text-[#7f828f] font-medium tracking-tight leading-3 mb-6">
                      {area}, {cityName}, {state}
                    </h3>
                    <h3 className="text-sm text-[#282c3f] font-semibold tracking-tight leading-3 mt-6">
                      {time}
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-base text-[#282c3f] font-bold tracking-tight">
                      Choose a delivery address
                    </h2>
                    <h3 className="text-sm text-[#7f828f]">
                      &nbsp; To place the order now, add your address details
                    </h3>
                  </div>
                  <div className="border border-dashed mt-6 w-80 h-fit px-4 pt-4 pb-2 cursor-pointer flex hover:shadow-[0px_2px_8px_#d4d5d9]">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#282c3f"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div className="relative flex -top-[25px] -right-[10px] rounded-full items-center justify-center w-3 h-3 bg-[#60b246] text-white text-xs">
                        +
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-base tracking-tight">
                        Add new Address
                      </h3>
                      <h3 className="overflow-clip text-[#7f828f] text-sm">
                        {area}, {cityName}, {state}
                      </h3>
                      <div className="mt-4 mb-4 border border-[#60b246] border-solid bg-[#60b246] text-center pt-3 pb-1 px-4 w-fit">
                        <h2
                          className="text-sm font-extrabold leading-4 text-[#fff]"
                          onClick={() => {
                            handleConfirmAddress();
                          }}
                        >
                          DELIVER HERE
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="px-8 py-6 bg-white w-full flex h-fit">
            <div
              className={`relative right-16 h-fit text-white p-2 shadow-[0px_3px_5px_0px_#282c3f66] ${
                confirmPayment
                  ? "bg-[#282c3f] stroke-[#fff]"
                  : "bg-white stroke-[#282c3f]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColour"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <div className="-ml-4 flex-1 self-center">
              {!confirmPayment ? (
                <>
                  <div className="font-bold text-[#82848b]">Payment</div>
                </>
              ) : (
                <>
                  <h2 className="text-base text-[#282c3f] font-bold tracking-tight">
                    Choose Payment method
                  </h2>
                  <h3 className="text-sm text-[#7f828f]">
                    Credit & Debit cards, UPI or Cash on Delivery
                  </h3>
                  <div
                    className="my-4 bg-[#60b246] py-3 text-white font-bold text-center tracking-tight cursor-pointer hover:shadow-[0px_2PX_8PX_#d4d5d9]"
                    onClick={() => {
                      setOrderSuccess(true);
                    }}
                  >
                    PLACE ORDER
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex-col ml-5 my-4 max-w-[35%]">
          <div className="flex-col pb-6 bg-white w-full h-fit">
            <Link to={`/restaurant/${cartDetails[0]?.resDetailsData?.id}`} className="flex mx-6 pt-6 pb-2">
              <img
                className="w-14 h-14 mr-3 object-cover"
                src={
                  RES_CARD_IMG_CDN_URL +
                  cartDetails[0]?.resDetailsData?.cloudinaryImageId
                }
              />
              <div className="flex flex-col text-start justify-between w-full truncate">
                <div>
                <h2 className="text-[15px] font-bold text-[#282c3f]">
                  {cartDetails[0]?.resDetailsData?.name}
                </h2>
                <h3 className="text-[13px] min-h-fit truncate text-[#686b78]">
                  {cartDetails[0]?.resDetailsData?.areaName}
                </h3>
                </div>
                <div className="h-[2px] w-10 bg-black"></div>
              </div>
            </Link>
            <div className="max-h-[67vh] overflow-y-auto">
              <div className="flex flex-col mx-6 pt-6">
                {cartDetails.map((item) => {
                  return (
                    <div className="flex w-full justify-between px-2 mb-3 last:mb-0 items-center" key={item.id}>
                      <div className="flex items-center min-w-[50%] max-w-[50%]">
                        {!item?.isVeg ? (
                          <h5 className="menu-item-veg-icon self-start">
                            {
                              <FontAwesomeIcon
                                className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90"
                                icon={faPlay}
                              />
                            }
                          </h5>
                        ) : (
                          <h5>
                            {
                              <FontAwesomeIcon
                                className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-[2px] text-[8px]"
                                icon={faCircle}
                              />
                            }
                          </h5>
                        )}
                        <h1 className="ml-2 flex-1 text-left text-sm leading-4 overflow-clip">
                          {item.name}
                        </h1>
                      </div>
                      <div className="flex border-[1.11px] border-solid border-gray-300 p-1 text-sm items-center">
                        <div className="px-2 font-bold flex-1 text-[#3e4152] cursor-pointer" onClick={() => {handleDecreaseQuantity(item)}}>-</div>
                        <div className="px-2 font-bold flex-1 text-[#60b246] text-xs">{item.quantity}</div>
                        <div className="px-2 font-bold flex-1 text-[#60b246] cursor-pointer" onClick={() => {handleIncreaseQuantity(item)}}>+</div>
                      </div>
                      <div>
                        <h3 className="text-[#686b78] text-xs">₹{item.quantity * (item.price || item.defaultPrice)/100}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex bg-[#e9ecee] items-center mx-6 rounded mt-6">
                <svg
                  className="text-[#282c3f] h-[10px] w-[15px] items-center mx-2"
                  viewBox="0 0 32 32"
                >
                  <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
                </svg>
                <input
                  className="focus:outline-none w-full py-2 bg-[#e9ecee] tracking-tighter text-sm"
                  type="text"
                  placeholder="Any suggestions? We will pass it on..."
                  value={suggestionText}
                  onChange={(e) => {
                    setSuggestionText(e.target.vale);
                  }}
                />
              </div>
              <div className="flex mx-8 mt-6 border-[#a9abb2] border-[1px] border-solid px-4 py-2 cursor-pointer hover:shadow-[0px_3px_8px_#e9e9eb]">
                <div className="self-start w-6 h-6">
                  <input
                    className={`self-start mt-1 w-4 h-4 border border-[#7e808c] border-solid cursor-pointer ${
                      isChecked ? "bg-[#60b246]" : "bg-transparent"
                    }`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </div>
                <div className="ml-2">
                  <h2 className="text-[13px] font-medium text-[#3e4152] leading-5 tracking-tighter mb-1">
                    Opt in for No-contact Delivery
                  </h2>
                  {!isChecked ? (
                    <h3 className="font-light text-xs tracking-tighter text-[#7e808c] leading-[14px]">
                      Unwell, or avoiding contact? Please select no-contact
                      delivery. Partner will safely place the order outside your
                      door (not for COD)
                    </h3>
                  ) : (
                    <h3 className="font-light text-xs tracking-tight text-[#7e808c] leading-[14px]">
                      Our delivery partner will call to confirm. Please ensure
                      that your address has all the required details.
                    </h3>
                  )}
                </div>
              </div>
              <div className="border-dashed border border-[#7e808c] flex justify-center items-center mx-8 mt-6 py-2 cursor-pointer hover:shadow-[0px_3px_8px_#e9e9eb]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="h-5 w-5 self-center"
                  fill="#686b78"
                >
                  <path d="M14.2 2.864l-1.899 1.38c-0.612 0.447-1.35 0.687-2.11 0.687h-2.352c-0.386 0-0.727 0.248-0.845 0.613l-0.728 2.238c-0.235 0.721-0.691 1.348-1.302 1.79l-1.905 1.385c-0.311 0.226-0.442 0.626-0.323 0.991l0.728 2.241c0.232 0.719 0.232 1.492-0.001 2.211l-0.727 2.237c-0.119 0.366 0.011 0.767 0.323 0.994l1.906 1.384c0.61 0.445 1.064 1.070 1.3 1.79l0.728 2.24c0.118 0.365 0.459 0.613 0.844 0.613h2.352c0.759 0 1.497 0.24 2.107 0.685l1.9 1.381c0.313 0.227 0.736 0.227 1.048 0.001l1.9-1.38c0.613-0.447 1.349-0.687 2.11-0.687h2.352c0.384 0 0.726-0.248 0.845-0.615l0.727-2.235c0.233-0.719 0.688-1.346 1.302-1.794l1.904-1.383c0.311-0.226 0.442-0.627 0.323-0.993l-0.728-2.239c-0.232-0.718-0.232-1.49 0.001-2.213l0.727-2.238c0.119-0.364-0.012-0.765-0.324-0.992l-1.901-1.383c-0.614-0.445-1.070-1.074-1.302-1.793l-0.727-2.236c-0.119-0.366-0.461-0.614-0.845-0.614h-2.352c-0.76 0-1.497-0.239-2.107-0.685l-1.903-1.382c-0.313-0.227-0.736-0.226-1.047-0.001zM16.829 0.683l1.907 1.385c0.151 0.11 0.331 0.168 0.521 0.168h2.352c1.551 0 2.927 1 3.408 2.475l0.728 2.241c0.057 0.177 0.169 0.332 0.321 0.442l1.902 1.383c1.258 0.912 1.784 2.531 1.304 4.006l-0.726 2.234c-0.058 0.182-0.058 0.375-0.001 0.552l0.727 2.237c0.48 1.477-0.046 3.096-1.303 4.007l-1.9 1.38c-0.153 0.112-0.266 0.268-0.324 0.447l-0.727 2.237c-0.48 1.477-1.856 2.477-3.408 2.477h-2.352c-0.19 0-0.37 0.058-0.523 0.17l-1.904 1.383c-1.256 0.911-2.956 0.911-4.213-0.001l-1.903-1.384c-0.15-0.11-0.332-0.168-0.521-0.168h-2.352c-1.554 0-2.931-1.001-3.408-2.477l-0.726-2.234c-0.059-0.18-0.173-0.338-0.324-0.448l-1.902-1.381c-1.258-0.912-1.784-2.53-1.304-4.008l0.727-2.235c0.058-0.179 0.058-0.373 0.001-0.551l-0.727-2.236c-0.481-1.476 0.046-3.095 1.302-4.006l1.905-1.385c0.151-0.11 0.264-0.265 0.323-0.444l0.727-2.235c0.478-1.476 1.855-2.477 3.408-2.477h2.352c0.189 0 0.371-0.059 0.523-0.17l1.902-1.383c1.256-0.911 2.956-0.911 4.212 0zM18.967 23.002c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM18.967 20.307c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM10.545 14.549c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM10.545 11.855c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM17.78 7.882l2.331 1.352-7.591 13.090-2.331-1.352 7.591-13.090z"></path>
                </svg>
                <h2 className="ml-4 text-[#686b78] tracking-tight text-base">
                  Apply Coupon
                </h2>
              </div>
              <div className="mx-4 p-2">
                <div className="text-[#282c3f] text-sm font-bold pt-4 tracking-tight">
                  Bill Details
                </div>
                <div className="flex justify-between text-[#686b78] text-xs font-normal pt-4">
                  <h3>Item Total</h3>
                  <h3 className="text-nowrap">₹ {Number(itemTotal)}</h3>
                </div>
                <div className="flex justify-between border-b border-solid text-[#686b78] text-xs font-normal pb-4 pt-1">
                  <div className="flex items-end">
                    Delivery Fee | {distance}
                    <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                      i
                    </div>
                  </div>
                  <h3 className="text-nowrap">₹ {Number(deliveryFee) || (Number(distance.split(' ')[0])*6.8).toFixed(2)}</h3>
                </div>
              </div>
            <div className="mx-4 p-2">
              <div className="flex justify-between text-[#686b78] text-xs font-normal">
                <h3>Delivery Tip</h3>
                <h3 className="text-red-500 text-nowrap">Add Tip</h3>
              </div>
              <div className="flex justify-between text-[#686b78] text-xs font-normal pt-1">
                <div className="flex items-end">
                  Platform Fee
                  <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                    i
                  </div>
                </div>
                <span className="flex">
                  <h3 className="text-[#d3d3d3] line-through pr-1">₹ 5.00</h3>
                  <h3>3</h3>
                </span>
              </div>
              <div className="flex justify-between border-b border-solid border-[#282c3f] text-[#686b78] pb-3 text-xs font-normal pt-1">
                <div className="flex items-end">
                  GST and Restaurant Charges
                  <div className="ml-2 rounded-full border-[#686b78] border px-[4px] text-[10px] leading-3 text-[#686b78] font-bold flex self-baseline">
                    i
                  </div>
                </div>
                <h3 className="text-nowrap">
                  ₹ {(Number(itemTotal) * 0.18).toFixed(2)}
                </h3>
              </div>
            </div>
            </div>
            <div className="flex justify-between text-[#282c3f] text-sm font-extrabold mx-4 px-2 my-2 tracking-tight">
              <h3>TO PAY</h3>
              <h3 className="text-nowrap">
                ₹{" "}
                {(
                  Number(itemTotal) +
                  Number(Number(deliveryFee) || (Number(distance.split(' ')[0])*6.8).toFixed(2)) +
                  3 +
                  Number(0.18 * itemTotal)
                ).toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="p-3 w-full h-fit bg-white mt-5">
            <div className="flex-col border p-3">
              <div className="text-[13px] font-black tracking-tighter leading-4 mb-3 text-[#3e4152]">
                Review your order and address details to avoid cancellations
              </div>
              <div className="text-[11px] mb-3 tracking-tighter">
                <span className="text-red-500">Note: </span>If you cancel within
                60 seconds of placing your order, a 100% refund will be issued.
                No refund for cancellations made after 60 seconds.
              </div>
              <div className="text-[#808080] text-[11px] mb-3">
                Avoid cancellation as it leads to food wastage.
              </div>
              <div className="text-red-500 tracking-tighter text-xs cursor-pointer border-b border-dotted w-fit border-red-500">
                Read cancellation policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
