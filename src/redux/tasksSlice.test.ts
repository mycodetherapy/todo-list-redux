import tasksReducer, {
  addTask,
  removeTask,
  toggleTask,
  updateTaskTitle,
  setFilter,
  reorderTasks,
  TasksState,
} from './tasksSlice';

describe('tasksSlice', () => {
  const initialState: TasksState = {
    tasks: [],
    filter: 'all',
  };

  test('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addTask', () => {
    const actual = tasksReducer(initialState, addTask('New Task'));
    expect(actual.tasks.length).toEqual(1);
    expect(actual.tasks[0].title).toEqual('New Task');
  });

  test('should handle removeTask', () => {
    const stateWithTask: TasksState = {
      tasks: [{ id: '1', title: 'Task 1', completed: false }],
      filter: 'all',
    };
    const actual = tasksReducer(stateWithTask, removeTask('1'));
    expect(actual.tasks.length).toEqual(0);
  });

  test('should handle toggleTask', () => {
    const stateWithTask: TasksState = {
      tasks: [{ id: '1', title: 'Task 1', completed: false }],
      filter: 'all',
    };
    const actual = tasksReducer(stateWithTask, toggleTask('1'));
    expect(actual.tasks[0].completed).toEqual(true);
  });

  test('should handle updateTaskTitle', () => {
    const stateWithTask: TasksState = {
      tasks: [{ id: '1', title: 'Task 1', completed: false }],
      filter: 'all',
    };
    const actual = tasksReducer(
      stateWithTask,
      updateTaskTitle({ id: '1', title: 'Updated Task' })
    );
    expect(actual.tasks[0].title).toEqual('Updated Task');
  });

  test('should handle setFilter', () => {
    const actual = tasksReducer(initialState, setFilter('completed'));
    expect(actual.filter).toEqual('completed');
  });

  test('should handle reorderTasks', () => {
    const stateWithTasks: TasksState = {
      tasks: [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ],
      filter: 'all',
    };
    const actual = tasksReducer(
      stateWithTasks,
      reorderTasks({ startIndex: 0, endIndex: 1 })
    );
    expect(actual.tasks[0].id).toEqual('2');
    expect(actual.tasks[1].id).toEqual('1');
  });
});
