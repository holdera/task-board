import { useDraggable } from '@dnd-kit/core';

export default function Draggable(props) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.id,
		data: {
			index: props.id,
		},
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div
			className='draggable-buttons w-full'
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			tabIndex={0}
		>
			{props.children}
		</div>
	);
}
