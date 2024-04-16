import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";
import FrameComponent1 from "../components/FrameComponent1";
import "./Location1.css";
import Header from "../components/Header";
import FrameComponent3 from "../components/FrameComponent3";



import image5 from  "../assets/image-5@2x.png" 
import location11 from  "../assets/location-11.svg"
import call1 from  "../assets/call1.svg"
import vector from  "../assets/vector-891.svg"
import vector92 from  "../assets/vector-92.svg"
import menu from  "../assets/menu.svg"
import basket from  "../assets/basket-1.svg"
import { setLocation } from "../redux/actions/dataActions";
import { useDispatch } from "react-redux";
import { API } from "../api/api";
import vector891  from '../assets/vector-891.svg'
import rectangle8  from '../assets//rectangle-8@2x.png'


const Location1 = () => {
  const navigate = useNavigate();

  const onLogoImageClick = useCallback(() => {
    navigate("/homepage");
  }, [navigate]);

  const onButtonsStatesContainerClick = useCallback(() => {
    navigate("/location");
  }, [navigate]);

  const onOurdeliverypartnerstextContainerClick = useCallback(() => {
    navigate("/productpage");
  }, [navigate]);

  const dispatch = useDispatch();
  const [location , setLocationdata] = useState([]);


  useEffect(() => {
    GetRestaurentData()
  }, []);

  const GetRestaurentData = async () => {
    // console.log('GetRestaurentData==in ')
    API.getInstance().menu.get("/api/restaurent")
      .then((res) => {
        // console.log(res.data.result.data,'GetRestaurentData=res.data.result.data==>')
        setLocationdata(res.data.result.data)
        dispatch(setLocation(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }



  return (
    <div className="location">
      <img
        className="frame-root-icon"
        loading="eager"
        alt=""
        src={vector92}
      />
      {/* <Header2
        setYourLocationHere="Alberta"
        onLogoImageClick={onLogoImageClick}
        onButtonsStatesContainerClick={onButtonsStatesContainerClick}
      /> */}
      {/* <Header /> */}
      <section className="locationinstances">
        <div className="locationinstances1">
          <img className="image-5-icon" alt="" src={image5} />
        </div>
      </section>
      <div className="nearbystorestext">
        <div className="categoryinstance">
          <h3 className="nearby-stores">NEARBY STORES</h3>

          <div className="frame-parent65">
                {location.map((location) => (
                  <FrameCard key={location} location={location}/>
                ))}
              </div>
          {/* <div
            className="ourdeliverypartnerstext"
            onClick={onOurdeliverypartnerstextContainerClick}
          > */}
            {/* <div className="category-24">
              <div className="location-frame1">
                <div className="hospital-frame">
                  <div className="alberta-state-frame">
                    <h1 className="alberta5">Alberta</h1>
                  </div>
                  <div className="location-parent2">
                    <img
                      className="location-icon6"
                      loading="eager"
                      alt=""
                      src={location11}
                    />
                    <h3 className="hospital-st-fort4">
                      1 Hospital St, Fort McMurrayState, Alberta, T9H 5C1
                    </h3>
                  </div>
                  <div className="call-parent1">
                    <img
                      className="call-icon4"
                      loading="eager"
                      alt=""
                      src={call1}
                    />
                    <div className="div13">(248) 676 7890</div>
                  </div>
                </div>
              </div>
              <img
                className="vectorconnectors-icon"
                loading="eager"
                alt=""
                src={vector}
              />
              <FrameComponent1 />
              <div className="buttons-states-dark-frame">
                <button className="buttons-states-dark19">
                  <img className="menu-icon6" alt="" src={menu} />
                  <div className="button27">VIEW MENU</div>
                </button>
                <button className="buttons-states-dark20">
                  <img className="basket-icon5" alt="" src={basket} />
                  <b className="button28">ORDER ONLINE</b>
                </button>
              </div>
            </div> */}

          

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};



const FrameCard = ({ location, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    GetRestaurentData()
  }, []);
  const GetRestaurentData = async () => {
    // console.log('GetRestaurentData==in ')
    API.getInstance().menu.get("/api/restaurent")
      .then((res) => {
        // console.log(res.data.result.data, 'res.data.result.data==>')
        dispatch(setLocation(res.data.result.data));
      })
      .catch((error) => {
      })
      .finally(() => {
      });
  }

  const OncardClick = (id) => {
    console.log(id,'location====')
    navigate(`/productpage?id=${id}`);
  };

  return (
    <div style={{ backgroundColor: 'rgb(54,54,54)', padding: '20px', borderRadius: '10px' }} className={`category-2-wrapper`} onClick={()=>OncardClick(location.id)}>
      <div className={`category-frame`}>
        <div className="sample">
          {/* <FrameComponent4 alberta={`Location ${location}`} /> */}
          <div className="category-2-inner2">
            <div className="frame-parent64">
              <div className="alberta-wrapper2">
                <h1 className="alberta9">{`${location.published_name}`}</h1>
              </div>
              <div className="location-parent5">
                <img className="location-icon14" alt="" src={location11} />
                <div className="hospital-st-fort7">
                  {location.address_info}
                </div>
              </div>
              <div className="call-parent4">
                <img className="call-icon7" loading="eager" alt="" src={call1} />
                <div className="div36"> {location.location_phone}</div>
              </div>
            </div>
          </div>
        </div>

        <img className={`category-2-child`} alt="" src={vector891} />
        <div className={`our-delivery-partners-parent`}>
          <div className={`our-delivery-partners`} style={{ textAlign: 'left' }}>Our Delivery Partners</div>
          <div style={{ marginBottom: '20px' }} className={`frame-parent`}>
            {[...Array(5)].map((_, index) => (
              <button key={index} style={{ marginRight: '10px', width: '60px' }} className="map-pin-group-wrapper">
                <img className="map-pin-group1" alt="" src={rectangle8} />
              </button>
            ))}
          </div>

        </div>
        <FrameComponent3 />
      </div>
    </div>

  );
};

export default Location1;

