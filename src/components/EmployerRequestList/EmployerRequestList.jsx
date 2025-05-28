import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CardJobRequest from "../CardJobRequest/CardJobRequest";
import "./EmployerRequestList.css";

const EmployerRequestList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState("true");

  // Fetch de solicitudes reales desde API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://magicloops.dev/api/loop/dea8a378-20bb-45ea-8cf8-111ee33d69c8/run?input=Hello+World"
        );
        /*, {
        headers: {
          Authorization: `API_KEY`,
          "Content-Type": "application/json",
        },
        */
        if (!response.ok) throw new Error("Error al obtener solicitudes");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando trabajos:", error);
      }
    };

    fetchJobs();
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
    <div className="erjob-layout">
      <div className="erjob-list-wrapper">
        <div className="erjob-searcher">
          <span className="ersearch-label">Solicitudes</span>
          <div className="ersearch-box">
            <FiSearch className="ersearch-icon" />
            <input
              type="text"
              placeholder="Buscar"
              className="ersearch-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <hr className="erjob-bar" />

        <div className="erscroll-job-wrapper">
          <div className="erscroll-job">
            <div className="erjob-scroll-box">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  {filteredJobs.map((job) => (
                    <CardJobRequest
                      key={job.id}
                      jobInfo={job}
                      cardType={true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="fade-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployerRequestList;
