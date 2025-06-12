import { useEffect, useState, useCallback } from "react";

import ComplaintCard from "../ComplaintCard/ComplaintCard";
import styles from "./ComplaintList.module.css";
import { IoMdArrowDropdown } from "../../utils/icons/icons";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState("true");

  // Fetch de solicitudes reales desde API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://magicloops.dev/api/loop/047d7cbb-65c1-4e24-8eb1-adc0ac828146/run?input=Hello+World"
        );
        /*, {
        headers: {
          Authorization: `API_KEY`,
          "Content-Type": "application/json",
        },
        */
        if (!response.ok) throw new Error("Error al obtener solicitudes");
        const data = await response.json();
        setComplaints(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando trabajos:", error);
      }
    };

    fetchJobs();
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const handleSort = useCallback((type) => {
    setComplaints((prevComplaints) => {
      const sortedComplaints = [...prevComplaints];

      switch (type) {
        case "date-desc":
          sortedComplaints.sort(
            (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
          );
          break;
        case "date-asc":
          sortedComplaints.sort(
            (a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt)
          );
          break;

        default:
          break;
      }

      return sortedComplaints;
    });

    setMenuOpen(false);
  }, []);

  return (
    <div className={styles.erjob_layout}>
      <div className={styles.erjob_list_wrapper}>
        <div className={styles.titleAndSort_container}>
          <span className="search-label">Quejas</span>
          <div className="dropdown-container">
            <button className="sort-label" onClick={toggleMenu}>
              Ordenar
              <IoMdArrowDropdown
                className={`sort-icon ${menuOpen ? "open" : ""}`}
              />
            </button>
            <ul className={`dropdown-menu ${menuOpen ? "open" : "closed"}`}>
              <li onClick={() => handleSort("date-asc")}>
                Por fecha ascendente
              </li>
              <li onClick={() => handleSort("date-desc")}>
                Por fecha descendente
              </li>
            </ul>
          </div>
        </div>

        <hr className={styles.erjob_bar} />

        <div className={styles.erscroll_job_wrapper}>
          <div className={styles.erscroll_job}>
            <div className={styles.erjob_scroll_box}>
              {loading ? (
                <div className={styles.loader}></div>
              ) : (
                <>
                  {complaints.map((com) => (
                    <ComplaintCard
                      key={com.id}
                      complaintInfo={com}
                      cardType={true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className={styles.fade_bottom}></div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
