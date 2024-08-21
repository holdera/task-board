'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/store/useModalStore';
import { useTaskStore } from '@/store/useTaskStore';
import {
	fetchTasks,
	queryClient,
	updateTaskParent,
	deleteTask,
} from '../../../utils/http';
import { DndContext } from '@dnd-kit/core';
import Card from '../TaskCard/Card';
import TaskColumn from './TaskColumn';
import ErrorMsg from '@/components/UI/ErrorMsg';
import EditTaskForm from '../Form/EditTaskForm';
import DeleteModal from '@/components/UI/DeleteModal';

export default function TaskBoard() {
	const deleteModal = useModalStore((state) => state.deleteTaskModal);
	const editModal = useModalStore((state) => state.editTaskModal);
	const taskId = useModalStore((state) => state.taskId);
	const openDeleteTaskModal = useModalStore(
		(state) => state.openDeleteTaskModal
	);
	const openEditTaskModal = useModalStore((state) => state.openEditTaskModal);
	const closeModal = useModalStore((state) => state.closeModal);

	const tasks = useTaskStore((state) => state.tasks);
	const setTasks = useTaskStore((state) => state.setTasks);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['tasks'],
		queryFn: ({ signal }) => fetchTasks({ signal }),
	});

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

	const updateCardTask = useMutation({
		queryKey: ['tasks'],
		mutationFn: updateTaskParent,
		onMutate: async (data) => {
			const { id, task_status } = data;

			await queryClient.cancelQueries({
				queryKey: ['tasks', id],
			});

			const prevTask = queryClient.getQueryData(['tasks', id]);

			queryClient.setQueryData(['tasks', id], (oldData) => ({
				...oldData,
				task_status,
			}));

			return { prevTask };
		},
		onError: (error, newData, context) => {
			queryClient.setQueryData(['tasks', newData.id], context.prevTask);
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(['tasks', newData.id], newData);
		},
		onSettled: (newData) => {
			queryClient.invalidateQueries(['tasks', newData.id]);
		},
	});

	const mutateTask = useMutation({
		queryKey: ['tasks'],
		mutationFn: deleteTask,
		onMutate: async (newData) => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });

			queryClient.setQueryData(['tasks'], (oldData) => [
				...oldData,
				newData,
			]);
		},
		onError: (error, newData, context) => {
			console.log(error, newData, context);
		},
		onSuccess: () => {
			closeModal();
		},
		onSettled: () => {
			const newData = queryClient.invalidateQueries(['tasks']);
			return newData;
		},
	});

	function handleDelete() {
		if (taskId !== '') {
			mutateTask.mutate({ id: taskId });
		}
	}

	useEffect(() => {
		setTasks(data);

		if (tasks) {
			const updatedParents = parent.map((item) => {
				const cardsInThisColumn = tasks.filter(
					(card) => card.task_status === item.id
				);
				return {
					...item,
					cards: cardsInThisColumn,
				};
			});
			setParent(updatedParents);
		}
	}, [data, tasks]);

	let content;

	if (isLoading) {
		content = <p>Is loading...</p>;
	}

	if (isError) {
		content = (
			<ErrorMsg message='Error fetching tasks. Please try again later.' />
		);
	}

	if (data && tasks) {
		content = (
			<>
				{parent &&
					parent.map((item, i) => (
						<TaskColumn
							key={item.id}
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
											openEditModal={() =>
												openEditTaskModal(card._id)
											}
											openDeleteModal={() =>
												openDeleteTaskModal(card._id)
											}
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

		const draggedCard = tasks.find((card) => card._id === targetId);
		const currentParent = tasks.map((card) => card.task_status)[0];

		const updatedCardData = tasks.map((card) =>
			card._id === targetId
				? { ...card, task_status: destinationParent }
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
			setTasks(updatedCardData);
			setParent(updateParent);

			updateCardTask.mutate({ id: targetId, task: destinationParent });
		}
	}

	return (
		<>
			<section id='task-board' className='flex gap-5 justify-between'>
				<DndContext onDragEnd={handleDragEnd}>{content}</DndContext>
			</section>
			{deleteModal && <DeleteModal deleteTaskHandler={handleDelete} />}
			{editModal && <EditTaskForm id={taskId} />}
		</>
	);
}
