Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome, email, txtArea, telefone){
       
    cy.get('#firstName').type(nome, {delay:0}).should('have.value', nome)
    cy.get('#lastName').type(sobrenome, {delay:0}).should('have.value', sobrenome)
    cy.get('#email').type(email, {delay:0}).should('have.value', email)
    cy.get('#phone').type(telefone, {delay:0}).should('have.value', telefone)
    cy.get('#open-text-area').type(txtArea).should('have.value', txtArea)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillEachRadio', function(nome, sobrenome, email, txtArea){
       
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
        })
})

Cypress.Commands.add('fillEachCheckBox', function(nome, sobrenome, email, txtArea){
       
    cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .each(function($checkBox){
            cy.wrap($checkBox).check().should('be.checked')
            
        })


})

Cypress.Commands.add('checkSuccess', function(){

    cy.get('.success').should('be.visible')
})