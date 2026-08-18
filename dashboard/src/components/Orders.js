import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3002/orders");

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      ) : (
        <div>
          <h3>Orders</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
