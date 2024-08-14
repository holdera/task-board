export default function Modal({ children, onClose }) {
	return (
		<>
			<div
				className='bg-black/70 fixed h-screen w-full z-10'
				onClick={onClose}
			></div>
			<dialog
				open
				className='bg-white max-w-[90%] py-3 px-4 rounded-2xl top-[30%] w-[30rem] z-10'
			>
				<button
					className='absolute right-5'
					onClick={onClose}
					aria-label='close'
				>
					X
				</button>
				{children}
			</dialog>
		</>
	);
}
