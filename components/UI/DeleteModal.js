import Modal from './Modal';
import Button from './Button';
import { useModalStore } from '@/lib/store/useModalStore';

export default function DeleteModal({ deleteTaskHandler }) {
	const closeModal = useModalStore((state) => state.closeModal);

	return (
		<Modal>
			<p className='text-center py-4'>
				Are you sure you want to delete this task? Once you click delete
				this will be <b>permanently deleted</b>!
			</p>
			<div className='flex justify-center gap-2'>
				<Button submitBtn onClick={deleteTaskHandler}>
					Delete
				</Button>
				<Button onClick={closeModal}>Cancel</Button>
			</div>
		</Modal>
	);
}
