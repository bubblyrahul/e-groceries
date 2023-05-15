import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css';



const Profile = () => {
  const [userData, setUserData] = useState({});
  const [addressList, setAddressList] = useState({});
  console.log(addressList)
  const usertoken = Cookies.get('User:Token');
  const [houseNumber, sethouseNumber] = useState("");
  const [street, setstreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [form, setform] = useState(false);
  const [update, setupdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get_user', {
          headers: { 'token': usertoken },
        });
        const resData = await response.json();
        setUserData(resData);
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchUserData();
  }, [usertoken]);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get_address', {
          headers: { 'token': usertoken },
        });
        const result = await response.json();
        console.log(result);
        setAddressList(result)
        setSuccess(true)
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchAddressData();
  }, [usertoken]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/new_address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           'token': usertoken ,
        },
        body: JSON.stringify({
          houseNumber,
          street,
          city,
          state,
          country,
          zipCode,
        }),
      });

      if (response.status === 400) {
        setupdate(true);
        setUnsuccess(false);
        console.log(response)
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } 
    } catch (errors) {
      console.log(errors);
      setupdate(false);
      setUnsuccess(true);
    }
  };
  const handleCancel = async (e) =>{
    setform(false)
  }
  const handleAddAddressClick = () => {
    setform(true);
  };

  return (
    <div className='profile'>
      <div>
        <div className='form1'>
          <h1>USER DETAILS</h1>
          <p>FirstName:     {userData.firstName}</p>
          <p>LastName:     {userData.lastName}</p>
          <p>Email ID:     {userData.email}</p>
          </div>
          {success && (
            <div>
              <table className='tablee'>
                <thead>
                  <tr>
                    <th>HouseNumber</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>zip-Code</th>
                  </tr>
                </thead>
                <tbody>
                  {addressList &&
                    addressList.addresses &&
                    addressList.addresses.map((address, index) => (
                      <tr key={index}>
                        <td>{address.houseNumber}</td>
                        <td>{address.street}</td>
                        <td>{address.city}</td>
                        <td>{address.state}</td>
                        <td>{address.country}</td>
                        <td>{address.zipCode}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
  
          <div className='btn'>
            <button onClick={handleAddAddressClick}>ADD Address</button>
          </div>
  
          {form && (
            <div className="auth-form-container">
              <form className="address-form" onSubmit={handleSubmit}>
               <h2> Update Address</h2>
                <div className="grid-container">
                  <label htmlFor="houseNumber">houseNumber</label>
                  <input
                    type="text"
                    id="houseNumber"
                    value={houseNumber}
                    placeholder="houseNumber"
                    onChange={(e) => sethouseNumber(e.target.value)}
                    required
                  />
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    value={street}
                    placeholder="street"
                    onChange={(e) => setstreet(e.target.value)}
                    required
                  />
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                  />
                </div>
  
                <div className='subbtn'>
                  <button type="submit">Submit</button>
                  <div>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
                {update && <b>Address updated successfully.</b>}
                {unsuccess && <b>Failed to update address.</b>}
              </form>
            </div>
          )}
        
        </div>
      </div>
);
          };
export default Profile;
