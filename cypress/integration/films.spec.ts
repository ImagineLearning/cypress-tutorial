import { FilmsPage } from '../page-objects/films-page';

describe('Films', () => {
	let page: FilmsPage;

	before(() => {
		page = new FilmsPage();
	});

	describe('Searching', () => {
		it('should filter films', () => {
			page.interceptFilmsRequest()
				.visit()
				.waitForFilmsRequest()
				.fillInSearch('castle')
				.submitSearch();

			page.filmsShouldMatchSnapshot();
		});
	});
});
