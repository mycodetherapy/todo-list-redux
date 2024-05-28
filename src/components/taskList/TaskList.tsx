import React from "react";
import "./TaskList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskItem from "../taskItem/TaskItem";
import { selectTasks } from "../../redux/tasksSlice";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => selectTasks(state));

  return (
    <ul className="list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
