import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask } from '../../redux/tasksSlice';
import { AppDispatch } from '../../redux/store';
import { Task } from '../../types/Task'

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => dispatch(toggleTask(task.id))} 
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
