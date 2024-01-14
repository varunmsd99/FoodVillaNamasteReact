import React from 'react';
import { useContext } from 'react';
import MyContext from '../Utils/MyContext';
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Utils/cartSlice";

const ResetCart = () => {
  const dispatch = useDispatch();
  const context = useContext(MyContext);
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const handleYes = () => {
    dispatch(clearCart());
    context.hideResCartAlert()
  }
  return (
    <div className='fixed w-screen left-0 right-0 bottom-10'>
        <div className='flex flex-col min-w-80 max-w-[520px] mx-auto bg-white p-8 shadow-[0px_2px_20px_0px_#282c3f80]'>
        <h1 className='text-[#282c3f] font-bold text-xl pb-1 tracking-tight'>Items already in cart</h1>
        <h2 className='text-[#535665] text-sm tracking-tight'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</h2>
        <div className='flex pt-8 gap-x-5'>
            <div className='flex flex-1 justify-center items-center bg-white text-[#60b246] font-extrabold font-xl border-[2px] border-solid border-[#60b246] py-3 cursor-pointer tracking-tight hover:shadow-[0px_2px_8px_0px_#d4d5d9]' onClick={() => {context.hideResCartAlert()}}>NO</div>
            <div className='flex flex-1 justify-center items-center bg-[#60b246] text-white font-bold font-xl border-[2px] border-solid border-[#60b246] py-3 cursor-pointer tracking-tight hover:shadow-[0px_2px_8px_0px_#d4d5d9]' onClick={handleYes}>YES, START AFRESH</div>
        </div>
        </div>
    </div>
  )
}

export default ResetCart