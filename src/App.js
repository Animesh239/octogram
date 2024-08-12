import React from "react";
import "./index.css";
import Carousel from "./components/carousel";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
      <Carousel />
    </div>
  );
};

export default App;
