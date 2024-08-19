import Modal from './Modal';
import Button from './Button';
import { useModalStore } from '@/store/useModalStore';

export default function DeleteModal({ deleteTaskHandler }) {
	const closeModal = useModalStore((state) => state.closeModal);

	return (
		<Modal>
			<p>Are you sure you want to delete this task?</p>
			<Button submitBtn onClick={deleteTaskHandler}>
				Delete
			</Button>
			<Button onClick={closeModal}>Cancel</Button>
		</Modal>
	);
}
