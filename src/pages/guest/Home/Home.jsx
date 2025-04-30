import React from "react";
import "./Home.css";
import Hero from "../../../components/Hero/Hero";
import JobList from "../../../components/JobList/JobList";
import Welcome from "../Welcome/Welcome";
import Categories from "../../../components/categories/Categories/Categories";
import { useOutletContext } from "react-router-dom";
const Home = () => {
  const { categoriesRef, handleOpenLogin } = useOutletContext();
  return (
    <div className="home_container">
      <section>
        <Welcome handleOpenLogin={handleOpenLogin} />
      </section>
      <section ref={categoriesRef} id="categories" className="categories">
        <Categories />
      </section>
    </div>
  );
};

export default Home;
