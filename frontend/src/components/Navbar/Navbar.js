import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';


export default function Navbar() {
    let navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
        Cookies.remove('User:Token');
        localStorage.removeItem("cart");
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <div>
            <>
                <div>
                    <nav className="navbar navbar">
                        <div className="navbar-left">
                            <Link to="/">
                                <img src={require('./logo-png.png')} alt="Logo" className="logo" />
                            </Link>
                        </div>
                        <div className="navbar-middle">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <img
                                            src={require("../Navbar/home.png")}
                                            alt="Logo"
                                            className="imgAvatar"
                                        />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/products" className="nav-link">
                                        <img
                                            src={require("../Navbar/shopping-bag.png")}
                                            alt="Logo"
                                            className="imgAvatar"
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-right">
                            <ul className="navbar-nav">
                                {!Cookies.get('User:Token') ? (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                className="btn btn-outline-primary mr-2"
                                                role="button"
                                                to="/login"
                                            >
                                                <img
                                                    src={require("../Navbar/power-button (1).png")}
                                                    alt="Logo"
                                                    className="imgAvatar"
                                                />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="btn btn-outline-primary mr-2 "
                                                role="button"
                                                to="/signup"
                                            >
                                                <img
                                                    src={require("../Navbar/signup2.png")}
                                                    alt="Logo"
                                                    className="imgAvatar"
                                                />
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-primary dropdown-toggle"
                                                    type="button"
                                                    id="account-dropdown"
                                                    onClick={toggleDropdown}
                                                >
                                                    <img
                                                        src={require("../Navbar/hacker.png")}
                                                        alt="Logo"
                                                        className="imgAvatar"
                                                    />

                                                </button >
                                                <div
                                                    className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
                                                    aria-labelledby="account-dropdown"
                                                >
                                                    <Link to="/profile" className="dropdown-item">
                                                        Profile
                                                    </Link>
                                                    <Link to="/cart" className="dropdown-item">
                                                        My cart
                                                    </Link>

                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn btn-primary" onClick={handleLogout}>
                                                <img
                                                    src={require("../Navbar/power-button.png")}
                                                    alt="Logo"
                                                    className="imgAvatar"
                                                />
                                            </button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </>
        </div>
    );
}
