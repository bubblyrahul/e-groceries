//import
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  //firstname is a state variable and setfirstname is to update the value. 
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate()
    
  // Define event handler for form submission
    //preventdefault is to prevent from page reload and may data get ereased.
    const handlesubmit = async (e)=>{
        e.preventDefault();
        console.log(email);
    

    // Send a POST request to the backend with form data
    const response = await fetch("http://127.0.0.1:5000/api/signup",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({       //method is used to convert a JavaScript object into a JSON 
        firstName,
        lastName,
        email,
        password
      })
    
    });
    const resData = await response.json()
    console.log(resData)

     // If the backend returns success, show an alert and navigate to the login page after a delay
    if(resData.success){
        navigate("/login");
        toast.success("User Created successfully!")
    }
  
    }
   //onchange is a input that triggered when the value of the input is changed by user.
  return (
    <div>
      <>
      <div className='auth-form-containers'>
        <form className='Signup form' onSubmit={handlesubmit}>
        <h2 style={{color:'black'}}>SignUp</h2>
         <label htmlFor='firstName'>FirstName</label>
         <input value={firstName} name="firstName"  onChange={(e)=> setfirstName(e.target.value)}id="firstName" placeholder='First Name'/>
         <label htmlFor='lastName'>LastName</label>
         <input value={lastName} name="lastName" onChange={(e)=> setlastName(e.target.value)} id="lastName" placeholder='Last Name'/>
         <label htmlFor='email'>Email</label>
         <input value={email} name="email" onChange={(e)=> setemail(e.target.value)} id="email" placeholder='Email'/>
         <label htmlFor='password'>Password</label>
         <input value={password} type="password" onChange={(e)=> setpassword(e.target.value)} id="Password" placeholder='******'/>
         <button type="submit">Signup</button>
         <div className='login'>If Already have an Account  <Link to ="/login">Login</Link>
         </div>
        </form>
      </div>
      </>
    </div>
   
  )
}
