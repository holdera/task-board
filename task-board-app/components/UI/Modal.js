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
				className='bg-white max-w-[90%] py-3 px-4 rounded-2xl top-[25%] w-[30rem] z-10'
			>
				<button className='absolute right-5' onClick={closeModal}>
					<Image src={CloseImg} alt='close' />
				</button>
				{children}
			</dialog>
		</>
	);
}
