import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams();

  useEffect(() => {
    async function getOrderData() {
      await axios.get(
        `http://localhost:8080/api/v1/payment/success/${orderId}`
      );
    }
    getOrderData();
  }, []);
  return (
    <div className="bg-green-200 text-green-800 font-semibold py-2 px-4 rounded">
      Your order purchased successfully
    </div>
  );
};

export default OrderSuccess;
