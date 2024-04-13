import React, { useState, useEffect } from "react";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import Axios from "axios";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [columns, setColumns] = useState([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Time",
      field: "requestedOn",
      editable: "never",
      render: (rowData) => moment(rowData.requestedOn).format("L"),
    },
  ]);

  const [column, setColumn] = useState([
    { title: "OrderId", field: "_id" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Assigned Mechanic", field: "mechanicId" },
  ]);
  const dynamicStatusLookUp = {
    REJECT: "REJECT ORDER",
  };
  const [columnReject, setColumnReject] = useState([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
  ]);
  const handleRejectOrder = (orderId) => {
    console.log("Reject order clicked for orderId:", orderId);
  };

  const getPlacedOrders = () => {
    AdminOrders.findPlacedOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setCompletedOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRejectedOrders = () => {
    AdminOrders.findRejectedOrders()
      .then((res) => {
        setRejectedOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllAvailableMechanics = () => {
    const token = localStorage.getItem("token");
    const route = "http://localhost:8088/admin/mechanic/";
    return Axios.get(route + "findAvailable")
      .then((res) => {
        console.log("res.data mechanic", res.data);
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPlacedOrders();
    getAllAvailableMechanics().then((mechanics) => {
      const mechanicsLookUp = {};
      (mechanics || []).forEach((mechanic) => {
        mechanicsLookUp[mechanic._id] = mechanic.name;
      });
      setColumns((prevColumns) => [
        ...prevColumns,
        {
          title: "Assign Mechanic",
          field: "mechanicId",
          lookup: mechanicsLookUp,
        },
      ]);
      setColumnReject((prevColumns) => [
        ...prevColumns,
        {
          title: "Assign Mechanic",
          field: "mechanicId",
          lookup: mechanicsLookUp,
        },
        {
          title: "Reject Order",
          field: "rejectOrder",
          render: (rowData) => (
            <button
              className="reject-button"
              onClick={() => handleRejectOrder(rowData._id)}
            >
              Reject Order
            </button>
          ),
        },
      ]);
    });
    getCompletedOrders();
    getRejectedOrders();
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      AdminOrders.assignOrder(newData._id, newData.mechanicId)
        .then((res) => {
          const dataUpdate = [...orders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setOrders([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const [display, setdisplay] = useState(false);
  const [displayRejectTable, setDisplayRejectTable] = useState(false);
  const openTable = () => {
    setdisplay(true);
    setTimeout(() => {
      const completedElement = document.querySelector(".completed_order");
      if (completedElement) {
        completedElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const closeTable = () => {
    setdisplay(false);
    setDisplayRejectTable(false);
  };
  console.log("orders", orders);
  return (
    <div className="cars_container">
      <br />

      <button onClick={openTable} className="see-complete-btn">
        Completed Orders
      </button>
      <br />
      {orders ? (
        <MaterialTable
          title="PENDING ORDERS DATA"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            exportButton: true,
            // 
          }}
        />
      ) : (
        <div>
          <br />
          <hr />
          <h4 className="text-center no-order">NO CURRENT ORDERS RIGHT NOW</h4>
        </div>
      )}
      <br />
      <br />
      <br />
      {display ? (
        <div className="completed_order">
          <h1>COMPLETED ORDERS</h1>
          <MaterialTable
            title="COMPLATE ORDERS DATA"
            columns={column}
            data={completedOrders}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              exportButton: true,
            }}
          />
          <br />
          <button className="see-complete-btn" onClick={closeTable}>
            Close Table
          </button>
          <br />
          <br />
          <br />
        </div>
      ) : null}

      {false ? (
        <div className="rejected_order">
          <h1>REJECTED ORDERS</h1>
          <MaterialTable
            title="REJECTED ORDERS DATA BY MECHANICS"
            columns={columnReject}
            data={rejectedOrders}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
            }}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              exportButton: true,
              actionsColumnIndex: 0,
            }}
          />
          <br />
          <button className="see-complete-btn" onClick={closeTable}>
            Close Table
          </button>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default Orders;
