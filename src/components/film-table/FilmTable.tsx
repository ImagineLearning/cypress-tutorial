import { useEffect, useMemo, Fragment } from 'react';
import {
	CellProps,
	Column,
	useExpanded,
	useGlobalFilter,
	useSortBy,
	useTable
} from 'react-table';

export interface Film {
	id: string;
	title: string;
	description: string;
	director: string;
	producer: string;
	release_date: string;
	rt_score: string;
}

export interface FilmTableProps {
	films: Film[];
	filter: string;
}

export function FilmTable({ films, filter }: FilmTableProps) {
	const columns: Column<Film>[] = useMemo(
		() => [
			{
				id: 'expander',
				Cell: ({ row }: CellProps<Film>) => (
					<span
						{...row.getToggleRowExpandedProps()}
						className="select-none">
						{row.isExpanded ? '➖' : '➕'}
					</span>
				)
			},
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
				sortType: 'alphanumeric',
				minWidth: 140
			},
			{
				Header: 'Rotten Tomatoes',
				accessor: 'rt_score',
				sortType: 'alphanumeric',
				minWidth: 170
			}
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		visibleColumns
	} = useTable(
		{ columns, data: films },
		useGlobalFilter,
		useSortBy,
		useExpanded
	);

	useEffect(() => {
		setGlobalFilter(filter);
	}, [setGlobalFilter, filter]);

	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table
							{...getTableProps()}
							className="films min-w-full divide-y divide-gray-200">
							<thead>
								{headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps(
														{
															style: {
																width:
																	column.minWidth
															}
														}
													)
												)}
												scope="col"
												className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
												{column.render('Header')}
												{column.isSorted
													? column.isSortedDesc
														? ' 🔽'
														: ' 🔼'
													: ''}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody
								{...getTableBodyProps()}
								className="bg-white divide-y divide-gray-200"
								x-max="1">
								{rows.map((row, i) => {
									prepareRow(row);
									const rowProps = row.getRowProps();
									return (
										<Fragment key={rowProps.key}>
											<tr {...rowProps}>
												{row.cells.map(cell => (
													<td
														{...cell.getCellProps()}
														className="px-6 py-4 whitespace-nowrap">
														{cell.render('Cell')}
													</td>
												))}
											</tr>
											{row.isExpanded ? (
												<tr>
													<td
														className="px-6 py-4 text-gray-600 bg-gray-50"
														colSpan={
															visibleColumns.length
														}>
														{
															row.original
																.description
														}
													</td>
												</tr>
											) : null}
										</Fragment>
									);
								})}
								{filter && rows.length === 0 ? (
									<tr>
										<td
											className="px-6 py-4 text-center text-gray-500"
											colSpan={visibleColumns.length}>
											No results were found that matched "
											{filter}".
										</td>
									</tr>
								) : null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
