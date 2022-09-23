import React from "react";
import EditTodo from "./editTodo";
const TodosList = ({ todos, onDelete, updateTodo }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Todo</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos?.map((todo, index) => (
          <tr key={todo.id}>
            <th scope="row">{index + 1}</th>
            <td>{todo.description}</td>

            <td>
              <EditTodo updateTodo={updateTodo} todo={todo} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodosList;
