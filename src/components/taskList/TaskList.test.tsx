import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { TasksState, addTask } from '../../redux/tasksSlice';
import { TaskList } from './TaskList';
import { RootState } from '../../redux/store';
import { TaskInput } from '../taskInput/TaskInput';

interface RenderWithProvidersOptions {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { tasks: tasksReducer },
      preloadedState: preloadedState as RootState,
    }),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

describe('TaskList Component', () => {
  test('renders tasks correctly', () => {
    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: [
          { id: '1', title: 'Task 1', completed: false },
          { id: '2', title: 'Task 2', completed: true },
        ],
        filter: 'all',
      },
    };

    renderWithProviders(<TaskList />, { preloadedState });

    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task 2')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: [],
        filter: 'all',
      },
    };

    const { store } = renderWithProviders(
      <>
        <TaskInput />
        <TaskList />
      </>,
      { preloadedState }
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add Task'));

    const state = store.getState() as RootState;
    const actions = state.tasks.tasks;
    expect(actions).toHaveLength(1);
    expect(actions[0].title).toBe('New Task');
  });

  test('updates task title', () => {
    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: [{ id: '1', title: 'Task 1', completed: false }],
        filter: 'all',
      },
    };

    renderWithProviders(<TaskList />, { preloadedState });

    const inputElement = screen.getByDisplayValue('Task 1') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Updated Task' } });

    expect(screen.getByDisplayValue('Updated Task')).toBeInTheDocument();
  });
});
