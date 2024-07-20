// comentario especial para buscar os tipos do cypress, para ter auto complete 
/// <reference types="Cypress" />

//switch de testes texto + função de call back
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        //site para ser acessado 
         cy.visit('./src/privacy.html')
    })
    //teste case nome do teste + funcao de call back
    it('verifica o título da aplicação', function() {
              
        //cy.title pega o titulo da pagina // should faz uma afirmação, be.equal deve ser >> titulo da pagina
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})