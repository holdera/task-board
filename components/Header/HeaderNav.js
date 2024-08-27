import Link from 'next/link';

export default function HeaderNav({ navLinks }) {
	return (
		<nav>
			<ul>
				{navLinks.map((link) => (
					<li key={link.title}>
						<Link href={link.url}>{link.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
