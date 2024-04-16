import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyAddressesText from "./MyAddressesText";
import "./EpbackFrame1.css";
import materialsymbolslighteditoutline  from '../assets/materialsymbolslighteditoutline.svg'
import { useAuth0 } from "@auth0/auth0-react";
import { API } from "../api/api";
import { useDispatch } from "react-redux";
import { setUserAddressdata, setUserdata } from "../redux/actions/dataActions";
const EpbackFrame1 = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [address_list, setAddresslist] = useState([]); 
  const dispatch = useDispatch();

  useEffect(() => {
    GetUserAddressdata()
  }, []);


  const GetUserAddressdata = async () => {
    if (user?.email){
      API.getInstance().menu.get(`/api/custom-user?email_id=${user?.email}`)
      .then((res) => {
        // console.log(res.data.result.data,'GetUserData======>')
        setAddresslist(res.data.result.data[0].address_list)
        dispatch(setUserAddressdata(res.data.result.data[0].address_list));
        dispatch(setUserdata(res.data.result.data[0]));
        
      })
      .catch((error) => {
      })
      .finally(() => {
      });
    }
      
  }


  const onEpbackIconClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onButtonsStatesDarkClick = (method) => {
    console.log(method,'methodmethodmethodmethod')
    navigate("/myaddress", { state: { method: method,item:'null' } });
  }
  const onButtonsEditClick = (method,item) => {
    console.log(method,'methodmethodmethodmethod')
    navigate("/myaddress", { state: { method: method ,selected_item_id:item.id} });
  }

  return (
    <section className="epback-frame1">
      <MyAddressesText onEpbackIconClick={onEpbackIconClick} />
      <div className="divider-line3">
        <div className="summary-frame2">
          <div className="divider26" />
        </div>
      </div>

      <div>
      {address_list && address_list.map((item, index) => (
        <div key={index} className="summary9">
          <div className="buttons-states-dark-instance">
            <div className="st-churchstreet-vancover-frame">
              <div className="street-address-text">
                <b className="john-smith7">{item.f_name}</b>
                <div className="john-smithtext">{item.phone_number}</div>
                <div className="st-churhc-street">{item.complete_address}</div>
                <div className="canada1">{item.city}</div>
              </div>
              <img
                className="material-symbols-lightedit-ou-icon1"
                loading="eager"
                alt=""
                onClick={() => onButtonsEditClick('EDIT',item)}
                src={materialsymbolslighteditoutline} // Assuming item.icon is the URL of the image
              />
            </div>
          </div>
        </div>
      ))}
    </div>


      {/* <div className="summary9">
        <div className="buttons-states-dark-instance">
          <div className="st-churchstreet-vancover-frame">
            <div className="street-address-text">
              <b className="john-smith7">John Smith</b>
              <div className="john-smithtext">+1616890234</div>
              <div className="st-churhc-street">
                12, St churhc street, Vancover
              </div>
              <div className="canada1">Canada</div>
            </div>
            <img
              className="material-symbols-lightedit-ou-icon1"
              loading="eager"
              alt=""
              src={materialsymbolslighteditoutline}
            />
          </div>
        </div>
      </div> */}
      <button
        className="buttons-states-dark56"
        onClick={() => onButtonsStatesDarkClick('ADD')}
      >
        <b className="button68">Add New Address</b>
      </button>
    </section>
  );
};

export default EpbackFrame1;
