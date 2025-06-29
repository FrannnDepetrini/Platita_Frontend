import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/contexts/AuthProvider";
import { ModalContextProvider } from "./services/contexts/ModalContext";
import { ThemeProvider } from "./services/contexts/ThemeContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ModalContextProvider>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </ModalContextProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
