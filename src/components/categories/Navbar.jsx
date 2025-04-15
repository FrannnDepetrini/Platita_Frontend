import React from "react";
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="home-button">Inicio</button>
                <button className="categories-button"><span className="red-underline">Cat</span>egorías</button>
            </div>
            <div className="navbar-right">
                <button className="login-button">Iniciar Sesión</button>
            </div>
        </nav>
    );
}

export default Navbar;