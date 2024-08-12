import React, { useState } from 'react';
import Dialog from './Dialog';

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="flex absolute justify-end w-full my-6 h-8">
        <button
          onClick={openDialog}
          className="w-40 mx-10 px-4 bg-cyan-400 font-bold text-black rounded-lg"
        >
          Admin Login
        </button>
      </div>
      {isDialogOpen && <Dialog onClose={closeDialog} />}
    </>
  );
};

export default Navbar;
