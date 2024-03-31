import React, { useEffect, useState } from "react";
import AuthService from "../../services/customer/authentication/auth_service";
import CustomerService from "../../services/customer/customer_service";
import CarService from "../../services/member/car/car_services";
import PackageService from "../../services/member/package/package_services";
import "./CSS/Order.css";
import { Card, Grid, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Razorpay } from "razorpay";

function Order(props) {
  {
    const { match, history } = props;
    const { params } = match;
    const { carId, serviceId } = params;
    const [user, setUser] = useState("");
    const [service, setService] = useState([]);
    const [car, setCar] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const getPackage = () => {
      PackageService.findServiceById(serviceId)
        .then((res) => {
          setService(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCar = () => {
      CarService.findCarById(carId)
        .then((res) => {
          setCar(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      const user = AuthService.getCurrentCustomer();
      console.log(user);
      setUser(user);

      getCar();
      getPackage();
    }, []);

    const { handleSubmit, register, errors } = useForm({
      mode: "onBlur",
    });

    const onSubmit = (values) => {
      if (selectedPayment === "online") {
        if (!razorpay) {
          initializeRazorpay();
        }
        handlePayment();
      } else {
        console.log(selectedPayment);
        placeOrder();
      }
    };

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: service.price * 100, // Amount in paisa
      currency: "INR",
      name: "WYPE",
      description: "Online payment system",
      image: "/assets/images/footer_logo.png", // Replace with your logo URL
      order_id: user.userId, // Generate a unique order ID on the server-side
      handler: function (response) {
        // Handle success
        console.log(response);
        // Proceed with placing the order
        placeOrder();
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phoneNumber,
      },
      notes: {
        address: values.custAddress,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    console.log(rzp);
    setRazorpay(rzp);
  }

  const handlePayment = () => {
    if (razorpay) {
      razorpay.open();
    }
  };

  const placeOrder = () => {
    CustomerService.placeOrder(
      user.userId,
      user.name,
      car.name,
      values.carNumber,
      values.custAddress,
      service.name,
      service.price
    )
      .then((response) => {
        response &&
          enqueueSnackbar(response, {
            variant: "success",
          });
        response && history.push("/cust_home/mybookings");
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: "error",
        });
      });
  };

  // const onSubmit = (values) => {
  //   if (selectedPayment == 'online') {

  //   }else{
  //     console.log(selectedPayment);
  //     CustomerService.placeOrder(
  //       user.userId,
  //       user.name,
  //       car.name,
  //       values.carNumber,
  //       values.custAddress,
  //       service.name,
  //       service.price
  //       )
  //       .then((response) => {
  //         response && enqueueSnackbar(response, {
  //           variant: "success",
  //         });
  //         response && history.push("/cust_home/mybookings")
  //       })
  //       .catch((err) => {
  //         enqueueSnackbar(err, {
  //           variant: "error",
  //         });
  //       });

  //     };
  //   }
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="summary_title">ORDER SUMMARY</h1>
      <Card className="booking_card">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p className="title_subHeading">PERSONAL DETAILS</p>
            <h4>Email Id: {user.email}</h4>
            <h4>Name: {user.name}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    color="primary"
                    variant="outlined"
                    label="Vehicle Number"
                    name="carNumber"
                    margin="normal"
                    inputRef={register({
                      required: "Number is Required",
                    })}
                  />
                  {errors.carNumber && (
                    <span className="span">{errors.carNumber.message}</span>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    color="primary"
                    variant="outlined"
                    label="Address"
                    multiline
                    name="custAddress"
                    margin="normal"
                    inputRef={register({
                      required: "Address is Required",
                    })}
                  />
                  {errors.custAddress && (
                    <span className="span">{errors.custAddress.message}</span>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <div style={{ margin: "15px" }}>
                    <label htmlFor="payment">Select Payment Method:</label>
                    <select
                      color="primary"
                      variant="outlined"
                      id="payment"
                      value={selectedPayment}
                      onChange={handlePaymentChange}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="online">Online Payment</option>
                      <option value="cash">Cash Payment</option>
                    </select>
                  </div>
                  {errors.custAddress && (
                    <span className="span">{errors.custAddress.message}</span>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                PLACE ORDER
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p className="title_subHeading">SERVICE DETAILS</p>
            <h3>Service Name: {service.name}</h3>
            <h3>Total Price: {service.price}</h3>
            <h3>Time Required: {service.timeRequired}</h3>
            <h3>Selected Car: {car.name}</h3>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default Order;
