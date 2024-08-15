import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../utils/http';

//queries
// const query = useQuery({
// 	queryKey: ['tasks'],
// 	queryFn: ({ signal }) => fetchEvent({ signal }),
// });

const useTaskStore = create((set) => ({
	tasks: [],
	setTasks: (tasks) => set(() => ({ tasks })),
	//addTasks: () => set((state) => console.log(state)),
	clearTasks: () => set({ tasks: [] }),
}));

export default useTaskStore;
