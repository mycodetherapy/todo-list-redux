import React from 'react';
import TaskInput from './components/taskInput/TaskInput';
import TaskList from './components/taskList/TaskList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
