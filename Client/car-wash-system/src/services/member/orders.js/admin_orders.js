import authHeader from "../auth_header";
import axios from "axios";

const ORDER_URL = `${process.env.REACT_APP_ADMIN_SERVER}/admin/order/`;
const COMPLTED_ORDERS_URL = `${process.env.REACT_APP_ORDERS_SERVER}/order/`;

class AdminOrders {
  findPlacedOrders() {
    return axios
      .get(ORDER_URL + "findPlacedOrder", { headers: authHeader() })
      .then((res) => {
        // console.log("res.data",res.data);
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  assignOrder(orderId, mechanicId) {
    return axios
      .patch(
        ORDER_URL + `updateOrder/${orderId}`,
        {
          mechanicId,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findCompletedOrders() {
    return axios
      .get(COMPLTED_ORDERS_URL + "findCompltedOrders")
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  findRejectedOrders() {
    return axios
      .get(COMPLTED_ORDERS_URL + "findRejectedOrders")
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new AdminOrders();
