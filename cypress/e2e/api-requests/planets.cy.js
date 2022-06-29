/// <reference types="Cypress"/>

/*
The intention of cy.request() is to be used for checking endpoints on an actual, 
running server without having to start the front end application.
*/

it('Sending a request to get the first planet', ()=>{

    cy.request('planets/1/').its('body.name').should('equal','Tatooine')
    cy.request('planets/1/').its('status').should('equal', 200)
})

it('Sending a request to get first planet 2', ()=>{
    cy.request({
        method: 'GET',
        url: 'planets/1/'
    }).then((response) =>{
        expect(response.status).eq(200)
        expect(response.body.name).eq('Tatooine')
    });
})

it('Sending a request to get first planet 3 Using Aliases', ()=>{
    cy.request({
        method: 'GET',
        url: 'planets/1/'
    }).as('apiCall')
    
    cy.get('@apiCall').should((response) =>{
        expect(response.status).eq(200)
        expect(response.body.name).eq('Tatooine')
    })
})