import { useMemo, useState, useCallback } from "react";
import { IoIosArrowDown } from "../../../utils/icons/icons";
import styles from "./ModeratorHome.module.css";
import ModeratorCardJob from "./ModeratorCardJob";

const moderatorInitialJobs = [
    {
        id: "1",
        jobTitle: "Levantar un tapial",
        description: "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
        userName: "Fulano Detal",
        profilePicture: "1",
        reports: 0,
        category: "Construction",
    },
    {
        id: "2",
        jobTitle: "Arreglar un caño",
        description: "Necesito a alguien con conocimientos de plomeria para arreglar un caño de mi casa",
        userName: "Joaquin Tanlongo",
        profilePicture: "2",
        reports: 5,
        category: "Plumbing",
    },
    {
        id: "3",
        jobTitle: "Arreglar cables",
        description: "Necesito a alguien con conocimientos de electricista para arreglar cables pelados en mi negocio",
        userName: "Francisco Depetrini",
        profilePicture: "3",
        reports: 10,
        category: "Electricity",
    },
    {
        id: "4",
        jobTitle: "Revocar una pared",
        description: "Necesito a alguien con conocimientos de albañileria para revocar una pared en mi casa",
        userName: "Juan Perez",
        profilePicture: "4",
        reports: 7,
        category: "Construction",
    },
];

const ModeratorHome = ({ handleOpenLogin }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moderatorJobs, setModeratorJobs] = useState(moderatorInitialJobs);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

    const handleSort = useCallback((type) => {
    setModeratorJobs((prevJobs) => {
    const sortedJobs = [...prevJobs];

    switch (type) {
        case "reports":
        sortedJobs.sort((a, b) => b.reports - a.reports);
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
    return moderatorJobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.city.toLowerCase().includes(term)
    );
  }, [moderatorJobs, searchTerm]);

    const jobsMapped = () =>
        filteredJobs.map((moderatorJob, index) => (
            <ModeratorCardJob key={index} handleOpenLogin={handleOpenLogin} moderatorJobInfo={moderatorJob} />
        ));

    return (
        <div className={styles.jobList_wrapper}>
      <div className={styles.jobList_searcher}>
        <span className={styles.search_label}>Trabajos</span>
          <div className={styles.dropdown_container}>
            <button className={styles.sortJobs_label} onClick={toggleMenu}>
              Ordenar
              <IoIosArrowDown
                className={`${styles.sortJobs_icon} ${menuOpen ? styles.open : ""}`}
              />
            </button>
            <ul className={`${styles.dropdownJobs_menu} ${menuOpen ? styles.openJobs : styles.closedJobs}`}>
              <li onClick={() => handleSort("reports")}>Por reportes</li>
            </ul>
          </div>
      </div>

      <hr className={styles.ejob_bar} />

      <div className={styles.escroll_job_wrapper}>
        <div className={styles.escroll_job}>
          <div className={styles.ejob_scroll_box}>
            {filteredJobs.map((job, index) => (
              <ModeratorCardJob key={index} moderatorJob={job} cardType={true} />
            ))}
          </div>
        </div>
        <div className={styles.fade_bottom}></div>
      </div>
    </div>
    );
};

export default ModeratorHome;
