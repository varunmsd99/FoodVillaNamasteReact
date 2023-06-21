import { ICON_CDN_URL_18, ICON_CDN_URL_28 } from "../Constant";

const OfferCard = ({ couponCode, description, descriptionTextColor, header, offerLogo, offerTag, offerTagColor}) => {
    const offerTagColorStyle = {
        color: offerTagColor
    }
    const offerHeaderIcon = (offerLogo.includes("offers/"))?ICON_CDN_URL_18+offerLogo:ICON_CDN_URL_28+offerLogo;
    return (
    <div className="offer-card">
        {!offerTag?(<div></div>):(<div className="offer-tag" style={offerTagColorStyle}>{offerTag}</div>)}
        <div className="offer-details">
            <div className="offer-header"><img src={offerHeaderIcon} />{header}</div>
            <div className="offer-description">{couponCode}&nbsp;&nbsp; | &nbsp;&nbsp;{description}</div>
        </div>
    </div>
  )
}

export default OfferCard;