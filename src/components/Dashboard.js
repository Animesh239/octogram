import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [isAdmin, setIsAdmin] = useState(true); // Assume admin status for this example

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/problems");
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit problem with id: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/problems/${id}`);
      setProblems(problems.filter((problem) => problem.id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const handleFlip = (id, flipState) => {
    setFlippedCards({ ...flippedCards, [id]: flipState });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <Card
            key={problem.id}
            id={problem.id}
            category={problem.category}
            question={problem.question}
            answer={problem.answer}
            flipped={flippedCards[problem.id] || false}
            setFlipped={(flipState) => handleFlip(problem.id, flipState)}
            onEdit={() => handleEdit(problem.id)}
            onDelete={() => handleDelete(problem.id)}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
