import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import JobList from "../../components/JobList/JobList";
import Navbar from "../../components/Navbar/Navbar";
import Layout from "../../components/Layout/Layout";
const Home = () => {
  return (
    <Layout>
      {/* <header>
        <Navbar />
      </header> */}

      {/* <Hero />

      <JobList /> */}
      <div className="home_container">
        <div className="hero_container">
          <Hero></Hero>
        </div>
        <div className="jobList_container">
          <JobList></JobList>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
