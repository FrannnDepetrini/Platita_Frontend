import "./App.css";
import React from "react";
// import HomePage from "./pages/HomePage";
// import Home from "./pages/Home/Home";
import JobCard from "./components/JobCard/JobCard";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";

// jobTitle,
//   description,
//   date,
//   location,
//   applications,
//   price,
//   userName,
//   userRole,

var jobInfo = {
  jobTitle: "Levantar un tapial",
  description:
    "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
  date: "Para esta semana",
  location: "Santa fe 50, Rosario",
  applications: 300,
  averagePrice: 10000,
  userName: "Fulano Detal",
  category: "Construction",
};

function App() {
  return (
    <div>
      {/* <JobCard jobInfo={jobInfo} />; */}
      {/* <Layout>
        <h1>main</h1>
      </Layout> */}
      {/* <Home></Home> */}
      <Home></Home>
    </div>
  );
}

export default App;
