import React, { useState, useEffect } from "react";
import "./Cart.css";
import PayButton from "../Payment/PayButton";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [, setCartCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const navigate = useNavigate();
  console.log(userAddress)

  useEffect(() => {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    setCartItems(cart.map(item => ({ ...item, quantity: 1 })));

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setCartTotal(total);

    setCartCount(cart.length);
  }, []);

  const handleRemove = (itemId) => {
    const newCartItems = cartItems.filter((item) => item._id !== itemId);
    const total = newCartItems.reduce((acc, item) => acc + item.price, 0);
    setCartItems(newCartItems);
    setCartTotal(total);
    setCartCount(newCartItems.length);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const newCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    const total = newCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartItems(newCartItems);
    setCartTotal(total);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const totalPrice = () => {
    return cartTotal;
  };

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    // Store the selected address in local storage
    localStorage.setItem('selectedAddress', event.target.value);
  };

  useEffect(() => {
    // Retrieve the selected address from local storage on component mount
    const storedAddress = localStorage.getItem('selectedAddress');
    setSelectedAddress(storedAddress);
  }, []);
  
  const usertoken = Cookies.get('User:Token');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserAddress = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/get_address', {
          headers: { 'token': usertoken },
        });
    const resData = await response.json();
    setUserAddress(resData);
  };

  useEffect(() => {
    fetchUserAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <div>
      <div className="cart">
        <h2>My Cart Items</h2>
        {cartItems.length === 0 ? (
          <img
          src={require("./cart1.png")}
          alt="Logo"
          className="imgAvatarr"
      />
        ) : (
          <>
            <table className="tableitems">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img className="picture " src={item.photo} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.price.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      />
                    </td>
                    <td>
                      {(item.price * item.quantity).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      <button className='butonn' onClick={() => handleRemove(item._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total">
              <h5 className="text-center">Order Summary</h5>
              <div className="d-flex justify-content-between mt-3">
                <h6>Subtotal:</h6>
                <h6>&#8377;{totalPrice()}</h6>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h6>Delivery Charges:</h6>
                <h6 style={{ color: "#28a745" }}>FREE</h6>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h6>Total:</h6>
                <h6>&#8377;{totalPrice()}</h6>
              </div>
              <div className="d-flex justify-content-center">
                  <PayButton cartItems={cartItems} selectedAddress={selectedAddress}/>
              </div>
            </div>
            <select className="addressform"
                  name="addresses"
                  value={selectedAddress} // Set the value to the selectedAddress state
                  onChange={handleAddressChange} // Handle address change event
                >
                  {userAddress.addresses && userAddress.addresses.length > 0 ? (
                  userAddress.addresses.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.houseNumber},  {address.street}, {address.city}, {address.state}, {address.country},{address.zipCode}
                      </option>
                    ))
                  ) : (
                    <>
                      <p>
                        No addresses found, Please try after adding an address:{" "}
                        <button onClick={handleClickProfile}>Profile</button>{" "}
                      </p>
                    </>
                  )}
                </select>
              
          </>
        )}
      </div>
    </div>
  );
  
};

export default Cart;