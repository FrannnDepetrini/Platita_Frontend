import './Navbar.css';
import logo from "../../utils/images/platita-logo.svg"
export default function Navbar() {
  return (
    <nav className="navbar">
       <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Categorias</a></li>
      </ul>
      <div className="navbar-right">
        <button className="btn-inicio">Iniciar Sesion</button>
      </div>
    </nav>
   
  );
}