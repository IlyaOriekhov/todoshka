import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, seNewTask] = useState("");

  useEffect(() => {
    fetch("api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  });

  const addTask = () => {
    fetch("api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    })
      .then((res) => res.json())
      .then((data) => setTasks([...tasks, data]));
    setNewTask("");
  };

  const deleteTask = (id) => {
    fetch("api/tasks/${id}", {
      method: "DELETE",
    }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div className="App">
      <h1>TODOOSHKA</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add task</button>
      <ul>
        {tasks.map((task) => {
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete task</button>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
