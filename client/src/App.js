import { useState, useEffect } from "react";
import InputTodo from "./components/inputTodo";
import TodosList from "./components/listTodos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const createTodo = async (description) => {
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      setTodos([...todos, result]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = async (description, todoId) => {
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      const index = todos.findIndex((todo) => todo.id === todoId);
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1, result);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const result = await response.json();
      setTodos(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDelete = async (todoId) => {
    try {
      await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return todos ? (
    <div className="container">
      <h1 className="text-center mt-5">Pern todo list</h1>
      <InputTodo createTodo={createTodo} />
      <TodosList
        todos={todos}
        onDelete={handleDelete}
        updateTodo={updateTodo}
      />
    </div>
  ) : (
    "Loading"
  );
}

export default App;
