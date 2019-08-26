/// <reference types="Cypress" />

describe('Test 2 - delete order', function () {
    before(function () {
        // database reset before test
        // if (!Cypress.env('TRAVIS')) {
        //     cy.exec('npm run db:reset && npm run db:seed');
        // }
        cy.exec('npm run db:reset && npm run db:seed', { env: { PATH: PATH } });
    });
    it('Search for order', function () {
        // Query order on id
        cy.visit('');
        cy.get('#order_input').type('12345');
        cy.get('#search_order').click();
        cy.url().should('include', '/order/12345');
        cy.get('#summary');
    });
    it('Delete order', function () {
        // Delete order
        cy.get('#remove_order12345').click();
        cy.get('#message').should('have.attr', 'style', 'color:red;')
            .and('contain.text', 'was deleted')
            .and((message) => {
                expect(message.text()).to.match(/\d{5}/);
            });
    });
    it('Check if deleted', function () {
        cy.get('#back').click();
        cy.get('#order_input').type('12345');
        cy.get('#search_order').click();
        cy.get('#message').should('have.attr', 'style', 'color:red;')
            .and('contain.text', 'ERROR')
            .and((message) => {
                expect(message.text()).to.match(/\d{5}/);
            });
    });
});