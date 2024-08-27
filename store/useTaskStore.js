import { create } from 'zustand';

export const useTaskStore = create((set) => ({
	tasks: [],
	parent: [
		{
			id: 'todo',
			title: 'To do',
			cards: [],
		},
		{
			id: 'inProgress',
			title: 'In Progress',
			cards: [],
		},
		{
			id: 'qa',
			title: 'In QA',
			cards: [],
		},
		{
			id: 'completed',
			title: 'Completed',
			cards: [],
		},
	],
	loading: false,
	error: false,
	setTasks: async (data) => {
		set({ tasks: data });
	},
	setParent: (data) => set({ parent: data }),
	clearTasks: () => set({ tasks: [] }),
}));
