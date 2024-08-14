export default function PriorityLabel({ label }) {
	const labelColor =
		label === 'low'
			? 'bg-green-600'
			: label === 'high'
			? 'bg-pink-600'
			: 'bg-blue-500';

	return (
		<span
			className={`${labelColor} inline py-1.5 px-3 rounded-xl text-base text-white`}
		>
			{label}
		</span>
	);
}
