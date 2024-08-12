// App.js
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./context/adminContext"; 
import "./index.css";
import Carousel from "./components/carousel";
import Navbar from "./components/navbar";
import Dialog from "./components/Dialog";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { admin } = useContext(AdminContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Navbar onAdminLogin={() => setIsDialogOpen(true)} />
      {admin ? (
        <Dashboard />
      ) : (
        <div className="z-10 min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
          <Carousel />
        </div>
      )}
      {isDialogOpen && (
        <Dialog onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
};

export default App;
