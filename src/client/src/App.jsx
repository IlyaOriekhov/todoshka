import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask("");
      });
  };

  const deleteTask = (id) => {
    fetch("http://localhost:3000/tasks/${id}", {
      method: "DELETE",
    }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="App">
      <h1>TODOOSHKA</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New task"
        />
        <button onClick={addTask}>Add task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
