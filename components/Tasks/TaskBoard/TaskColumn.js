import { useDroppable } from '@dnd-kit/core';
import CardHeaders from '../TaskCard/CardHeaders';

export default function TaskColumn({ id, children, title }) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	return (
		<div
			ref={setNodeRef}
			className={`w-1/4 rounded-xl p-1.5 lg:min-w-[200px] ${
				isOver ? 'bg-gray-300 ' : 'bg-transparent'
			}`}
		>
			<CardHeaders progressTitle={title} />
			{children}
		</div>
	);
}
