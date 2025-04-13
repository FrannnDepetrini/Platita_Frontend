import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import JobList from "../../components/JobList/JobList";
import Navbar from "../../components/Navbar/Navbar";
const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="home-layout">
        <div className="hero-section">
          <Hero />
        </div>
        <div className="jobs-section">
          <JobList />
        </div>
        
    </main>
    </div>
  );
};

export default Home;