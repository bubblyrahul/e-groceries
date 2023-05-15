import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate()
  const [create, ]= useState(false);
  const handlesubmit = async (e)=>{
    e.preventDefault();
    console.log(email);

    const response = await fetch("http://127.0.0.1:5000/api/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const resData = await response.json();
    console.log(resData);
    if(resData.success){
      Cookies.set('User:Token',resData.token);
      console.log("User logged in successfully");
        navigate("/", {
        });
        toast.success("User Login Successfull")
      }
   else {
      console.log("Invalid email or password");
      toast.error("Invalid email or password")
    }
  }
  
  return (
    <div>
      <>
      <div className='auth-form-containers'>
         <form className='Signup form' onSubmit={handlesubmit}>
         { create && <p>logged in Successfully!!!</p>}
         <h2 style={{color:'black'}}>Login</h2>
         <label htmlFor='email'>Email</label>
         <input value={email} name="email" onChange={(e)=> setemail(e.target.value)} id="email" placeholder='email'/>
         <label htmlFor='password'>Password</label>
         <input value={password} type="password" onChange={(e)=> setpassword(e.target.value)} id="password" placeholder='*******'/>
         <button type="submit">Login</button>
        </form>
      </div>
      </>
    </div>
  )
}
