import unservicable from "../Images/location_unserviceable.webp"

const Unservicable = (title, imageLink) => {
  return (
    <div className="mt-32 flex flex-col items-center mx-auto justify-center max-w-sm">
        <img src={unservicable} className="w-72 h-72 my-10"/>
        <h1 className="font-black text-black text-2xl tracking-tighter leading-tight">Location Unserviceable</h1>
        <h3 className="text-base text-center mt-3 text-[#02060c99] font-normal tracking-tight px-2 leading-tight">We don't have any services here till now. Try changing location.</h3>
        <div className="mt-4 mb-10 bg-black text-white font-black text-base px-5 py-2 rounded-xl tracking-tight cursor-pointer transition-transform duration-200 ease-in-out hover:scale-95">Change Location</div>
    </div>
  )
}

export default Unservicable;