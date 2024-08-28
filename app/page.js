'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/http';
import Button from '@/components/UI/Button';
import AddTaskForm from '@/components/Tasks/Form/AddTaskForm';
import TaskBoard from '@/components/Tasks/TaskBoard/TaskBoard';
import { useModalStore } from '@/lib/store/useModalStore';

export default function Home() {
	const addTaskIsOpen = useModalStore((state) => state.addTaskModal);
	const openAddTaskModal = useModalStore((state) => state.openAddTaskModal);

	function openAddTaskForm() {
		openAddTaskModal();
	}

	return (
		<QueryClientProvider client={queryClient}>
			{addTaskIsOpen && <AddTaskForm />}
			<div className='flex flex-col min-h-[50vh] px-5 pt-5 w-[90%] pr-5 h-screen overflow-y-auto lg:px-10 lg:container lg:mx-auto'>
				<div className='flex md:justify-between sm:items-center'>
					<h1 className='font-bold text-3xl text-left'>Task Board</h1>
					<button
						className='bg-blue-700 py-1.5 px-3 rounded-lg text-white'
						type='button'
						onClick={openAddTaskForm}
					>
						Add New Tasks
					</button>
				</div>
				<TaskBoard />
			</div>
		</QueryClientProvider>
	);
}
