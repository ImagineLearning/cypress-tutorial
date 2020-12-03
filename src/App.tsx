import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { Film, FilmTable } from './components/film-table/FilmTable';
import { Search } from './components/search/Search';

export function App() {
	const [films, setFilms] = useState<Film[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		async function fetchFilms() {
			const response = await fetch(
				'https://ghibliapi.herokuapp.com/films'
			);
			const results = (await response.json()) as Film[];
			setFilms(results);
		}

		fetchFilms();
	}, []);

	return (
		<>
			<Header title="Studio Ghibli Films 🍿">
				<Search onSearch={setSearch}></Search>
			</Header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<FilmTable films={films} filter={search} />
				</div>
			</main>
		</>
	);
}
