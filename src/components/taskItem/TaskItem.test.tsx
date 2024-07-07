import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { TasksState } from '../../redux/tasksSlice';
import { TaskItem } from './TaskItem';
import { RootState } from '../../redux/store';

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

describe('TaskItem Component', () => {
  test('toggles task completion', () => {
    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: [{ id: '1', title: 'Task 1', completed: false }],
        filter: 'all',
      },
    };

    const { store } = renderWithProviders(
      <TaskItem task={preloadedState.tasks.tasks[0]} />,
      { preloadedState }
    );

    const toggleButton = screen.getByRole('button', { name: /pending/i });
    fireEvent.click(toggleButton);

    const state = store.getState() as RootState;
    expect(state.tasks.tasks[0].completed).toBe(true);
  });

  test('removes task', () => {
    const preloadedState: { tasks: TasksState } = {
      tasks: {
        tasks: [{ id: '1', title: 'Task 1', completed: false }],
        filter: 'all',
      },
    };

    const { store } = renderWithProviders(
      <TaskItem task={preloadedState.tasks.tasks[0]} />,
      { preloadedState }
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    const state = store.getState() as RootState;
    expect(state.tasks.tasks).toHaveLength(0);
  });
});
