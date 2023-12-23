import landscape from "../Images/Landscape.webp"

const Orientation = () => {
  return (
    <div className="h-screen mt-24">
        <img src={landscape} className="rotate-90 h-[50vh] mx-auto object-cover"/>
        <div className="text-[#60606e] mt-10 text-center mx-10">
            <h2 className="text-lg font-bold">Rotate your device</h2>
            <h3 className="text-sm">We do not support landscape mode yet. Please go back to portrait mode for the best experience</h3>
        </div>
    </div>
  )
}

export default Orientation