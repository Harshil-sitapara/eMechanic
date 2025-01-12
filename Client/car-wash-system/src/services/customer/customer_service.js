import axios from "axios";
import authHeader from "./authentication/auth_header";

const ORDER_URL = `${process.env.REACT_APP_ORDERS_SERVER}/order/`;
const CUST_URL = process.env.REACT_APP_CUSTOMER_SERVER;

class CustomerService {
  placeOrder(
    customerId,
    customerName,
    carName,
    carNumber,
    custAddress,
    serviceName,
    servicePrice
  ) {
    return axios
      .post(
        ORDER_URL + "addOrder",
        {
          customerId,
          customerName,
          carName,
          carNumber,
          custAddress,
          serviceName,
          servicePrice,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findMyOrders(id) {
    return axios
      .get(CUST_URL + `/customer/order/findOrders/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findCustomerById(id) {
    return axios
      .get(`${CUST_URL}/customer/account/findCustById/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new CustomerService();
