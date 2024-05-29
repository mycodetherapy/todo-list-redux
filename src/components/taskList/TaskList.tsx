import React from "react";
import "./TaskList.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import TaskItem from "../taskItem/TaskItem";
import { reorderTasks, selectTasks } from "../../redux/tasksSlice";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => selectTasks(state));
  const dispatch: AppDispatch = useDispatch();

  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLLIElement>,
    endIndex: number
  ) => {
    event.preventDefault();
    const startIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (startIndex !== endIndex) {
      dispatch(reorderTasks({ startIndex, endIndex }));
    }
  };

  return (
      <ul className="list">
        {tasks.map((task, index) => (
          <li
          key={task.id}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          >
            <TaskItem key={task.id} task={task} />
          </li> 
        ))}
      </ul>
   
  );
};

export default TaskList;
