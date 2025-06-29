import { useMemo, useState, useCallback, useEffect } from "react";
import { IoIosArrowDown } from "../../../utils/icons/icons";
import styles from "./ModeratorHome.module.css";
import ModeratorCardJob from "./ModeratorCardJob";
import { moderartorService } from "../../../services/moderatorServices/moderatorServices";

const ModeratorHome = ({  }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moderatorJobs, setModeratorJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {getJobsForModerator} = moderartorService;

    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

    useEffect(() => {
        const fetchingJobs = async () => {
            try {
                const response = await getJobsForModerator();
                if (response){
                    setModeratorJobs(response);
                }
            }catch (error) {
                console.error("Error fetching jobs for moderator:", error);
            }
        }

        fetchingJobs();
    },[])

    const handleSort = useCallback((type) => {
    setModeratorJobs((prevJobs) => {
    const sortedJobs = [...prevJobs];

    switch (type) {
        case "reports":
        sortedJobs.sort((a, b) => b.reportCount - a.reportCount);
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
        job.title.toLowerCase().includes(term) ||
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
