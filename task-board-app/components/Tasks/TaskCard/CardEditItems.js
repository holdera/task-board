import Image from 'next/image';
import GarbageCan from '../../../assets/garbage-can.svg';
import Pencil from '../../../assets/pencil.svg';

export default function CardEditItems({ openEditModal, openDeleteModal }) {
	return (
		<>
			<div className='card-edit-items flex gap-2.5 relative z-10'>
				<button type='button' onClick={openEditModal}>
					<Image src={Pencil} alt='edit task' />
				</button>
				<button type='button' onClick={openDeleteModal}>
					<Image src={GarbageCan} alt='delete task' />
				</button>
			</div>
		</>
	);
}
