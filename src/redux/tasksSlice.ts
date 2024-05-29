import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  filter: "all" | "completed" | "incomplete";
}

const initialState: TasksState = {
  tasks: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTaskTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "incomplete">
    ) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const [removed] = state.tasks.splice(action.payload.startIndex, 1);
      state.tasks.splice(action.payload.endIndex, 0, removed);
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTaskTitle, setFilter, reorderTasks } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => {
  const { tasks, filter } = state.tasks;
  switch (filter) {
    case "completed":
      return tasks.filter((task) => task.completed);
    case "incomplete":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};

export const selectFilter = (state: RootState) => state.tasks.filter;

export default tasksSlice.reducer;
