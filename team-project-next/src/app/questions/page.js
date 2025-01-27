"use client";
import React, { useState, useEffect } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

const API_URL = "/api/v1/question";

export default function Question() {
  const [qaData, setQaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("newer");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQaData(data);
    } catch (err) {
      console.error("Error fetching questions");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        const res = await fetch(`${API_URL}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Send the ID in the request body
        });

        if (res.ok) {
          // Refresh the questions after deletion
          fetchQuestions();
        } else {
          console.error("Failed to delete the question");
        }
      } catch (err) {
        console.error("Error deleting question", err);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="question-container">
      <h1 className="question-title">Questions</h1>
      <input
        type="text"
        placeholder="Search"
        className="question-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="question-filter">
        <p>Filter by:</p>
        <div className="flex">
          <button className="filter-button" onClick={() => setFilter("newer")}>
            <FaArrowDownLong className="icon-filter" /> Newer
          </button>
          <button className="filter-button" onClick={() => setFilter("older")}>
            <FaArrowDownLong className="icon-filter" /> Older
          </button>
        </div>
      </div>
      {loading ? (
        <p className="loading-text">Loading questions...</p>
      ) : error ? (
        <p className="error-text">Error: {error.message}</p>
      ) : (
        qaData.map((item) => (
          <div key={item._id} className="question-item">
            <div className="question-data">
              <Link href={`/questions/${item._id}`} className="question-link">
                <div>
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-description">{item.description}</p>
                </div>
                <p className="item-date">ll</p>
              </Link>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="delete-button"
            >
              <FaTrash className="icon-delete-btn" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
