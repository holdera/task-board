export default function ErrorMsg({ message }) {
	return (
		<div className='bg-white p-4 relative rounded-xl shadow-lg shadow-rose-300 text-left text-rose-700'>
			<h2 className='font-semibold text-2xl pb-1'>Error</h2>
			<p>{message}</p>
		</div>
	);
}
