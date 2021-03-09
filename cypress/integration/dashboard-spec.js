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

    it('Should store the values in the inputs until they are submitted', () => {
        cy.get('input').eq(0).type('Peach')
        cy.get('input').eq(0).should('have.attr', 'value', 'Peach')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=NmT1l5CUfgs&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('input').eq(1).should('have.attr', 'value', 'https://www.youtube.com/watch?v=NmT1l5CUfgs&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
    })

})