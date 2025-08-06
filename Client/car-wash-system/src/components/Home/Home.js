import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import WhyUs from "./WhyUs";
import Login from "./Login";
import Register from "./Register";
import Member_Login from "../Member/Member_Login";
import Contact from "./Contact";
import Working from "./Working";
import Footer from "./Footer";

function HomeContent() {
  const location = useLocation();
  
  // Routes where footer should be shown
  const showFooterRoutes = ['/working', '/contact', '/'];
  const shouldShowFooter = showFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={WhyUs} />
        <Route exact path="/working" component={Working} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/member_login" component={Member_Login} />
      </Switch>
      {shouldShowFooter && <Footer />}
    </>
  );
}

function Home() {
  return (
    <Router>
      <HomeContent />
    </Router>
  );
}

export default Home;
