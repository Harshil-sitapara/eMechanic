import React from "react";
import "./Footer.css";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-copyright text-center py-3">
        <h5>
          &copy; {new Date().getFullYear()} All Rights Reserved |
          <b style={{ fontWeight: 600 }}> eMechanic</b>
        </h5>
      </div>
    </div>
  );
};

export default Footer;
