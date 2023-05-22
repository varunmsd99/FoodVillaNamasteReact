import { Link } from "react-router-dom";
import emptyCart from "../Images/emptyCart.webp"

const Cart = () => {
  return (
    <div className="cart">
        <img src={emptyCart}></img>
        <h1>Your cart is empty</h1>
        <h3>You can go to home page to view more restaurants</h3>
        <Link to="/" className="cart-home">SEE RESTAURANTS NEAR YOU</Link>
    </div>
  )
}

export default Cart;