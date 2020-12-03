export interface HeaderProps {
	title: string;
	children: JSX.Element;
}

export function Header({ title, children }: HeaderProps) {
	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row">
				<h1 className="text-3xl font-bold leading-tight text-gray-900">
					{title}
				</h1>
				<div className="flex-grow flex flex-row-reverse">
					{children}
				</div>
			</div>
		</header>
	);
}
