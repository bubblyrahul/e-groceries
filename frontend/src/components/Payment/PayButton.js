/* eslint-disable no-undef */
import axios from "axios";
import { toast } from "react-toastify";
import "./PayButton.css";

const PayButton = (cartItems,selectedAddress) => {
  console.log(cartItems);

  const handlecheckout = () => {
    toast.success("Redirecting to payment mode", {
      position: "bottom-right",
      autoClose: 1000,
    });

    const formattedCartItems = cartItems.map(({  _id, quantity, price, name }) => ({
      _id,
      quantity,
      price,
      name,
    }));

    axios
      .post("http://localhost:5000/api/create-checkout-session", {
        cartItems:formattedCartItems,
        selectedAddress,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Payment failed. Please try again later.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <button className="checkoutbtn" onClick={() => handlecheckout()}>
        Check Out
      </button>
    </>
  );
};

export default PayButton;
