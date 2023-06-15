import create from 'zustand';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskManagerState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
  searchTask: string;
  setSearchTask: (searchTerm: string) => void;
}

const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task], // Add the new task to the tasks array
    }));
  },
  updateTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task // Update the specified task with the new details
      ),
    }));
  },
  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId), // Remove the task with the specified ID from the tasks array
    }));
  },
  searchTask: '',
  setSearchTask: (searchTerm) => {
    set((state) => ({
      ...state,
      searchTask: searchTerm,
    }));
  },
}));


export {
  useTaskManager
}