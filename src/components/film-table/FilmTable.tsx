import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

export interface Film {
	id: string;
	title: string;
	director: string;
	producer: string;
	release_date: string;
	rt_score: string;
}

export interface FilmTableProps {
	films: Film[];
}

export function FilmTable({ films }: FilmTableProps) {
	const columns = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
				sortType: 'basic'
			},
			{
				Header: 'Director',
				accessor: 'director',
				sortType: 'basic'
			},
			{
				Header: 'Producer',
				accessor: 'producer',
				sortType: 'basic'
			},
			{
				Header: 'Release Date',
				accessor: 'release_date',
				sortType: 'alphanumeric'
			},
			{
				Header: 'Rotten Tomatoes',
				accessor: 'rt_score',
				sortType: 'alphanumeric'
			}
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		{ columns: columns as any, data: films },
		useSortBy
	);

	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
							<thead>
								{headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th
												{...column.getHeaderProps(column.getSortByToggleProps())}
												scope="col"
												className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												{column.render('Header')}
												{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200" x-max="1">
								{rows.map((row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map(cell => {
												return (
													<td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
														{cell.render('Cell')}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
