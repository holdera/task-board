import { useModalStore } from '@/store/useModalStore';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';
import TaskForm from './TaskForm';

export default function EditTaskForm({ handleEditTask }) {
	const closeModal = useModalStore((state) => state.closeModal);
	return (
		<Modal>
			<h2 className='font-semibold text-lg'>Edit Task</h2>
			<TaskForm onSubmit={handleEditTask}>
				<Button type='button' onClick={closeModal}>
					Cancel
				</Button>
				<Button submitBtn>Update</Button>
			</TaskForm>
		</Modal>
	);
}
