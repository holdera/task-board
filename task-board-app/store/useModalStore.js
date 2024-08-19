import { create } from 'zustand';

export const useModalStore = create((set) => ({
	// modals: [
	// 	{ modal: 'edit', modalIsOpen: false },
	// 	{ modal: 'add', modalIsOpen: false },
	// 	{ modal: 'delete', modalIsOpen: false },
	// ],
	addTaskModal: false,
	deleteTaskModal: false,
	taskId: '',
	editTaskModal: false,
	openAddTaskModal: () => {
		set({
			addTaskModal: true,
		});
	},
	openDeleteTaskModal: (id) => {
		set({
			deleteTaskModal: true,
			taskId: id,
		});
	},
	openEditTaskModal: () => {
		set({
			editTaskModal: true,
		});
	},

	closeModal: () => {
		set({
			addTaskModal: false,
			deleteTaskModal: false,
			editTaskModal: false,
			taskId: '',
		});
	},
}));
