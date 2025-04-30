import React from "react";
import "./Welcome.css";
import Hero from "../../../components/Hero/Hero";
import JobList from "../../../components/JobList/JobList";

const Welcome = ({ handleOpenLogin }) => {
  return (
    <div className="Welcome_container">
      <div className="hero_container">
        <Hero></Hero>
      </div>
      <div className="jobList_container">
        <JobList handleOpenLogin={handleOpenLogin}></JobList>
      </div>
    </div>
  );
};

export default Welcome;
