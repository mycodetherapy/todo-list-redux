import React from 'react';
import './App.css';
import TaskInput from './components/taskInput/TaskInput';
import TaskList from './components/taskList/TaskList';


const App: React.FC = () => {
  return (
    <div className='page'>
      <h1 className='header'>Task Manager</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
