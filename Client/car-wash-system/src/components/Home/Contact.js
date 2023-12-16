import React from "react";
import "./Contact.css";
import { Card, CardContent } from "@material-ui/core";
import { FiPhone } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'
import office from '../../Images/office.jpg'
import phone from '../../Images/phone.png'
import email from '../../Images/email.png'

function Contact() {
  return (
    <>
    
    <div className="containercontact">
      <div className="inner">
        <div className="number">
          <p className='contact_heading'>Helpline Numbers</p>
          <br />
          <div className="line"></div>
          <div className="inner_content">
            <div className=" inner_heading">
              <span className='con'> <FiPhone /></span>
              9876543210
              <div className="inner_img">
                <img src={phone} alt="" className='image_phone' />
              </div></div>
          </div>
        </div>
        <div className="email">
          <p className='contact_heading'>Email Id</p>
          <br />
          <div className="line"></div>
          <div className=" inner_heading">
            <span className='con'> <MdEmail /></span>
            emechanic@gmail.com
            <div className="inner_img">
              <img src={email} alt="" className='image_email' />
            </div>
          </div>
        </div>

      </div>
      <div className="office">
        <p className='contact_heading'>
          Corporate Office Address
        </p>
        <br />
        <div className="line"></div>
        <div className=" inner_heading">3rd Floor, Landmark Tower, Moti VIhar, Ashok Marg,
          South City I, Sector 41, Gurugram, Haryana 122001</div>
        <div className="inner_img">
          <img src={office} alt="" className='image_address' />
        </div>
      </div>
    </div>
      <div className="contactus">
      {/* <Link  to="/contactus" className='contactlick'>
            Contact US
          </Link> */}
      </div>

  </>


  );
}

export default Contact;
