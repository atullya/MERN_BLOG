import React, { useRef } from "react";

import Navbar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
import Home from "./Pages/Guest/Home";

export const BASE_URL = "http://localhost:4000";
const App = () => {
  // Create a ref for the home section
  const homeRef = useRef(null);

  // Function to handle smooth scrolling
  const scrollToHome = () => {
    homeRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <Navbar />

      <Home homeRef={homeRef} />
    </div>
  );
};

export default App;
