import React, { useEffect, useState } from "react";
import CustomerService from "../../services/customer/customer_service";
import AuthService from "../../services/customer/authentication/auth_service";
import "./CSS/MyBookings.css";
import { Card, Grid, CardContent,Button } from "@material-ui/core";

function MyBookings() {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    CustomerService.findMyOrders(user.userId)
      .then((res) => {
      setorders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  


  console.log("res",orders)
  const getOrderCards = (order) => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} key={order._id}>
        <Card variant="outlined" className="service_card">
          <CardContent>
            <h2>Your Order Request is {order.status === "REJECT" ? "Waiting...":order.status}</h2>
            <hr />
            <h5>Car : {order.carName}</h5>
            <h5>Vehicle Number: {order.carNumber}</h5>
            <h5>Address: {order.custAddress}</h5>
            <h5>Service Name: {order.serviceName}</h5>
            <h5>Service Price: {order.servicePrice}</h5>
            {/* <Button variant="contained" color="secondary" style={{marginLeft:"84%"}} >
              Cancel Order
            </Button> */}
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <div className="container">
      <h1 className="summary_title">MY BOOKINGS</h1>
      {orders ? (
        <Grid container spacing={4} className="mt-3">
          {orders.map((order) => getOrderCards(order))}
        </Grid>
      ) : (
        <div>
          <br />
          <h5 className="text-center">NO BOOKINGS AT MOMENT</h5>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
