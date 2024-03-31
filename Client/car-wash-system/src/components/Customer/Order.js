import React, { useEffect, useState } from "react";
import AuthService from "../../services/customer/authentication/auth_service";
import CustomerService from "../../services/customer/customer_service";
import CarService from "../../services/member/car/car_services";
import PackageService from "../../services/member/package/package_services";
import "./CSS/Order.css";
import {
  Card,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";

function Order(props) {
  const { match, history } = props;
  const { params } = match;
  const { carId, serviceId } = params;
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);
  const [car, setCar] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedPayment, setSelectedPayment] = useState("");

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

  // const onSubmit = (values) => {
  //   CustomerService.placeOrder(
  //     user.userId,
  //     user.name,
  //     car.name,
  //     values.carNumber,
  //     values.custAddress,
  //     service.name,
  //     service.price
  //   )
  //     .then((response) => {
  //       response && enqueueSnackbar(response, {
  //         variant: "success",
  //       });
  //       response && history.push("/cust_home/mybookings")
  //     })
  //     .catch((err) => {
  //       enqueueSnackbar(err, {
  //         variant: "error",
  //       });
  //     });
  // };

  useEffect(() => {
    console.log("selectedPayment", selectedPayment);
  }, [selectedPayment]);
  const verifyPayment = (data) => {
    const options = {
      key: "rzp_test_KnzgOpiCv73xHv",
      amount: data.amount,
      currency: data.currency,
      description: "Test transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "http://localhost:8030/api/order/paymentverification",
            { response }
          );
          console.log("Data", data);
        } catch (error) {
          console.log("Error while verify payment:", error);
        }
      },
      theme:{
        color:"#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options)
    rzp1.open();
  };
  const paymentHandler = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8030/api/order/checkout",
        { amount: service.price }
      );
      console.log("Data", data);
      verifyPayment(data.data);
    } catch (error) {
      console.log("Error while payment", error);
    }
  };
  const onSubmit = (values) => {
    if (selectedPayment === "Online Payment") {
      paymentHandler();
    } else {
      placeOrder(values);
    }
  };

  const placeOrder = (values) => {
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Payment Method
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedPayment}
                        label="Select Payment Method"
                        onChange={(e) => {
                          setSelectedPayment(e.target.value);
                        }}
                      >
                        <MenuItem value={"Online Payment"}>
                          Online Payment
                        </MenuItem>
                        <MenuItem value={"Cash on delivery"}>
                          Cash on delivery
                        </MenuItem>
                      </Select>
                    </FormControl>
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
