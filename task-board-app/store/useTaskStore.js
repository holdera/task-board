import { create } from 'zustand';

export const useTaskStore = create((set) => ({
	tasks: [],
	loading: false,
	error: false,
	setTasks: async (data) => {
		set({ tasks: data });
	},
	clearTasks: () => set({ tasks: [] }),
}));
