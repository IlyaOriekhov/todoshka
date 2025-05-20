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
  {
    id: 4,
    text: "Watch the movie",
  },
  {
    id: 5,
    text: "Clear ur mind",
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
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== taskId);

  if (task.length < initialLength) {
    res.status(200).json({ message: "Task deleted" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
