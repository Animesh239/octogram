import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [isAdmin, setIsAdmin] = useState(true);
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProblemId, setEditProblemId] = useState(null);

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

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8000/api/admin/add", {
        category,
        question,
        answer,
      });
      setProblems([...problems, { categories: category, question, answer }]);
      setCategory("");
      setQuestion("");
      setAnswer("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/admin/update/${editProblemId}`,
        {
          category,
          question,
          answer,
        }
      );
      setProblems(
        problems.map((problem) =>
          problem.id === editProblemId
            ? { ...problem, category, question, answer }
            : problem
        )
      );
      setEditProblemId(null);
      setIsModalOpen(false);
      setAnswer("");
      setCategory("");
      setQuestion("");
    } catch (error) {
      console.error("Error editing problem:", error);
    }
  };

  const openEditModal = (id) => {
    const problem = problems.find((problem) => problem.id === id);
    if (problem) {
      setCategory(problem.categories);
      setQuestion(problem.question);
      setAnswer(problem.answer);
      setEditProblemId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/delete/${id}`);
      setProblems(problems.filter((problem) => problem.id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const handleFlip = (id, flipState) => {
    setFlippedCards({ ...flippedCards, [id]: flipState });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProblemId(null);
    setCategory("");
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem, index) => (
          <Card
            key={problem.id}
            id={problem.id}
            index={index}
            category={problem.categories}
            question={problem.question}
            answer={problem.answer}
            flipped={flippedCards[problem.id] || false}
            setFlipped={(flipState) => handleFlip(problem.id, flipState)}
            onEdit={() => openEditModal(problem.id)}
            onDelete={() => handleDelete(problem.id)}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      {isAdmin && (
        <button
          className="mt-6 bg-green-500 text-white text-sm px-4 py-2 rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          Add Problem
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-4">
              {editProblemId ? "Edit Problem" : "Add Problem"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Question</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black rounded"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Answer</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black rounded"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={editProblemId ? handleEdit : handleAdd}
              >
                {editProblemId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
