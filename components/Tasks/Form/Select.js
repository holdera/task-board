export default function Select({ children, id, label, ...props }) {
	const inputStyle = 'border border-main rounded-lg p-1';
	return (
		<div className='flex flex-col gap-1.5 my-1.5'>
			<label htmlFor={id}>{label}</label>
			<select className={inputStyle} id={id} {...props}>
				{children}
			</select>
		</div>
	);
}
