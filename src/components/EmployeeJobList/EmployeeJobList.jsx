import React, { useMemo, useState, useCallback, useEffect } from "react";
import { IoMdArrowDropdown } from "../../utils/icons/icons";
import { FiSearch } from "react-icons/fi"; // Ícono de lupa
import CardJob from "../CardJob/CardJob";
import "./EmployeeJobList.css";
import { jobService } from "../../services/jobService/jobService";

const EmployeeJobList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      const data = await jobService.getJobs();
      setJobs(data);
    };
    getJobs();
  }, []);

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
        case "amountPostulations":
          sortedJobs.sort(
            (a, b) => b.amountPostulations - a.amountPostulations
          );
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
        job.title.toLowerCase().includes(term) ||
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
            <li onClick={() => handleSort("amountPostulations")}>
              Por postulaciones
            </li>
          </ul>
        </div>
      </div>

      <div className="escroll-job-wrapper">
        <div className="escroll-job">
          <div className="ejob-scroll-box">
            {jobs.length == 0 ? (
              <h1>No hay trabajos en tu localidad aún</h1>
            ) : (
              filteredJobs.map((job, index) => (
                <CardJob key={index} jobInfo={job} cardType={true} />
              ))
            )}
          </div>
        </div>
        <div className="fade-bottom"></div>
      </div>
    </div>
  );
};

export default EmployeeJobList;
