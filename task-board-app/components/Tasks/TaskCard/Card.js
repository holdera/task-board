import CardEditItems from './CardEditItems';
import Draggable from '../../DnD/Draggable';
import PriorityLabel from './PriorityLabel';
import TaskAssignee from './TaskAssignee';

export default function Card({
	id,
	assignee,
	openEditModal,
	editTask,
	priorityStatus,
	taskName,
	taskDesc,
}) {
	return (
		<div className='bg-white p-4 relative rounded-xl shadow-lg text-left mb-2'>
			<div className='flex justify-between'>
				<PriorityLabel label={priorityStatus} />
				<CardEditItems
					openEditModal={openEditModal}
					editTask={editTask}
				/>
			</div>
			<Draggable id={id}>
				<div>
					<div className='content-card py-4'>
						<h3 className='font-semibold pb-1.5'>{taskName}</h3>
						<hr className='py-1' />
						<p>{taskDesc}</p>
					</div>
					<TaskAssignee assignee={assignee} />
				</div>
			</Draggable>
		</div>
	);
}
