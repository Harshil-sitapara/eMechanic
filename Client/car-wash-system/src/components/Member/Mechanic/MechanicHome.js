import React, { useEffect, useState } from "react";
import "../Admin/CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({ 
  activeItem: {
    backgroundColor: "#cbcbcb",
  },
}));

function MechanicHome(props) {
  const { history } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    document.title = "Dashboard - Mechanic";
  }, []);

  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    history.push(path);
  };

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => handleItemClick(0, "/mechanic_home"),
    },
    {
      text: "FIND ORDERS",
      icon: <DriveEtaIcon />,
      onClick: () => handleItemClick(1, "/mechanic_home/findOrders"),
    },
    {
      text: "MY ORDERS",
      icon: <MonetizationOnIcon />,
      onClick: () => handleItemClick(2, "/mechanic_home/myorders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/login"),
    },
  ];
  return (
    <>
      <div className="admin_home">
        <hr />
        <h1 className="text-center">WELCOME MECHANIC</h1>

        <hr />

        <Drawer variant="permanent" className="drawer">
          <List>
            {itemList.map((item, index) => {
              return (
                <ListItem
                  button
                  key={item.text}
                  onClick={item.onClick}
                  className={activeIndex === index ? classes.activeItem : ""}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </div>
    </>
  );
}

export default withRouter(MechanicHome);
