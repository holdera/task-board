'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/http';
import { useState } from 'react';
import AddTaskForm from '@/components/Tasks/Form/AddTaskForm';
import TaskBoard from '@/components/Tasks/TaskBoard/TaskBoard';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
	const [addingTask, setAddingTask] = useState(false);

	function openAddTaskForm() {
		setAddingTask(true);
	}
	function handleClose() {
		setAddingTask(false);
	}

	return (
		<QueryClientProvider client={queryClient}>
			{addingTask && <AddTaskForm onClose={handleClose} />}
			<section className='flex items-start justify-between gap-5'>
				<Sidebar showAddTaskForm={openAddTaskForm} />
				<div className='flex flex-col items-start justify-start min-h-[50vh] pt-5 w-[90%] pr-5'>
					<h1 className='font-bold mb-7 text-3xl text-left'>
						Task Board
					</h1>
					<TaskBoard />
				</div>
			</section>
		</QueryClientProvider>
	);
}
