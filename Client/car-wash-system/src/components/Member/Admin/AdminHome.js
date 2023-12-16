import React, { useEffect, useState } from "react";
import "./CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  activeItem: {
    backgroundColor: "#cbcbcb",
  },
}));

function AdminHome(props) {
  const { history } = props;
  const [orders, setOrders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const classes = useStyles();

  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    history.push(path);
  };

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => handleItemClick(0, "/admin_home"),
    },
    {
      text: "CARS",
      icon: <DriveEtaIcon />,
      onClick: () => handleItemClick(1, "/admin_home/cars"),
    },
    {
      text: "Services",
      icon: <BallotIcon />,
      onClick: () => handleItemClick(2, "/admin_home/packages"),
    },
    {
      text: "Mechanics",
      icon: <SupervisorAccountIcon />,
      onClick: () => handleItemClick(3, "/admin_home/mechanics"),
    },
    {
      text: "Orders",
      icon: <MonetizationOnIcon />,
      onClick: () => handleItemClick(4, "/admin_home/orders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => handleItemClick(5, "/login"),
    },
  ];

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompletedOrders();
  }, []);

  return (
    <div className="admin_home">
      <hr />
      <h1>WELCOME ADMIN</h1>
      <h4 className="totalEarning">
        Your Total Earnings: &#8377;
        {orders &&
          orders
            .map((order) => order.servicePrice)
            .reduce((prev, next) => prev + next, 0)}
      </h4>
      <hr />

      <Drawer variant="permanent" className={classes.drawer}>
        <List>
          {itemList.map((item, index) => (
            <ListItem
              button
              key={item.text}
              onClick={item.onClick}
              className={activeIndex === index ? classes.activeItem : ""}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} color="red" />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(AdminHome);
