import React, { useMemo, useState, useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi"; // Ícono de lupa
import CardJob from "../CardJob/CardJob";
import "./EmployeeJobList.css";
// import EmployeeCardJob from "../EmployeeCardJob/EmployeeCardJob";

const initialJobs = [
  {
    id: "1",
    jobTitle: "Levantar un tapial",
    description:
      "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    city: "Rosario",
    location: "Santa fe 50",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    id: "2",
    jobTitle: "Arreglar un caño",
    description:
      "Necesito a alguien con conocimientos de plomeria para arreglar un caño de mi casa",
    city: "Santa Fe",
    location: "San Martin 1150",
    applications: 150,
    averagePrice: 8000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    id: "3",
    jobTitle: "Arreglar cables",
    description:
      "Necesito a alguien con conocimientos de electricista para arreglar cables pelados en mi negocio",
    city: "Esperanza",
    location: "Jujuy 274",
    applications: 450,
    averagePrice: 12000,
    userName: "Fulano Detal",
    category: "Construction",
  },
];

const EmployeeJobList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const handleSort = useCallback((type) => {
    setJobs((prevJobs) => {
      const sortedJobs = [...prevJobs];

      switch (type) {
        case "city":
          sortedJobs.sort((a, b) => a.city.localeCompare(b.city));
          break;
        case "price":
          sortedJobs.sort((a, b) => b.averagePrice - a.averagePrice);
          break;
        case "applications":
          sortedJobs.sort((a, b) => b.applications - a.applications);
          break;
        default:
          break;
      }

      return sortedJobs;
    });

    setMenuOpen(false);
  }, []);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.city.toLowerCase().includes(term)
    );
  }, [jobs, searchTerm]);

  return (
    <div className="ejob-list-wrapper">
      <div className="ejob-searcher">
        <span className="search-label">Trabajos</span>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <hr className="ejob-bar" />

      <div className="ejob-list-header">
        <h2 className="ejob-list-title">Según tus intereses</h2>
        <div className="dropdown-container">
          <button className="sort-label" onClick={toggleMenu}>
            Ordenar
            <IoMdArrowDropdown
              className={`sort-icon ${menuOpen ? "open" : ""}`}
            />
          </button>
          <ul className={`dropdown-menu ${menuOpen ? "open" : "closed"}`}>
            <li onClick={() => handleSort("city")}>Por ciudad</li>
            <li onClick={() => handleSort("price")}>Por precio</li>
            <li onClick={() => handleSort("applications")}>
              Por postulaciones
            </li>
          </ul>
        </div>
      </div>

      <div className="escroll-job-wrapper">
        <div className="escroll-job">
          <div className="ejob-scroll-box">
            {filteredJobs.map((job, index) => (
              <CardJob key={index} jobInfo={job} cardType={true} />
            ))}
          </div>
        </div>
        <div className="fade-bottom"></div>
      </div>
    </div>
  );
};

export default EmployeeJobList;
