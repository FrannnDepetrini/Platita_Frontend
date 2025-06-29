import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CardJobRequest from "../CardJobRequest/CardJobRequest";
import "./EmployerRequestList.css";
import { jobService } from "../../services/jobService/jobService";

const EmployerRequestList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState("true");

  // Fetch de solicitudes reales desde API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getMyJobs();
        console.log(response);
        setJobs(response);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredJobs = useMemo(() => {
    console.log(jobs);
    const jobsAvailable = jobs.filter(
      (j) => j.status === "Available" || j.status === "Taken"
    );
    const term = searchTerm.toLowerCase();
    return jobsAvailable.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
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
