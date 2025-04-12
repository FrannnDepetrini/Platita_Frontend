import React from "react";
import "./JobCard.css";

const JobCard = ({
  title,
  icon,
  description,
  date,
  location,
  applications,
  reward,
  poster,
  bgColor = "#f1f1f1",
}) => {
  return (
    <div className="job-card" style={{ backgroundColor: bgColor }}>
      <div className="job-card-header">
        <h3>
          <strong>{title}</strong> <span>{icon}</span>
        </h3>
        <span className="reward">{reward}</span>
      </div>
      <p className="job-desc">{description}</p>
      <div className="job-info-inline">
        <span><strong>Fecha:</strong> {date}</span>
        <span className="divider">|</span>
        <span><strong>Ubicación:</strong> {location}</span>
        <span className="divider">|</span>
        <span>{applications}</span>
    </div>

      <div className="job-footer">
        <span>{poster}</span>
        <div className="dot" />
      </div>
    </div>
  );
};

export default JobCard;
