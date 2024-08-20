import Image from 'next/image';
import CloseImg from '../../assets/close.svg';
import { useModalStore } from '@/store/useModalStore';

export default function Modal({ children }) {
	const closeModal = useModalStore((state) => state.closeModal);

	return (
		<>
			<div
				className='bg-black/70 fixed h-screen left-0 top-0 w-full z-10'
				onClick={closeModal}
			></div>
			<dialog
				open
				className='bg-white max-w-[90%] p-6 rounded-2xl translate-y-1/2 w-[30rem] z-20'
			>
				<button
					className='absolute right-3.5 top-3.5'
					onClick={closeModal}
				>
					<Image src={CloseImg} width={20} alt='close' />
				</button>
				{children}
			</dialog>
		</>
	);
}
