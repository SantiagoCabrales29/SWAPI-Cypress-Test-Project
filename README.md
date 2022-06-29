# SWAPI-Cypress-Test-Project
API Tests for SWAPI, the Star Wars API. 
The SWAPI API documentation can be found here:
https://swapi.dev/documentation

SWAPI is an API that allows the user to send GET 
request using a big Star Wars database. Here we are
sending request to the following endpoints

http://swapi.dev/api/planets/1/
https://swapi.dev/api/people/1/

We maily use cy.request() method and we are doing some
assertions, extracting values and getting properties of
the responses.

This project is using Cypress v10.2.0
You can run the project by using the command:
node_modules/.bin/cypress run
