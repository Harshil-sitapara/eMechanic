import React from "react";
import "./WhyUs.css";
import CheckIcon from "@material-ui/icons/Check";
import banner_2 from "../../assets/images/banner_2.jpg";
import banner_3 from "../../assets/images/banner_3.png";
import banner_4 from "../../assets/images/banner_4.png";
import banner_5 from "../../assets/images/banner_5.png";
import { BsPeopleFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { HiWrench } from "react-icons/hi2";
import home from '../../../src/Images/home.png'

function WhyUs() {
  return (
    <div className="component">
      <div className="banner">
        <div>
          <img className="banner__image" src={"https://img.freepik.com/free-photo/auto-mechanic-checking-car_1303-14042.jpg?w=996&t=st=1701621783~exp=1701622383~hmac=b03175a3878acdd1acece26a1b9555a006c59f72abef872187381148adcf9b0a"} alt="WYPE LOGO" />
        </div>
        <div className="banner__contentRight">
          <br /> <br /> <br />
          <h1 className="banner__heading">THE BEST CAR SERVICE AWAITS YOU</h1>
          <br></br>
          <p className="banner__para">
            Your Car deserves nothing but the best car repair and services in
            town. Book a seemless car service experience with us.
          </p>
        </div>
      </div>

      <hr />
      <h1 className="banner__heading">The Wype Way</h1>
      <h4 className="banner__feature">
        CONVENIENT • TRANSPARENT • QUALITY • RELIABLE
      </h4>
      <hr />

      <div className="banner">
        <div className="banner__contentLeft">
          <h1 className="feature__heading">CONVENIENT</h1>
          <br></br>
          <h4 className="feature__subHeading">Lets stay home & stay safe</h4>
          <p className="banner__para">
            That's the best thing you can do right now to keep your loved ones
            safe because staying at home everyday keeps Corona away.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Service right at your doorstep.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Online payments. Hassle free and
            safe.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Fast delivery. We value your time.
          </p>
        </div>
        <div>
          <img className="banner__image" src={"https://img.freepik.com/premium-photo/mechanic-man-shows-car-report-digital-tablet-middle-east-customer-garage_43263-3138.jpg?size=626&ext=jpg&ga=GA1.1.1931642287.1700301844&semt=ais"} alt="WYPE LOGO" />
        </div>
      </div>

      <div className="banner">
        <div>
          <img className="banner__image" src={"https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="WYPE LOGO" />
        </div>
        <div className="banner__contentRight">
          <h1 className="feature__heading">TRANSPARENT</h1>
          <br></br>
          <h4 className="feature__subHeading">
            To let you enjoy your peace of mind
          </h4>
          <p className="banner__para">
            We fix even your trust in car service and repair because we have
            build our business on trust.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Up front pricing.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Service beyond the standards.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Real time updates.
          </p>
        </div>
      </div>

      <div className="banner">
        <div className="banner__contentLeft">
          <h1 className="feature__heading">QUALITY</h1>
          <br></br>
          <h4 className="feature__subHeading">It's Our responsibility</h4>
          <p className="banner__para">
            We are committed to quality and take car care seriously. Top-notch
            service is our main auto motive.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Skilled technicians.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Genuine spares.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Service warranty.
          </p>
        </div>
        <div>
          <img className="banner__image" src={"https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="WYPE LOGO" />
        </div>
      </div>
    </div>
   
  );
}

export default WhyUs;
