// AdminProvider.js
import React, { useState, useEffect } from "react";
import { AdminContext } from "./adminContext";

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    // Retrieve the admin state from local storage, default to false if not present
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : false;
  });

  useEffect(() => {
    // Store the admin state in local storage
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
