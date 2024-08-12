import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => setIsDialogOpen(false);

  // check for admin:true in local storage, if true show logout instead of login
  useEffect(() => {
    const adminLS = localStorage.getItem("admin");
    if (adminLS === "true") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(false);
    window.location.reload();
  };

  return (
    <>
      <div className="flex absolute justify-end w-full my-6 h-8">
        {/* <button
          onClick={openDialog}
          className="w-40 mx-10 px-4 bg-cyan-400 font-bold text-black rounded-lg"
        >
          Admin Login
        </button> */}

        {admin ? (
          <button
            onClick={handleLogout}
            className="w-40 mx-10 px-4 bg-cyan-400 font-bold text-black rounded-lg"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={openDialog}
            className="w-40 mx-10 px-4 bg-cyan-400 font-bold text-black rounded-lg"
          >
            Admin Login
          </button>
        )}
      </div>
      {isDialogOpen && <Dialog onClose={closeDialog} />}
    </>
  );
};

export default Navbar;
