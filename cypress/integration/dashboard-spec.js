describe('URL Shortener', () => {
    beforeEach(() => {
        cy.fixture('testUrls.json')
        .then(urls => {
            cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            body: urls
            })
        })
        cy.fixture('testUrls.json')
        .then(data => {
            cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
            body: data.postUrl,
            headers: {'Content-Type': 'application/json'},
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

    it.only('Should display the new shortened URL when the form is filled out and submitted', () => {
        cy.get('input').eq(0).type('Between Days')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').click()
        cy.get('.url').should('have.length', '5')
        cy.get('h3').eq(4).contains('Between Days')
        cy.get('a').eq(4).contains('http://localhost:3001/useshorturl/5')
        cy.get('p').eq(4).contains('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
    })

})