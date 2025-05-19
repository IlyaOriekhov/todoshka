import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    text: "Go to the bakery",
  },
  {
    id: 2,
    text: "Drink a coffee",
  },
  {
    id: 3,
    text: "Go to the gym",
  },
];

// app.get("/", (req, res) => {
//   res.status(200).json(tasks);
// });

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.text,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);

  res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
