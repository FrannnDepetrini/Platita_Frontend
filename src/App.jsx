import "./App.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import ModalNotification from "./components/ModalNotification/ModalNotification";

function App() {
  return (
    <>
      {/* <Router>
        <AppRoutes />
      </Router> */}
      <ModalNotification />
    </>
  );
}

export default App;
