import React from "react";
import "./App.css";
import { TaskInput } from "./components/taskInput/TaskInput";
import { FilterPanel } from "./components/filterPanel/FilterPanel";
import { TaskList } from "./components/taskList/TaskList";

export const App: React.FC = () => {
  return (
    <div className="page">
      <h1 className="header">Task Manager</h1>
      <TaskInput />
      <FilterPanel />
      <TaskList />
    </div>
  );
};
