import request from "supertest";
import { app } from "../index.js";

describe("Todo API", () => {
  let testTaskId;

  beforeAll(async () => {
    const res = await request(app).post("/tasks").send({ text: "Test task" });
    testTaskId = res.body.id;
  });

  afterAll(async () => {
    await request(app).delete(`/tasks/${testTaskId}`);
  });

  it("GET /tasks - should return 200 and array of tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          text: expect.any(String),
        }),
      ])
    );
  });

  it("POST /tasks - should create new task", async () => {
    const newTask = { text: "New test task" };
    const res = await request(app).post("/tasks").send(newTask);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newTask);
  });

  it("DELETE /tasks/:id - should delete task", async () => {
    const res = await request(app).delete(`/tasks/${testTaskId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Task deleted" });
  });
});
