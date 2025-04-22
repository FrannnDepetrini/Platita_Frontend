import "./App.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./services/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
