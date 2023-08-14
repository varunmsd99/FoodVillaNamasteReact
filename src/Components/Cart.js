import { Link } from "react-router-dom";
import emptyCart from "../Images/emptyCart.webp"

const Cart = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
        <img src={emptyCart} className="w-auto mt-32 h-[40vh]"></img>
        <h1 className="text-2xl text-[#282c3f] font-bold pt-5 tracking-tighter">Your cart is empty</h1>
        <h3 className="text-base font-base leading-6 text-[#282c3f] pb-2 text-clip">You can go to home page to view more restaurants</h3>
        <Link to="/" className="px-4 py-2 bg-[#f3730a] text-white font-bold mb-4 hover:shadow-md">SEE RESTAURANTS NEAR YOU</Link>
    </div>
  )
}

export default Cart;