import { create } from 'zustand';
import { createNewTask, fetchTasks } from '@/utils/http';

export const useTaskStore = create((set, get) => ({
	tasks: [],
	isLoading: false,
	isError: false,
	getTasks: async () => {
		try {
			set({ isLoading: true });
			const data = await fetchTasks();
			set({ isLoading: false, tasks: data });
		} catch (err) {
			set({ isError: true, isLoading: false });
		}
	},
	createTasks: async (formData) => {
		try {
			set({ isLoading: true });
			const newTasks = await createNewTask(formData);
			const updatedTasks = [...get().tasks, newTasks];
			set({ isLoading: false, tasks: updatedTasks });
			// set((state) => ({
			// 	isLoading: false,
			// 	tasks: [...state.data, newTasks],
			// }));
		} catch (err) {
			set({ isError: true, isLoading: false });
		}
	},
	clearTasks: () => set({ tasks: [] }),
}));
