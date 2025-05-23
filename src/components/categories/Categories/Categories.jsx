import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.css";
//import { PiPlantFill } from "react-icons/pi";
import {
  FaWrench,
  FaTruck,
  FaBabyCarriage,
  FaHardHat,
  FaPaintBrush,
  FaPlus,
  BsFillLightningChargeFill,
  LiaBroomSolid,
  PiPlantFill,
} from "../../../utils/icons/icons";
//import { LiaBroomSolid } from "react-icons/lia";
//import { BsFillLightningChargeFill } from "react-icons/bs";

// const categories = [
//   { name: "Jardinería", icon: PiPlantFill },
//   { name: "Mecánica", icon: FaWrench },
//   { name: "Limpieza", icon: LiaBroomSolid },
//   { name: "Mudanza", icon: FaTruck },
//   { name: "Niñera/o", icon: FaBabyCarriage },
//   { name: "Tecnologia", icon: BsFillLightningChargeFill },
//   { name: "Construcción", icon: FaHardHat },
//   // { name: "Pintor/a", icon: <FaPaintBrush />},
//   { name: "Y más", icon: FaPlus },
// ];

const categories = [
  "Gardening",
  "Mechanics",
  "Cleaning",
  "Moving",
  "Babysitter",
  "Technology",
  "Construction",
  "Others",
];

const Categories = () => {
  return (
    <div className="categories-container">
      <div className="intro-text">
        Con esta aplicación podrás salir de{" "}
        <span className="yellow-text">cualquier</span> apuro !
      </div>

      <div className="grid-container">
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} name={cat} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
