import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on route change or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      <button
        className={`nav__hamburger${menuOpen ? " nav__hamburger--open" : ""}`}
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? (
          <FaTimes size={24} color="#333" />
        ) : (
          <FaBars size={24} color="#333" />
        )}
      </button>
      <div
        className={`nav__container nav__borderXwidth ${
          show ? "nav__containerscroll nav__borderXwidthscroll" : ""
        }${menuOpen ? " nav__container--open" : ""}`}
      >
        <Link
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          HOME
        </Link>
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/working"
          onClick={() => setMenuOpen(false)}
        >
          HOW IT WORKS
        </a>
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          CONTACT US
        </a>
        <a
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/login"
          onClick={() => setMenuOpen(false)}
        >
          LOGIN
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
