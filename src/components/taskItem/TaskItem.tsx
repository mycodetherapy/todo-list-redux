import React from 'react';
import './Taskitem.css';
import { useDispatch } from 'react-redux';
import {
  toggleTask,
  removeTask,
  updateTaskTitle,
} from '../../redux/tasksSlice';
import { AppDispatch } from '../../redux/store';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className='task' onSubmit={handleSubmit}>
      <span className='task__button tusk__button_move' />
      <input
        className='task__content'
        type='text'
        value={task.title}
        onChange={(e) =>
          dispatch(updateTaskTitle({ id: task.id, title: e.target.value }))
        }
      />
      <button
        className={`task__button task__button_pending ${
          task.completed ? 'task__button_complited' : ''
        }`}
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.completed ? 'Completed' : 'Pending'}
      />
      <button
        className={'task__button task__button_remove'}
        onClick={() => dispatch(removeTask(task.id))}
        aria-label='Remove'
      />
    </form>
  );
};
