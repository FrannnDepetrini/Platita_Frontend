import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/contexts/AuthProvider";
import { ModalContextProvider } from "./services/ModalContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ModalContextProvider>
            <AppRoutes />
          </ModalContextProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
