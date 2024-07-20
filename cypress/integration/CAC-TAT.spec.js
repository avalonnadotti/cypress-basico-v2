// comentario especial para buscar os tipos do cypress, para ter auto complete 
/// <reference types="Cypress" />

//switch de testes texto + função de call back
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        //site para ser acessado 
         cy.visit('./src/index.html')
    })
    //teste case nome do teste + funcao de call back
    it('verifica o título da aplicação', function() {
              
        //cy.title pega o titulo da pagina // should faz uma afirmação, be.equal deve ser >> titulo da pagina
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('Preenche e envia formulário com sucesso', function (){
        const longText = Cypress._.repeat('LOREN IPSUN ', 20)
        
        cy.get('#firstName').type('Avalon', {delay:0})
        cy.get('#lastName').type('Nadotti', {delay:0})
        cy.get('#email').type('nadottiavalon@gmail.com', {delay:0})
        cy.get('#phone').type('19981760869', {delay:0})
        cy.get('#product').select(1)
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').invoke('val', longText, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('Preenche e envia formulário com erro', function (){
        const longText= 'LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN LOREN IPSUN '
        
        cy.get('#firstName').type('Avalon', {delay:0})
        cy.get('#lastName').type('Nadotti', {delay:0})
        cy.get('#email').type('nadottiavalongmail.com', {delay:0})
        cy.get('#phone').type('19981760869', {delay:0})
        cy.get('#product').select(3)
        cy.get('#support-type > :nth-child(4)')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando inserido valor nao numerico', function(){
        cy.get('#phone')
            .type('abcdefasd')
            .should('be.empty')
    })

    it('Testa obrigatoriedade do campo telefone quando marcado meio contato telefone', function(){
        cy.get('#firstName').type('Avalon', {delay:0})
        cy.get('#lastName').type('Nadotti', {delay:0})
        cy.get('#email').type('nadottiavalongmail.com', {delay:0})
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Testando clear', function(){
        cy.get('#firstName').type('Avalon', {delay:0}).should('have.value', 'Avalon').clear().should('have.value', '')

    })

    it('Enviar com form vazio', function(){
        
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    

    it('marca cada tipo de atendimento', function(){
        cy.fillEachRadio()
        

    })

    it('marca cada tipo de contato', function(){
        cy.fillEachCheckBox()
        

    })

    it('marca cada tipo de contato', function(){
        cy.fillEachCheckBox()
        cy.fillMandatoryFieldsAndSubmit('Avalon', 'Nadotti', 'email@email.com', 'txtArea', 999999999)
        cy.checkSuccessVisible()
    })

    it('teste de upload', function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('teste de upload drag and drop', function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('teste de upload com alias', function(){
        cy.fixture('example').as('sampleFile')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function(input){
                expect(input[0].files[0].name).to.equal('example')
            })
    })
    it('Teste de link sem mudar pagina', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    Cypress._.times(5, ()=> {
        it('check Success Not Visible after 3 seconds', function(){
            cy.clock()
            cy.fillEachCheckBox()
            cy.fillMandatoryFieldsAndSubmit('Avalon', 'Nadotti', 'email@email.com', 'txtArea', 999999999)
            cy.checkSuccessVisible()
            cy.tick(3000)
            cy.checkSuccessNotVisible()
        })
    })
    
    it('Teste que exibe e esconde as mensagens de sucesso e erro usando o .invoke', ()=>{
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })
    
    it('Faz uma requisicao HTTP', ()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const { status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it.only('faz brotar um gatinho', ()=>{
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
    })
})