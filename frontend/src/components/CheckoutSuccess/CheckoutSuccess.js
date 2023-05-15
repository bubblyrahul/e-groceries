import React from "react";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  return (
    <>
    <div className="cktsuccess">
      <h2>Order Successful</h2>
      <p>We are delighted to inform you that we have received your payment.</p>
      <button onClick={() => window.location.href = "/orders"}>View Orders</button>
      <p>Continue Shopping</p>
      </div>
    </>
  );
};

export default CheckoutSuccess;
