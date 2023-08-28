import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = () => {
  return (
    <div className='flex right-4 items-center'>
        <div className='flex items-center bg-[#e2e2e7] mr-3 rounded-full p-2'><FontAwesomeIcon icon={faArrowLeft} className='text-[#95989b] text-base'/></div>
        <div className='flex items-center bg-[#e2e2e7] rounded-full p-2'><FontAwesomeIcon icon={faArrowRight} className='text-[#95989b] text-base'/></div>
    </div>
  )
}
export default Slider;