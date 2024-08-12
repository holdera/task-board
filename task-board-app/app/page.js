import TaskBoard from '@/components/TaskBoard';

export default function Home() {
	return (
		<section className='flex flex-col items-center justify-center min-h-[50vh]'>
			<h1 className='font-bold mb-7 text-3xl text-left'>Task Board</h1>
			<TaskBoard />
		</section>
	);
}
