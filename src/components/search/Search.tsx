import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';

export interface SearchProps {
	onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
	const [query, setQuery] = useState('');
	const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
		setQuery(event.target.value);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(query);
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) =>
		event.target.select();

	return (
		<form className="search relative text-gray-600" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search"
				className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
				onChange={handleChange}
				onFocus={handleFocus}
			/>
			<button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
				🔎
			</button>
		</form>
	);
}
