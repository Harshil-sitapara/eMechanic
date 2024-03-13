import React, { useEffect, useState } from "react";
import "../../Home/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../../../services/member/auth_service";

function MechanicNav() {
  const [show, setShow] = useState(false);
  const [currentLoginMech, setCurrentLoginMech] = useState(null);
  
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const fetchCurrentMechanic = async () => {
    const mechanic = await AuthService.getCurrentMechanic();
    setCurrentLoginMech(mechanic);
    console.log("current",currentLoginMech)
  };
  useEffect(()=>{
    fetchCurrentMechanic(); 
  },[])

  const logout = () => {
    AuthService.logoutMechanic();
    window.location.reload()
  };

  return (
    <nav className={`nav ${show && "nav__scroll"}`}>
      <a href="/mechanic_home">
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
        <NavLink
          className={`nav__link ${show && "nav__linkscroll"}`}
          to="/mechanic_home"
        >
          {currentLoginMech ? currentLoginMech.name : 'MECHANIC'}
          {/* mechanic */}
        </NavLink>
        <a
          onClick={logout}
          className={`nav__link ${show && "nav__linkscroll"}`}
          href="/member_login"
        >
          LOGOUT
        </a>
      </div>
    </nav>
  );
}

export default MechanicNav;
