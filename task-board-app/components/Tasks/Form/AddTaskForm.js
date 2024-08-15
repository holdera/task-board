'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createNewTask, queryClient } from '@/utils/http';
import Input from './Input';
import Modal from '@/components/UI/Modal';
import Select from './Select';

export default function AddTaskForm({ onClose }) {
	const mutation = useMutation({
		mutationFn: createNewTask,
		onSuccess: () => {
			console.log('success');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			onClose();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	function handleAddTask(e) {
		e.preventDefault();
		const form_data = new FormData(e.target);
		const data_form = Object.fromEntries(form_data);
		mutation.mutate(data_form);
	}

	return (
		<Modal onClose={onClose}>
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

				<button className='bg-main mt-3 py-1.5 px-3 rounded-lg text-white'>
					Add New Task
				</button>
			</form>
		</Modal>
	);
}
