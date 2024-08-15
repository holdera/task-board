import Draggable from '../DnD/Draggable';
import PriorityLabel from './PriorityLabel';
import TaskAssignee from './TaskAssignee';

export default function Card({
	id,
	assignee,
	priorityStatus,
	taskName,
	taskDesc,
}) {
	return (
		<Draggable id={id}>
			<div className='bg-white p-4 relative rounded-xl shadow-lg text-left'>
				<PriorityLabel label={priorityStatus} />
				<div className='py-4'>
					<h3 className='font-semibold pb-1.5'>{taskName}</h3>
					<hr className='py-1' />
					<p>{taskDesc}</p>
				</div>
				<TaskAssignee assignee={assignee} />
			</div>
		</Draggable>
	);
}
