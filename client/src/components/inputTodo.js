import React, { useState } from "react";

const InputTodo = ({ createTodo }) => {
  const [description, setDescription] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    createTodo(description);
  };
  return (
    <>
      <form className="d-flex mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          onFocus={(e) => {
            setDescription("");
          }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};
export default InputTodo;
