import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./utils";
import tasksReducer, { TasksState } from "../redux/tasksSlice";

const initialTasksState: TasksState = {
  tasks: [],
  filter: 'all',
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: preloadedState?.tasks || initialTasksState,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;



