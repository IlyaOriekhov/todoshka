// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/tasks")
//       .then((res) => res.json())
//       .then((data) => setTasks(data));
//   }, []);

//   const addTask = () => {
//     if (!newTask.trim()) return;

//     fetch("http://localhost:3000/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: newTask }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setTasks([...tasks, data]);
//         setNewTask("");
//       });
//   };

//   const deleteTask = (id) => {
//     fetch("http://localhost:3000/tasks/${id}", {
//       method: "DELETE",
//     }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       addTask();
//     }
//   };

//   return (
//     <div className="App">
//       <h1>TODOOSHKA</h1>
//       <div className="task-input">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="New task"
//         />
//         <button onClick={addTask}>Add task</button>
//       </div>
//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.text}
//             <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks") // або "api/tasks", якщо налаштовано проксі
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []); // <-- Порожній масив залежностей для виконання лише при монтуванні

  const addTask = () => {
    if (!newTask.trim()) return; // Запобігає додаванню порожніх завдань

    fetch("http://localhost:3000/tasks", {
      // або "api/tasks"
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]); // Додаємо нове завдання до локального стану
        setNewTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      // або `api/tasks/${id}`
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Оновлюємо локальний стан лише після успішного видалення на сервері
          setTasks(tasks.filter((task) => task.id !== id));
        } else {
          throw new Error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Додано обробку Enter для зручності користування
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
        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
