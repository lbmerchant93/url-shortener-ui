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

    it('Should not be able to submit inputs until both inputs are filled out', () => {
        cy.get('button').eq(0).should('have.attr', 'disabled', 'disabled')
        cy.get('input').eq(0).type('Peach')
        cy.get('input').eq(0).should('have.attr', 'value', 'Peach')
        cy.get('button').eq(0).should('have.attr', 'disabled', 'disabled')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=NmT1l5CUfgs&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('input').eq(1).should('have.attr', 'value', 'https://www.youtube.com/watch?v=NmT1l5CUfgs&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').eq(0).should('not.have.attr', 'disabled')
    })

    it('Should display the new shortened URL when the form is filled out and submitted', () => {
        cy.get('.url').should('have.length', '4')
        cy.get('input').eq(0).type('Between Days')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').eq(0).click()
        cy.get('.url').should('have.length', '5')
        cy.get('h3').eq(4).contains('Between Days')
        cy.get('a').eq(4).contains('http://localhost:3001/useshorturl/5')
        cy.get('p').eq(4).contains('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
    })

})

describe('URL Shortener 404 Error on GET', () => {
    beforeEach(() => {
        cy.fixture('testUrls.json')
        .then(urls => {
            cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            statusCode: 404
            })
        })
        cy.visit('http://localhost:3000/')
    })

    it('Should display an error message if the GET call for all urls doesn\'t work', () => {
        cy.get('p').eq(0).contains('404 error. Sorry! Something went wrong retrieving all the urls! Try again later!')
    })
})

describe('URL Shortener 404 Error on POST', () => {
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
            statusCode: 404
            })
        })

        cy.visit('http://localhost:3000/')
    })
    it('Should display an error message if the POST call doesn\'t work', () => {
        cy.get('input').eq(0).type('Between Days')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').eq(0).click()
        cy.get('p').eq(0).contains('404 error. Sorry! Something went wrong with your POST! Try again later!')
    })
})

describe('URL Shortener Delete Functionality', () => {
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
        cy.fixture('testUrls.json')
        .then(response => {
            cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/5', {
            statusCode: 204,
            headers: {
                'Content-type': 'application/json'
                },
            })
        })

        cy.visit('http://localhost:3000/')
    })

    it('Should delete an url card', () => {
        cy.get('input').eq(0).type('Between Days')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').eq(0).click()
        cy.get('.delete').eq(4).click()
        cy.get('.url').should('have.length', '4')
    })
})

describe('URL Shortener Delete Error', () => {
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
        cy.fixture('testUrls.json')
        .then(response => {
            cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/5', {
            statusCode: 404,
            headers: {
                'Content-type': 'application/json'
                },
            })
        })

        cy.visit('http://localhost:3000/')
    })
    
    it('Should display an error message when there is an error with the DELETE Fetch call', () => {
        cy.get('input').eq(0).type('Between Days')
        cy.get('input').eq(1).type('https://www.youtube.com/watch?v=qm0ru2iBuB0&list=RDEMqribv0Mn5Pp2PPKhIenVuQ&index=28')
        cy.get('button').eq(0).click()
        cy.get('.delete').eq(4).click()
        cy.get('p').eq(0).contains('404 error. Sorry! Something went wrong with your Delete! Try again later!')
    })
})