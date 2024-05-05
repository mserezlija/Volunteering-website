import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Home/Navbar";
import Home from "./components/Home/Home";
import Activities from "./components/Activities/Activities";
import Volunteers from "./components/Volunteers/Volunteers";
import Organizations from "./components/Organizations/Organizations";
import { AdminProvider } from "./Admin/AdminContext";

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
};

export default App;
