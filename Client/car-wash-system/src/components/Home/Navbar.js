import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        console.log("");
      });
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__scroll"}`}>
      <a href="/">
        <img
          className="nav__logo"
          src="https://image4.owler.com/logo/wype_owler_20160516_093705_original.jpg"
          alt="WYPE LOGO"
        />
      </a>
      <div
        className={`nav__container nav__borderXwidth ${
          show && "nav__containerscroll nav__borderXwidthscroll"
        }`}
      >
        <Link
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/"
        >
          HOME
        </Link>
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/working"
        >
          HOW IT WORKS
        </a>
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/contact"
        >
          CONTACT US
        </a>
      
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/login"
        >
          LOGIN
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
