import React from "react";
import "../index.css";
import { FaHardHat, PiPlantFill, BsFillLightningChargeFill, FaTruck, LiaBroomSolid, FaWrench, FaBabyCarriage, FaPlus,  } from "../utils/icons/icons";
const categories = [
  { name: "Jardinería", icon: PiPlantFill },
  { name: "Mecánica", icon: FaWrench },
  { name: "Limpieza", icon: LiaBroomSolid },
  { name: "Mudanza", icon: FaTruck },
  { name: "Niñera/o", icon: FaBabyCarriage },
  { name: "Tecnología", icon: BsFillLightningChargeFill },
  { name: "Construcción", icon: FaHardHat },
  { name: "Y más", icon: FaPlus },
];
const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
         <div className="logo">
            <h1>Insertar icono </h1>
        </div>
        <nav>
          <a href="#">Inicio</a>
          <a href="#" >
            Categorías
          </a>
        </nav>
        <button className="login">Iniciar sesión</button>
      </header>

      <main className="main">
        <div className="slogan-container">
          <div className="slogan-box">
            <strong>
              ¡Con esta aplicación podrás salir de{" "} <span className="highlight">cualquier</span> apuro!
            </strong>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`category-card ${cat.selected ? "selected" : ""}`}
            >
              <div className="icon-container">
                <div className="icon">
                <cat.icon /> {}
                </div>
              </div>
                <div className="label">{cat.name}</div>
              
              
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        © 2024 Platita. Designed by UTN students.
      </footer>
    </div>
  );
};

export default HomePage;
