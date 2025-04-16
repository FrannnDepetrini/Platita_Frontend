import "./Header.css";
import Logo from "../utils/images/PlatitaLogo.png";
const Header = () => {
  return (
    <div className="header_container">
      <div className="logo-nav_container">
        <div className="logo_container">
          <img className="logo" src={Logo}></img>
        </div>
        <div className="nav_container">
          <h1>Inicio</h1>
          <h1>Categorias</h1>
        </div>
      </div>
      <div className="session_container">
        <button>Iniciar sesion</button>
      </div>
    </div>
  );
};

export default Header;
