/// <reference types="Cypress"/>

/*
The intention of cy.request() is to be used for checking endpoints on an actual, 
running server without having to start the front end application.
*/

it('Sending a request to get the first people', ()=>{
    cy.request('people/1/').its('body.name').should('equal','Luke Skywalker')
})


it('Sending a request to get first people verifying properties in response', ()=>{
    cy.request({
        method: 'GET',
        url: 'people/1/'
    }).as('apiCall')
    
    cy.get('@apiCall').should((response) =>{
        expect(response.status).eq(200)
        expect(response.body).to.have.property('gender')
        expect(response.body).to.have.property('hair_color')
        expect(response.body).to.have.property('url')
        expect(response.body).to.have.property('eye_color')
        expect(response.body.name).eq('Luke Skywalker')
    }).then((response)=>{
        // we use this to print the response.body object
        cy.log(response.body)
    })
})

it('Extracting value of the name of the response body', ()=>{
    cy.request({
        method: 'GET',
        url: 'people/1/'
    }).as('apiCall')
    
    cy.get('@apiCall').should((response) =>{
        expect(response.status).eq(200)
        expect(response.body).to.have.property('gender')
        expect(response.body.name).eq('Luke Skywalker')
    }).then((response)=>{
        cy.wrap(response.body.name).as('people1Name')
    })

    cy.get('@people1Name').then((name) => {
        cy.log(name)
    })
})


it('Extracting different values from the films object of the response body', ()=>{
    cy.request({
        method: 'GET',
        url: 'people/1/'
    }).as('apiCall')
    
    cy.get('@apiCall').should((response) =>{
        expect(response.status).eq(200)
        expect(response.body).to.have.property('gender')
        expect(response.body.name).eq('Luke Skywalker')
    }).then((response)=>{
        cy.wrap(response.body.films).as('filmList')
    })

    cy.get('@filmList').then((films) => {
        cy.log(films[0])
        cy.log(films[1])
        cy.log(films[2])
    })
})


it('Extracting the first vehicles url and using it to do a request to that api', ()=>{
    cy.request({
        method: 'GET',
        url: 'people/1/'
    }).as('apiCall')
    
    cy.get('@apiCall').should((response) =>{
        expect(response.status).eq(200)
        expect(response.body).to.have.property('gender')
        expect(response.body.name).eq('Luke Skywalker')
    }).then((response)=>{
        cy.wrap(response.body.vehicles).as('people1Vehicles')
    })

    cy.get('@people1Vehicles').then((vehicles) => {
        cy.log(vehicles[0])
        cy.wrap(vehicles[0]).as('vehicle1')
    })

    cy.get('@vehicle1').then((vehicle) =>{
        cy.request(vehicle).its('body.name').should('eq','Snowspeeder')
    })
})