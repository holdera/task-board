import Link from 'next/link';

export default function Menu({ links }) {
	return (
		<nav>
			<ul>
				{links.map((link) => (
					<li key={link.text}>
						<Link href={link.url}>{link.text}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
