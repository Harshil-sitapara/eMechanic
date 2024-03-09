import React, { useEffect } from "react";
import CarouselComponent from "./CarouselComponent";
import Brands from "./Brands";

function Demo(props) {
  useEffect(()=>{
    document.title = "Emechanic"
  },[])
  return (
    <div>
      <CarouselComponent />
      <Brands />
    </div>
  );
}

export default Demo;
