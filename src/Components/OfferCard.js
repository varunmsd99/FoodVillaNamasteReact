import { ICON_CDN_URL_18, ICON_CDN_URL_28 } from "../Helpers/Constant";

const OfferCard = ({ couponCode, description, descriptionTextColor, header, offerLogo, offerTag, offerTagColor}) => {
    const offerTagColorStyle = {
        color: offerTagColor
    }
    const offerHeaderIcon = (offerLogo.includes("offers/"))?ICON_CDN_URL_18+offerLogo:ICON_CDN_URL_28+offerLogo;
    return (
    <div className="flex p-1 min-w-[200px] h-[68px] border border-gray-300 rounded-lg shadow">
        {(!offerTag && offerTag !=='DEFAULT')?(<div></div>):(<div className="flex text-center items-center justify-center px-1 -rotate-180 [writing-mode:vertical-lr] font-bold border-l-[#d7d7d7] border-l-[1px] border-l-solid text-[9.8px]" style={offerTagColorStyle}>{offerTag}</div>)}
        <div className="flex flex-col items-start justify-center ml-1">
            <div className="flex items-center text-sm font-black text-[#686b78] leading-3"><img src={offerHeaderIcon} className="w-5 h-5 mr-1"/>{header}</div>
            <div className="text-[12px] font-bold text-[#93959f] -tracking-[0.75px]">{couponCode}&nbsp; | &nbsp;{description}</div>
        </div>
    </div>
  )
}

export default OfferCard;