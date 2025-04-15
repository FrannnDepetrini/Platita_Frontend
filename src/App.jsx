import "./App.css";
import Categories from "./components/categories/Categories";
import Navbar from "./components/categories/Navbar";
import Footer from "./components/categories/Footer";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar/>
      <Categories/>
      <Footer />
    </div>
  );
}

export default App;
