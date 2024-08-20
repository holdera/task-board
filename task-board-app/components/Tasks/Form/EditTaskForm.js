'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/store/useModalStore';
import { useTaskStore } from '@/store/useTaskStore';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';
import TaskForm from './TaskForm';
import { h2Styles } from '../../../styles/styles';
import { fetchSingleTask } from '../../../utils/http';
import ErrorMsg from '@/components/UI/ErrorMsg';

export default function EditTaskForm({ id }) {
	const closeModal = useModalStore((state) => state.closeModal);

	const { data, isError, error, isLoading } = useQuery({
		queryKey: ['tasks', id],
		queryFn: ({ signal }) => fetchSingleTask({ id: id, signal }),
		staleTime: 9000,
	});

	function handleEditTask(formData) {}
	return (
		<Modal>
			{isLoading && <p>Task is on its way...</p>}
			{isError && (
				<ErrorMsg
					message={error?.info?.message || 'Failed to get task data'}
				/>
			)}
			{data && (
				<>
					<h2 className={h2Styles}>Edit Task</h2>
					<TaskForm data={data} onSubmit={handleEditTask}>
						<Button type='button' onClick={closeModal}>
							Cancel
						</Button>
						<Button submitBtn>Update</Button>
					</TaskForm>
				</>
			)}
		</Modal>
	);
}
