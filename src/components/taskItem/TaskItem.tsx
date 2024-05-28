import React from 'react';
import './Taskitem.css'
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask, updateTaskTitle } from '../../redux/tasksSlice';
import { AppDispatch } from '../../redux/store';
import { Task } from '../../types/Task'

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 }

  return (
    <form className='task' onSubmit={handleSubmit}>
     <input 
       className='task__content'
        type="text" 
        value={task.title} 
        onChange={(e) => dispatch(updateTaskTitle({ id: task.id, title: e.target.value }))} 
      />
      <button
        className={`task__button task__progress ${task.completed ? 'task__progress_complited' : ''}`}
        onClick={() => dispatch(toggleTask(task.id))} 
      />
      <button className={'task__button task__remove'} onClick={() => dispatch(removeTask(task.id))}/>
    </form>
  );
};

export default TaskItem;
