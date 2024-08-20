'use client';
import { useMutation } from '@tanstack/react-query';
import { useModalStore } from '@/store/useModalStore';
import { createNewTask, queryClient } from '@/utils/http';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';

import TaskForm from './TaskForm';

export default function AddTaskForm() {
	const closeModal = useModalStore((state) => state.closeModal);

	const addNewTask = useMutation({
		mutationFn: createNewTask,
		onMutate: (newData) => {
			queryClient.setQueryData(['tasks'], (old) => [...old, newData]);
		},
		onSuccess: () => {
			closeModal();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	function handleAddTask(e) {
		e.preventDefault();
		const form_data = new FormData(e.target);
		const data_form = Object.fromEntries(form_data);
		addNewTask.mutate(data_form);
	}

	return (
		<Modal>
			<TaskForm onSubmit={handleAddTask}>
				<Button type='button' onClick={closeModal}>
					Cancel
				</Button>
				<Button submitBtn>Add New Task</Button>
			</TaskForm>
		</Modal>
	);
}
