import "./App.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./services/AuthContext";
import { ModalContextProvider } from "./services/ModalContext";

function App() {
  return (
    <>

      <Router>
        <AuthContextProvider>
          <ModalContextProvider>
            <AppRoutes />
          </ModalContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
