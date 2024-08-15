'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchTasks, queryClient, updateTask } from '../utils/http';
import { DndContext } from '@dnd-kit/core';
import Card from './Tasks/Card';
import TaskColumn from './Tasks/TaskColumn';

export default function TaskBoard() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['tasks'],
		queryFn: ({ signal }) => fetchTasks({ signal }),
	});

	const [cardData, setCardData] = useState(null);
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

	const { mutate } = useMutation({
		queryKey: ['tasks'],
		mutationFn: updateTask,
		onMutate: async (data) => {
			const { id, task_parent } = data;

			await queryClient.cancelQueries({
				queryKey: ['tasks', id],
			});

			const prevTask = queryClient.getQueryData(['tasks', id]);

			queryClient.setQueryData(['tasks', id], (oldData) => ({
				...oldData,
				task_parent,
			}));

			return { prevTask };
		},
		onError: (error, newData, context) => {
			console.log(error);
			queryClient.setQueryData(['tasks', newData.id], context.prevTask);
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(['tasks', newData.id], newData);
		},
		onSettled: (newData) => {
			queryClient.invalidateQueries(['tasks', newData.id]);
		},
	});

	useEffect(() => {
		if (data && !cardData) {
			setCardData(data);
		}
		if (cardData) {
			console.log(cardData);
			const updatedParents = parent.map((item) => {
				const cardsInThisColumn = cardData.filter(
					(card) => card.task_parent === item.id
				);
				return {
					...item,
					cards: cardsInThisColumn,
				};
			});
			setParent(updatedParents);
		}
	}, [data, cardData]);

	let content;

	if (isLoading) {
		content = <p>Is loading...</p>;
	}

	if (isError) {
		content = <p>Error fetching tasks.</p>;
	}

	if (data && cardData) {
		content = (
			<>
				{parent &&
					parent.map((item, i) => (
						<TaskColumn
							key={item.title + i}
							id={item.id}
							title={item.title}
						>
							{item.cards &&
								item.cards.map((card, i) => {
									return (
										<Card
											key={card._id}
											id={card._id}
											assignee={card.task_assignee}
											priorityStatus={card.task_priority}
											taskName={card.task_name}
											taskDesc={card.task_description}
										/>
									);
								})}
						</TaskColumn>
					))}
			</>
		);
	}

	function handleDragEnd(event) {
		if (!event.over) return;
		const targetId = event.active.id;
		const destinationParent = event.over.id;
		const currentParentId = event.active.data.current.task_parent;

		const draggedCard = cardData.find((card) => card._id === targetId);
		const currentParent = cardData.map((card) => card.task_parent)[0];
		console.log(currentParent);

		const updatedCardData = cardData.map((card) =>
			card._id === targetId
				? { ...card, task_parent: destinationParent }
				: card
		);

		const updateParent = parent.map((col) => {
			if (col.id === destinationParent) {
				return {
					...col,
					cards: [...col.cards, draggedCard],
				};
			}

			return col;
		});

		if (currentParent !== destinationParent) {
			setCardData(updatedCardData);
			setParent(updateParent);

			mutate({ id: targetId, task: destinationParent });
		}
	}

	return (
		<>
			<section id='task-board' className='flex gap-5 justify-between'>
				<DndContext onDragEnd={handleDragEnd}>{content}</DndContext>
			</section>
		</>
	);
}
