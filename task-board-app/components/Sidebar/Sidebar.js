import Link from 'next/link';

export default function Sidebar({ showAddTaskForm }) {
	return (
		<aside className='bg-main font-semibold h-screen px-3 shadow-md text-white w-[170px]'>
			<nav>
				<ul>
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
