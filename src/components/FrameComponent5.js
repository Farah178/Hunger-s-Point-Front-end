import "./FrameComponent5.css";
import right1  from '../assets/right1.svg'
import { useNavigate } from "react-router-dom";

const FrameComponent5 = () => {
  const navigate = useNavigate();

  const OncardClick = () => {
    
    navigate(`/location`);
  };

  return (
    <div className="review-form">
      <div className="heading4">
        <div className="what-we-believe-frame">
          <h1 className="what-we-believe4">OUR LOCATIONS</h1>
        </div>
        <div className="heading-item" />
      </div>
      <div className="contact-us-frame">
        <div onClick={() => OncardClick()} className="our-delivery-partners5">
          <div className="view-all-stores2">View All Stores</div>
          <img
            className="right-icon2"
            loading="eager"
            alt=""
            src={right1}
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent5;
