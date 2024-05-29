import React, { useState } from "react";
import "./TaskInput.css";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksSlice";
import { AppDispatch } from "../../redux/store";

export const TaskInput: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle("");
    }
  };

  return (
    <form className="form" onSubmit={handleAddTask}>
      <input
        className="input"
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button className="button" type="submit">
        Add Task
      </button>
    </form>
  );
};
