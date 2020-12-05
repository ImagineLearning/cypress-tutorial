export class FilmsPage {
	interceptFilmsRequest() {
		cy.intercept(
			{
				method: 'GET',
				url: 'https://ghibliapi.herokuapp.com/films'
			},
			{
				fixture: 'films.json',
				headers: {
					'access-control-allow-origin': window.location.origin
				}
			}
		).as('films');
		return this;
	}

	waitForFilmsRequest() {
		cy.wait('@films');
		return this;
	}

	visit() {
		cy.visit('/');
		return this;
	}

	fillInSearch(term: string) {
		cy.get('form.search input').type(term);
		return this;
	}

	submitSearch() {
		cy.get('form.search button').click();
		return this;
	}

	filmsShouldMatchSnapshot() {
		cy.get('table.films').matchImageSnapshot();
	}
}
