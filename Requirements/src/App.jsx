import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "Pending",
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Pending" ? "Done" : "Pending" }
          : task
      )
    );
  };

  const editTask = (id) => {
    const t = tasks.find((task) => task.id === id);
    if (t) {
      setTitle(t.title);
      setDescription(t.description);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      {/* العنوان في النص */}
      <div className="title-wrapper">
        <h1 className="title">To-Do Manager</h1>
      </div>
      <p className="subtitle">✔ Manage your tasks easily ✔</p>

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

      <div className="form-separator"></div>

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
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No tasks yet
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
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
