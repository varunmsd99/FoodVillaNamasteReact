import React from 'react'

const ResetCart = () => {
  return (
    <div className='shadow-[0px_2px_20px_0px_#282c3f80]'>
        <h1>Items already in cart</h1>
        <h2>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</h2>
        <div>
            <div>NO</div>
            <div>YES, START AFRESH</div>
        </div>
    </div>
  )
}

export default ResetCart