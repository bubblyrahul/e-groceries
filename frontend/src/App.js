//import
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import Product from './components/Products/Product';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSuccess from './components/CheckoutSuccess/CheckoutSuccess';
import Navbar from './components/Navbar/Navbar';


//react-router-dom is a JavaScript library that provides way to implement,
// client-side routing in React applications
function App() {
  return (
    <>
   <BrowserRouter>
   <ToastContainer 
   position="bottom-right"
   theme="dark"/>
     <Navbar />
        <Routes>
        <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          <Route exact path="/products" element={<Product />} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
