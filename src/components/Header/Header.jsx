import "./Header.css";
import Logo from "../../utils/images/PlatitaLogo.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () =>{
    navigate("/login");
  }
  return (
    <div className="header_container">
      <div className="logo-nav_container">
        <div className="logo_container">
          <img className="logo" src={Logo}></img>
        </div>
        <div className="nav_container">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Inicio</h1>
          </Link>
          <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Categorias</h1>
          </Link>
        </div>
      </div>
      <div className="session_container">
        <button onClick={handleLogin}>Iniciar sesion</button>
      </div>
    </div>
  );
};

export default Header;
