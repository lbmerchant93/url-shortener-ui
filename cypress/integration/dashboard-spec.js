describe('URL Shortener', () => {
    beforeEach(() => {
        cy.fixture('testUrls.json')
        .then(urls => {
            cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            body: urls
            })
        })
        cy.visit('http://localhost:3000/')
    })
    
    it('Should display all of the existing urls on page load', () => {
        cy.get('.url').should('have.length', '4')
    })
})