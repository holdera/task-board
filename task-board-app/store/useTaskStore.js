import { create } from 'zustand';
import { createNewTask } from '@/utils/http';

export const useTaskStore = create((set, get) => ({
	tasks: [],
	loading: false,
	error: false,
	setTasks: async (data) => {
		set({ tasks: data });
	},
	// getTasks: async () => {
	// 	try {
	// 		set({ loading: true });
	// 		const data = await fetchTasks();
	// 		set({ loading: false, tasks: data });
	// 	} catch (err) {
	// 		set({ error: true, loading: false });
	// 	}
	// },
	createTasks: async (formData) => {
		try {
			set({ loading: true });
			const newTasks = await createNewTask(formData);
			const updatedTasks = [...get().tasks, newTasks];
			set({ loading: false, tasks: updatedTasks });
		} catch (err) {
			set({ error: true, loading: false });
		}
	},
	clearTasks: () => set({ tasks: [] }),
}));
