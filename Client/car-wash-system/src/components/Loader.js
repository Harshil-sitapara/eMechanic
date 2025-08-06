import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loader = ({ size = 40, style = {} }) => {
  const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
    ...style
  };    

  return (
    <div style={defaultStyle}>
      <CircularProgress size={size} />
    </div>
  );
};

export default Loader; 