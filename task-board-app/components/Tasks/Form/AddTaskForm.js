'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useModalStore } from '@/store/useModalStore';
import { createNewTask, queryClient } from '@/utils/http';
import Button from '@/components/UI/Button';
import Input from './Input';
import Modal from '@/components/UI/Modal';
import Select from './Select';

export default function AddTaskForm() {
	const closeModal = useModalStore((state) => state.closeModal);

	const addNewTask = useMutation({
		mutationFn: createNewTask,
		onSuccess: () => {
			console.log('success');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
			<form id='task-form' onSubmit={handleAddTask}>
				<Input
					type='text'
					label='Task'
					id='task_name'
					name='task_name'
				/>

				<Input
					textarea
					label='Description'
					id='task_description'
					name='task_description'
				/>
				<Select
					label='Priority'
					id='task_priority'
					name='task_priority'
				>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</Select>

				<Select
					label='Assigned To'
					id='task_assignee'
					name='task_assignee'
				>
					<option value='user'>User</option>
				</Select>

				<Input
					type='hidden'
					value='todo'
					id='task_status'
					name='task_status'
				/>

				<div className='flex flex-col md:flex-row gap-3 justify-end'>
					<Button type='button' onClick={closeModal}>
						Cancel
					</Button>

					<Button submitBtn>Add New Task</Button>
				</div>
			</form>
		</Modal>
	);
}
