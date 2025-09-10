import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("ALL");

  // load tasks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error("Error reading tasks:", err);
    }
  }, []);

  // save tasks
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Error saving tasks:", err);
    }
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "Pending",
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Pending" ? "Done" : "Pending" }
          : t
      )
    );
  };

  const editTask = (id) => {
    setTasks((prev) => {
      const t = prev.find((task) => task.id === id);
      if (t) {
        setTitle(t.title);
        setDescription(t.description);
      }
      return prev.filter((task) => task.id !== id);
    });
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // فلترة
  const filteredTasks = tasks.filter((t) => {
    if (filter === "ALL") return true;
    if (filter === "DONE") return t.status === "Done";
    if (filter === "PENDING") return t.status === "Pending";
    return true;
  });

  return (
    <div className="container">
      {/* العنوان */}
      <div className="title-wrapper">
        <h1 className="title">To-Do Manager</h1>
      </div>
      <p className="subtitle">✔ Manage your tasks easily ✔</p>

      {/* الفورم */}
      <div className="task-form">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="submit-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* الفلترة */}
      <div className="filter-buttons">
        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          الجميع
        </button>
        <button
          className={filter === "DONE" ? "active" : ""}
          onClick={() => setFilter("DONE")}
        >
          منتهي
        </button>
        <button
          className={filter === "PENDING" ? "active" : ""}
          onClick={() => setFilter("PENDING")}
        >
          قيد الانتظار
        </button>
      </div>

      {/* الجدول */}
      <table>
        <thead>
          <tr>
            <th style={{ width: "8%" }}>Index</th>
            <th style={{ width: "30%" }}>Task Title</th>
            <th style={{ width: "30%" }}>Description</th>
            <th style={{ width: "12%" }}>Status</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No tasks yet
              </td>
            </tr>
          ) : (
            filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  {task.status === "Pending" ? (
                    <span style={{ color: "orange" }}>⏳ Pending</span>
                  ) : (
                    <span style={{ color: "green" }}>✔ Done</span>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn green"
                      onClick={() => toggleDone(task.id)}
                    >
                      Done
                    </button>
                    <button
                      className="btn blue"
                      onClick={() => editTask(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn red"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
