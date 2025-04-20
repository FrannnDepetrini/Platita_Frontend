import "./App.css";
import React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/guest/Home/Home";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <AppRoutes />
    </Router>
     </>
}

export default App;

