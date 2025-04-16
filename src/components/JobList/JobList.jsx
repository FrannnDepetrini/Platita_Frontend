import React from "react";

import { GiBrickWall } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { FaHammer } from "react-icons/fa";
import "./JobList.css";
import JobCard from "../JobCard/JobCard";

//Cuando este la api, sacar
const jobs = [
  {
    jobTitle: "Levantar un tapial",
    description:
      "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    date: "Para esta semana",
    location: "Santa fe 50, Rosario",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    jobTitle: "Levantar un tapial",
    description:
      "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    date: "Para esta semana",
    location: "Santa fe 50, Rosario",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    jobTitle: "Levantar un tapial",
    description:
      "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    date: "Para esta semana",
    location: "Santa fe 50, Rosario",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
];

const jobsMapped = () =>
  jobs.map((job, index) => <JobCard key={index} jobInfo={job} />);

const JobList = () => {
  return (
    <div className="job-list-wrapper">
      <h2 className="job-list-title">Algunos de los trabajos</h2>
      <div className="job-scroll-box">{jobsMapped()}</div>
      <h2>...</h2>
    </div>
  );
};

export default JobList;
