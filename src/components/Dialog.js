import React, { useRef, useState } from "react";
import axios from "axios";

const Dialog = ({ onClose }) => {
  const dialogRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close the dialog when clicking outside of it
  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        alert("Login successful");
        onClose();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(`Login failed: ${error.response.statusText}`);
        }
        console.log("Error response:", error.response);
      } else if (error.request) {
        alert(
          "No response from the server. Please check your network connection."
        );
        console.log("Error request:", error.request);
      } else {
        alert("An error occurred. Please try again.");
        console.log("Error message:", error.message);
      }
    }
  };
  return (
    <div
      onClick={handleClickOutside}
      className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div
        ref={dialogRef}
        className="relative p-2 rounded-lg w-1/3 bg-gradient-to-r from-gray-900 to-black border border-transparent
        before:absolute before:inset-0 before:border-2 before:border-transparent before:rounded-lg before:bg-gradient-to-r before:from-cyan-400 before:to-purple-500 before:blur before:animate-borderMove"
      >
        <div className="relative bg-gray-900 p-4 rounded-lg z-10">
          <h2 className="text-xl font-bold mb-4 text-white">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-cyan-400 text-black font-bold py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
