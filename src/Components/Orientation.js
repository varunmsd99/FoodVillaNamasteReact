import React from "react";
import landscape from "../Images/Landscape.webp"

const Orientation = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <img src={landscape} className="rotate-90 h-fit p-10 object-cover mx-auto"/>
        <div className="text-[#60606e] mt-10 text-center mx-10">
            <h2 className="text-lg font-bold">Rotate your device</h2>
            <h3 className="text-sm">We do not support landscape mode yet.</h3>
            <h2 className="text-sm text-red-500">For best experience, Please switch to <strong>Landscape</strong> and enable <strong>Desktop mode</strong></h2>
        </div>
    </div>
  )
}

export default Orientation
