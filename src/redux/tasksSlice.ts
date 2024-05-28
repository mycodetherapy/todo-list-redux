import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
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
  },
});

export const { addTask, removeTask, toggleTask, updateTaskTitle } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;
