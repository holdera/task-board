'use client';
import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import Card from './Card';
import TaskColumn from './TaskColumn';

export default function TaskBoard() {
	const [cardData, setCardData] = useState([
		{
			id: 'task-1',
			assignee: 'Alannah',
			priorityStatus: 'low',
			taskName: 'Update Homepage',
			taskDesc:
				'Have to update new copy for the about section on the homepage. Also need to switch out the ctas and change the hero image.',
			parent: 'todo',
		},
	]);
	const [parent, setParent] = useState([
		{
			id: 'todo',
			title: 'To do',
			cards: [],
		},
		{
			id: 'inProgress',
			title: 'In Progress',
			cards: [],
		},
		{
			id: 'qa',
			title: 'In QA',
			cards: [],
		},
		{
			id: 'completed',
			title: 'Completed',
			cards: [],
		},
	]);

	useEffect(() => {
		const updatedParents = parent.map((item) => {
			const cardsInThisColumn = cardData.filter(
				(card) => card.parent === item.id
			);
			return {
				...item,
				cards: cardsInThisColumn,
			};
		});
		setParent(updatedParents);
	}, [cardData]);

	function handleDragEnd(event) {
		if (!event.over) return;
		console.log(event);
		const targetId = event.active.id;
		const currentParentId = event.active.data.current.parent;
		const destinationId = event.over.id;

		if (currentParentId === destinationId) return;

		const dragggdCard = cardData.find((card) => card.id === targetId);

		const updateCardData = cardData.map((card) => {
			if (card.id === targetId) {
				return { ...card, parent: destinationId };
			}
			return card;
		});
		const updateParent = parent.map((col) => {
			if (col.id === currentParentId) {
				return {
					...col,
					cards: col.cards.filter((card) => card.id !== targetId),
				};
			}

			if (col.id === destinationId) {
				return {
					...col,
					cards: [...col.cards, dragggdCard],
				};
			}

			return col;
		});
		setCardData(updateCardData);
		setParent(updateParent);
	}

	return (
		<>
			<section
				id='task-board'
				className='flex gap-5 justify-between px-10 lg:px-16 xl:px-24'
			>
				<DndContext onDragEnd={handleDragEnd}>
					{parent &&
						parent.map((item, i) => (
							<TaskColumn
								key={item.title + i}
								id={item.id}
								title={item.title}
							>
								{item.cards &&
									item.cards.map((card) => {
										return (
											<Card
												id={card.id}
												assignee={card.assignee}
												priorityStatus={
													card.priorityStatus
												}
												taskName={card.taskName}
												taskDesc={card.taskDesc}
											/>
										);
									})}
							</TaskColumn>
						))}
				</DndContext>
			</section>
		</>
	);
}
