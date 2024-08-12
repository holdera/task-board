import { useDroppable } from '@dnd-kit/core';
import CardHeaders from './CardHeaders';

export default function TaskColumn({ id, children, title }) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	return (
		<div
			ref={setNodeRef}
			className={`w-1/4 ${isOver ? 'bg-transparent' : 'bg-gray-300'}`}
		>
			<CardHeaders progressTitle={title} />
			{children}
		</div>
	);
}
