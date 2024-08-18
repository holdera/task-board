import Image from 'next/image';
import GarbageCan from '../../../assets/garbage-can.svg';
import Pencil from '../../../assets/pencil.svg';

export default function CardEditItems({ deleteTask, editTask }) {
	return (
		<div className='card-edit-items flex gap-2.5 relative z-20'>
			<button type='button' onClick={editTask}>
				<Image src={Pencil} alt='edit task' />
			</button>
			<button type='button' onClick={deleteTask}>
				<Image src={GarbageCan} alt='delete task' />
			</button>
		</div>
	);
}
