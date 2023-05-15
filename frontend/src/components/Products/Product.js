import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./Product.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {
    const [products, setProducts] = useState([]);
    const [, setCartItems] = useState([]);
    const FruitsVegtablesref = useRef(null);
    const Foodgrainsoilmasalaref = useRef(null);
    const BakeryCakesDairyref = useRef(null);
    const Beveragesref = useRef(null);
    const SnacksBrandedfoodsref = useRef(null);
    const EggsMeatFishref = useRef(null);
    const navigate = useNavigate();

    const token = Cookies.get('User:Token');
    function handleCartClick(event, product) {
        event.preventDefault();
     
        if (!token) {
           toast.warning("please Login to Add Items to the Cart")
            navigate('/login');
            }
       
        else {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const updatedCart = [...cart, product];
            setCartItems(updatedCart);
          localStorage.setItem('cart',JSON.stringify(updatedCart));
          toast.success("Item is added to the Cart")
        }
    }


    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    function scrollToSection(sectionRef) {
        const section = sectionRef.current;
        section.scrollIntoView({ behavior: 'smooth' });
    }
    function handleCategoryChange(event) {
        const category = event.target.value;
        switch (category) {
            case 'Fruits and Vegtables':
                scrollToSection(FruitsVegtablesref);
                break;
            case 'Foodgrains oil & masala':
                scrollToSection(Foodgrainsoilmasalaref);
                break;
            case 'Bakery Cakes & Dairy':
                scrollToSection(BakeryCakesDairyref);
                break;
            case 'Beverages':
                scrollToSection(Beveragesref);
                break;
            case 'Snacks Brandedfoods':
                scrollToSection(SnacksBrandedfoodsref);
                break;
            case 'Eggs Meat Fish':
                scrollToSection(EggsMeatFishref);
                break;
            default:
                break;
        }
    }
  

    return (
<>
        <div>
            <div className='hideh2'>
            <div className="category-dropdown-container">
                <label htmlFor="category-select">Category:</label>
                <select id="category-select" onChange={handleCategoryChange}>
                    <option value="Fruits and Vegtables">Fruits and Vegtables</option>
                    <option value="Foodgrains oil & masala">Foodgrains oil & masala</option>
                    <option value="Bakery Cakes & Dairy">Bakery Cakes & Dairy</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks Brandedfoods">Snacks Brandedfoods</option>
                    <option value="Eggs Meat Fish">Eggs Meat Fish</option>
                </select>
            </div>
          
            </div>
                    <h2 ref={FruitsVegtablesref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Fruits and Vegtables')
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={(event) => handleCartClick(event, product)}
                                        >

                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                        
                                    </div>
                                </div>
                            ))}
                    </div>

                    <h2 ref={Foodgrainsoilmasalaref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Foodgrains oil & masala')   
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}
                                        >

                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <h2 ref={BakeryCakesDairyref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Bakery Cakes & Dairy')     
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={(event) => handleCartClick(event, product)}
                                        >

                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <h2 ref={Beveragesref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Beverages')    
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={(event) => handleCartClick(event, product)}
                                        >
                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <h2 ref={SnacksBrandedfoodsref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Snacks Brandedfoods')
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}
                                        >
                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>


                    <h2 ref={EggsMeatFishref}> </h2>
                    <div className="product-card-container">
                        {products
                            .filter((product) => product.category === 'Eggs Meat Fish')     
                            .map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>

                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="product-info">
                                            <div className="product-price">Price:&#8377;{product.price}</div>
                                            <div className="product-quantity">Quantity: {product.quantity}</div>
                                        </div>
                                        <button
                                            className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}
                                        >
                                            <img
                                                src={require("../Products/shopping-cart.png")}
                                                alt="Logo"
                                                className="imgAvatar"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
    </>
    );
   
};

export default Product;