import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TaskItem from '../taskItem/TaskItem';
import { selectTasks } from '../../redux/tasksSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => selectTasks(state));

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
