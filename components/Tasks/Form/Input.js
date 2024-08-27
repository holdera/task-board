export default function Input({ id, label, textarea, ...props }) {
	const inputStyle = 'border border-main rounded-lg p-1';
	return (
		<div className='flex flex-col gap-1.5 my-1.5'>
			<label htmlFor={id}>{label}</label>
			{textarea ? (
				<textarea className={inputStyle} id={id} {...props} />
			) : (
				<input className={inputStyle} id={id} {...props} />
			)}
		</div>
	);
}
