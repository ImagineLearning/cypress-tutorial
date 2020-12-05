export class FilmsPage {
	interceptFilmsRequest() {
		cy.intercept({
			method: 'GET',
			url: 'https://ghibliapi.herokuapp.com/films'
		}).as('films');
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

	numberOfVisibleFilmsShouldBe(films: number) {
		cy.get('table.films tbody tr').should('have.length', 2);
	}

	visibleFilmTitlesShouldMatch(title: RegExp) {
		cy.get('table.films tbody tr td:nth-child(2)').should($columns => {
			$columns.each((_, column) => {
				expect(Cypress.$(column).text()).to.match(title);
			});
		});
	}
}
