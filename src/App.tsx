import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Activities from "./components/Activities";
import Volunteers from "./components/Volunteers";
import Organizations from "./components/Organizations";
import { AppProvider } from "./pages/AppContext";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
