/// <reference types="Cypress" />

describe('Test 1 - order product', function () {
    let orderNum;
    before(function () {
        // database reset before test
        if (!Cypress.env('TRAVIS')) {
            cy.exec('npm run db:reset');
        }
    });
    it('Add products to cart', function () {
        // add products A and B to a cart
        cy.visit('');
        cy.get('#cart1').click();
        cy.get('#cart2').click();
    });
    it('Modify cart', function () {
        // Remove A & add C
        cy.get('#shopping_cart').click();
        cy.url().should('contain', '/cart');
        cy.get('#summary');
        cy.get('#del1').click();
        cy.get('#summary').should('not.contain.text', 'Lager');
        cy.get('#back').click();
        cy.get('#cart3').click();
    });
    it('Submit order', function () {
        // Submit order for products B and C
        cy.get('#shopping_cart').click()
        cy.contains('IPA');
        cy.contains('Stout');
        cy.get('#complete_order').click();
        cy.get('#message').should('have.attr', 'style', 'color:green;')
            .and('contain.text', 'completed successfully')
            .and((message) => {
                expect(message.text()).to.match(/\d{5}/);
                orderNum = message.text().match(/\d{5}/)[0];
            });
    });
    it('Check if exists', function () {
        cy.get('#back').click();
        cy.get('#order_input').type(orderNum);
        cy.get('#search_order').click();
        cy.url().should('include', '/order/' + orderNum);
        cy.get('#summary');
    });
});