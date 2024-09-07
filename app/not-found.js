import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<h1>Page Not Found</h1>
			<p>
				Oops! Looks like the page you are looking for is not available.
			</p>
			<Link href='/'>Return Home</Link>
		</div>
	);
}
