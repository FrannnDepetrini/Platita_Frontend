import React from "react";
import JobCard from "../JobCard/JobCard";
import { GiBrickWall } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { FaHammer } from "react-icons/fa";
import "./JobList.css";

const jobs = [
  {
    title: "Levantar un tapial",
    icon: <GiBrickWall size={20} className="job-icon" />,
    description: "Necesito a alguien con conocimientos de albañilería para levantar un tapial de X metros",
    date: "Esta semana",
    location: "Santa fe 50, Rosario",
    applications: "+300 Postulaciones",
    reward: "Promedio +10000$",
    poster: "Fulano",
    bgColor: "#e7e6d9",
  },
  {
    title: "Ayuda en mudanza",
    icon: <MdLocalShipping size={20} className="job-icon" />,
    description: "Necesito ayuda para cargar y descargar muebles",
    date: "El mes que viene",
    location: "Corrientes 400, Rosario",
    applications: "+300 Postulaciones",
    reward: "Promedio +10000$",
    poster: "Fulano",
    bgColor: "#f5f1df",
  },
  {
    title: "Armar muebles",
    icon: <FaHammer size={20} className="job-icon" />,
    description: "Alguien con herramientas para armar un ropero y una mesa",
    date: "Indefinido",
    location: "San lorenzo 400, Rosario",
    applications: "+300 Postulaciones",
    reward: "Promedio +10000$",
    poster: "Fulano",
    bgColor: "#e7e6d9",
  },
];

const JobList = () => {
  return (
    <div className="job-list-wrapper">
      <h2 className="job-list-title">Algunos de los trabajos</h2>
      <div className="job-scroll-box">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;