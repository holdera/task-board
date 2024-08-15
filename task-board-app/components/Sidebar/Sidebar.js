import Link from 'next/link';

export default function Sidebar({ showAddTaskForm }) {
	return (
		<aside className='bg-main font-semibold h-screen px-3 shadow-md text-white w-[170px]'>
			<div className='py-6'>
				<Link className='font-bold text-2xl' href='/'>
					Tasker
				</Link>
			</div>
			<nav className='h-1/2 translate-y-1/2'>
				<ul className='flex flex-col gap-4'>
					<li>
						<Link href='/'>Tasks</Link>
					</li>
					<li>
						<button type='button' onClick={showAddTaskForm}>
							Add New Tasks
						</button>
					</li>
					<li>
						<Link href='/team'>Team</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
