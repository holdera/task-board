'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/store/useModalStore';
import Button from '@/components/UI/Button';
import ErrorMsg from '@/components/UI/ErrorMsg';
import Modal from '@/components/UI/Modal';
import TaskForm from './TaskForm';
import { h2Styles } from '../../../styles/styles';
import { fetchSingleTask, queryClient, updateTask } from '../../../utils/http';

export default function EditTaskForm({ id }) {
	const closeModal = useModalStore((state) => state.closeModal);

	const { data, isError, error, isLoading } = useQuery({
		queryKey: ['tasks', id],
		queryFn: ({ signal }) => fetchSingleTask({ id: id, signal }),
	});

	const update = useMutation({
		queryKey: ['tasks'],
		mutationFn: updateTask,
		onMutate: (formData) => {
			queryClient.setQueryData(['tasks'], (old) => [...old, formData]);
		},
		onError: (error, newData, context) => {
			console.log(error, newData, context);
		},
		onSuccess: () => {
			closeModal();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	function handleEditTask(formData) {
		update.mutate({ id: id, formData: formData });
	}
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
