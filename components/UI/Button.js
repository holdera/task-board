export default function Button({ submitBtn, children, ...props }) {
	const btnStyles = ' mt-3 py-1.5 px-3 rounded-lg text-white';
	const btnColor = submitBtn ? 'bg-main' : 'bg-gray-600';
	return (
		<button className={`${btnColor} ${btnStyles}`} {...props}>
			{children}
		</button>
	);
}
