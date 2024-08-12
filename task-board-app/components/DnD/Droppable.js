import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id, children }) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	return (
		<div
			className={`${isOver ? 'bg-gray-300' : 'bg-gray-500'} `}
			ref={setNodeRef}
		>
			{children}
		</div>
	);
}
