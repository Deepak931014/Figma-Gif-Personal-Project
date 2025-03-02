import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
import Details from "./pages/Details";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FestivalPage from "./pages/FestivalPage"; // Add other pages you want to route to
import PosterPage from "./pages/PosterPage";
import FestivalDetails from "./pages/FestivalDetail"; // Import the FestivalDetails page

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/festival/:id" element={<FestivalDetails />} /> {/* Festival Details Route */}
        <Route path="/poster" element={<PosterPage />} />
        {/* Add additional routes for other pages here */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
