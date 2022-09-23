const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); //req.body

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const listTodos = await pool.query("SELECT * FROM todo ORDER BY id ");
    res.json(listTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryTodo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(queryTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatingTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE id=$2 RETURNING *",
      [description, id]
    );
    res.json(updatingTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE id=$1", [id]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
