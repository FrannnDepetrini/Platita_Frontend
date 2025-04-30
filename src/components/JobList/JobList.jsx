import React from "react";

import "./JobList.css";
import CardJob from "../cardJob/CardJob";

//Cuando este la api, sacar
const jobs = [
  {
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
    jobTitle: "Arreglar un caño",
    description:
      "Necesito a alguien con conocimientos de plomeria para arreglar un caño de mi casa",
    city: "Santa Fe",
    location: "San Martin 1150",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    jobTitle: "Arreglar cables",
    description:
      "Necesito a alguien con conocimientos de electricista para arreglar cables pelados en mi negocio",
    city: "Esperanza",
    location: "Jujuy 274",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
];

const JobList = ({ handleOpenLogin }) => {
  const jobsMapped = () =>
    jobs.map((job, index) => (
      <CardJob key={index} handleOpenLogin={handleOpenLogin} jobInfo={job} />
    ));
  return (
    <div className="job-list-wrapper">
      <h2 className="job-list-title">Algunos de los trabajos</h2>
      <div className="scroll-job">
        <div className="job-scroll-box">{jobsMapped()}</div>
      </div>
      <h2>...</h2>
    </div>
  );
};

export default JobList;
