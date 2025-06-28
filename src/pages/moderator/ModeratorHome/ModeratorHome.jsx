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
        userName: "Antonio Diaz",
        profilePicture: "4",
        reports: 7,
        category: "Construction",
    },
    {
        id: "5",
        jobTitle: "Cuidar a un niño",
        description: "Busco a alguien con experiencia en cuidado de niños para cuidar a mi hijo de 5 años",
        userName: "Brenda Gonzalez",
        profilePicture: "5",
        reports: 2,
        category: "Babysitter",
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

        case "name":
            sortedJobs.sort((a, b) => a.userName.localeCompare(b.userName));
            break;

        case "category":
            sortedJobs.sort((a, b) => a.category.localeCompare(b.category));
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

    // const jobsMapped = () =>
    //     filteredJobs.map((moderatorJob, index) => (
    //         <ModeratorCardJob key={index} handleOpenLogin={handleOpenLogin} moderatorJobInfo={moderatorJob} />
    //     ));

return (
        <>
            <h1 className={styles.top_titleText}>Inicio</h1>
            <div className={styles.jobList_wrapper}>
                <div className={styles.jobList_searcher}>
                    <span className={styles.jobSearch_label}>Trabajos</span>
                    <div className={styles.jobDropdown_container}>
                        <button className={styles.sortJobs_label} onClick={toggleMenu}>
                            Ordenar
                            <IoIosArrowDown
                                className={`${styles.sortJobs_icon} ${menuOpen ? styles.iconOpen : ""}`}
                            />
                        </button>
                        <ul className={`${styles.dropdownJobs_menu} ${menuOpen ? styles.open : styles.closed}`}>
                            <li onClick={() => handleSort("reports")}>Por reportes</li>
                            <li onClick={() => handleSort("name")}>Por nombre</li>
                            <li onClick={() => handleSort("category")}>Por categoria</li>
                        </ul>
                    </div>
            </div>

        <hr className={styles.job_bar_divider} />

        <div className={styles.scroll_job_wrapper}>
            <div className={styles.scroll_job}>
            <div className={styles.job_scroll_box}>
                {filteredJobs.map((job, index) => (
                <ModeratorCardJob key={index} moderatorJob={job} cardType={true} />
                ))}
            </div>
            </div>
            <div className={styles.bottom_fade}></div>
        </div>
        </div>
    </>
    );
};

export default ModeratorHome;
