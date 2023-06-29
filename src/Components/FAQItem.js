import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FAQItem = ({ title, description }) => {
  [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="faq-card">
        <div className={`faq-question ${(description !== null) && isOpen ? 'active' : ''}`} onClick={toggleFAQ}>
            <h3>{title}</h3>
            {(description)?<div className={`faq-chevron-down ${isOpen ? 'active' : ''}`}>{<FontAwesomeIcon icon={faChevronDown} />}</div>:<div />}
        </div>
        {isOpen && (description)?
        <div className="faq-answer">
            <h3>{description}</h3>
        </div>: <div />}
    </div>
  )
}

export default FAQItem;