import HeaderNav from './HeaderNav';

export default function Header() {
	const links = [
		{ title: 'Dashboard', url: '/dashboard' },
		{ title: 'Projects', url: '/' },
		{ title: 'Sign Out', url: '/' },
	];
	return (
		<header>
			<span>Tasker</span>
			<HeaderNav navLinks={links} />
		</header>
	);
}
