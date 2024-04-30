import React, { useState } from "react";
import { useFormik, FormikErrors, Formik,Form ,Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { routeVariants, childVariants } from '../../../variants/framerMotionVariants';

import { SubMenuPagesHeader } from "../../../components/SubMenuPagesHeader";
import pageBannerImg from "../../../assets/top_banner.jpg";
import sideImg1 from "../../../assets/images/career-img-1.png"
import sectionBanner from "../../../assets/images/sectiob-banner-img-2.png";
import DarkMode from "../../../components/DarkMode";
import DescriptionSection from "../../../components/page_section/DescriptionSection";
import ImagesSection from "../../../components/page_section/ImagesSection";
import { API } from "../../../api/api";
import { convertToBase64 } from "../../../utils/Appconstants";
import FeedbackForm from "../../../components/FeedbackForm/feedbackform";
import DarkMode1 from "../../../components/DarkMode1";

export const Careers = () => {
  const [coverLetterUploaded, setCoverLetterUploaded] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false); // State variable to store isValid value

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone_number: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
    email_id: Yup.string().email('Invalid email').required('Email is required'),
    feedboack_opt: Yup.string().required('Please select an option'),
    // resume: Yup.mixed().when('feedboack_opt', {
    //   is: 'Careers',
    //   then: Yup.mixed().required('Resume is required'),
    //   otherwise: Yup.mixed()
    // })
  });
  
  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email_id: '',
    feedboack_opt: '',
    message:'',
    cover_letter: null,
    resume: null,
  };
  const handleSubmit = async (values, { setSubmitting }) => {

    // Prepare data for API call
    const formData = new FormData();
    console.log('First Name:', values.first_name);
    formData.append('first_name', values.first_name || '');
    formData.append('last_name', values.last_name);
    formData.append('phone_number', values.phone_number);
    formData.append('email_id', values.email_id);
    formData.append('feedboack_opt', values.feedboack_opt);
    // if (values.feedboack_opt === 'Careers') {
    //   formData.append('cover_letter', values.cover_letter);
    // }
    // formData.append('resume', values.resume);
    console.log(values.first_name, 'formData========>values.first_name');
    console.log(formData, 'formData========>');
    console.log(values, 'values========>111');


    // Check if photo exists and convert it to base64 if it does
    console.log(values.cover_letter,'cover_letter==>outside' )
    if (values.cover_letter && values.cover_letter instanceof Blob) {
      console.log(values.cover_letter,'cover_letter==>inside' )
      const base64Image = await convertToBase64(values.cover_letter);
      // Update the values with the base64-encoded image
      values.cover_letter = base64Image;
    } else {
      // If photo doesn't exist or is not a Blob, remove it from the values object
      delete values.cover_letter;
    }
    // Check if photo exists and convert it to base64 if it does
    if (values.resume && values.resume instanceof Blob) {
      const base64Image = await convertToBase64(values.resume);
      // Update the values with the base64-encoded image
      values.resume = base64Image;
    } else {
      // If photo doesn't exist or is not a Blob, remove it from the values object
      delete values.resume;
    }


    // Optional: Set submitting state to true while making the API call
    setSubmitting(true);
  
    API.getInstance().menu.post(`/api/submit-form`,values)
        .then((res) => {
          console.log(res,'response');
        
        })
        .catch((error) => {
        })
  };
  const options = [
    { value: '', label: 'Apply For' },
    { value: 'Careers', label: 'Careers' },
    { value: 'Franchises', label: 'Franchises' },
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Event', label: 'Event' }
  ];
  return (
    <>
      <motion.div
        variants={routeVariants}
        initial="initial"
        animate="final"
        className="fp-container-main container--careers"
      >
        <SubMenuPagesHeader bannerImg={pageBannerImg} />
        <DescriptionSection
          Title="Careers"
          rightImg={sideImg1}
          leftDescription={
            <>
              <p className="mt-4">
                Dolore ullamco mollit elit non ea pariatur mollit magna
                cupidatat labore sunt consequat elit. Est ad cupidatat velit
                anim aliquip in anim mollit. Excepteur incididunt ex sint labore
                velit ut aliquip ad magna exercitation qui dolor laborum. Veniam
                ad consectetur aliquip cupidatat aute sunt cupidatat ea.
                Pariatur pariatur qui esse cupidatat commodo ullamco ex. Nulla
                officia veniam ex culpa officia ad ex dolor nostrud in. Ullamco
                labore nulla proident nisi. Cupidatat sit aute esse id.
              </p>

              <p className="mt-4">
                Nulla quis qui duis amet sunt. Nisi mollit ad sint exercitation
                anim veniam enim laboris id ad adipisicing laboris aliqua.
                Veniam commodo reprehenderit mollit cupidatat minim officia
                voluptate dolor minim proident et magna dolore. Ea proident sit
                laborum amet amet veniam. Labore Lorem et quis fugiat sint
                fugiat. Enim ad proident nisi ipsum nostrud duis.
              </p>
            </>
          }
        />
        {/* types: side_section(rightImg, leftImg), banner(bannerImg) , banner_with_text(bannerText1, bannerText2)*/}
        <ImagesSection type="banner" bannerImg={'https://placehold.co/1280x380'} />

        <section className="fp-wrapper-main bottom-form-container">
          <div className="sec-info--w gap-6 justify-between">
            <div className="side--w">
              <div className="para-container">
                <div className="fp-para-section-title-sm w-2/3">
                  Fill the details and our team will get back to you shortly
                </div>
                <div className="fp-para-section-title w-2/3">
                  JOIN OUR TEAM NOW
                </div>
              </div>
            </div>
            <div className="side--w">
            <FeedbackForm/>
            </div>
          </div>
        </section>
      </motion.div>
      <DarkMode1 />
    </>
  );
};
