// referance types="Cypress" />
 describe.only(' central de atendimento ao cliente TAT',function(){
         beforeEach(function()  {
         cy.visit('./src/index.html')
        })
        it('verifica o titulo da aplicação', function() {
       cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') 
     })
     it ('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,testetestetesteteste,testetestetestetestetestetestetestetestetestetestetesteteste'
      cy.get('#firstName').type('jéssica')  
      cy.get('#lastName').type('melo')
      cy.get('#email').type('jessica@gmail.com')
      cy.get('#open-text-area ').type(longText,{delay: 0 })
      cy.contains('button','Enviar')
      cy.get('.success').should('be.visible')
     });
     it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
      cy.get('#email').type('jessicagmail.com')
      cy.contains('button','Enviar').click()
      cy.get('.error ').should('be.visible')
    
     })
      
    it('validar que, se um valor não-numérico for digitado, seu valor continuará vazio',function(){
        cy.get('#phone')
         .type('abcdef')
         .should('have.value','')
      })
      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#phone-checkbox').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        
      })
      it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
         .type('walmyr')
         .should('have.value','walmyr')
         .clear()
         .should('have.value','')
         cy.get('#lastName')
         .type('melo')
         .should('have.value','melo')
         .clear()
         .should('have.value','')
         cy.get('#email')
         .type('jessica@gmail.com')
         .should('have.value','jessica@gmail.com')
         .clear()
         .should('have.value','')
         cy.get('#phone')
         .type('123456')
         .should('have.value','123456')
         .clear()
         .should('have.value','')

        })
         it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
          cy.contains('button','Enviar').click()
          cy.get('.error').should('be.visible')
         })
         
        it ('envia o formuário com sucesso usando um comando customizado', function(){
          cy.fillMandatoryFieldsAndSubmit()
          cy.get('.success').should('be.visible')
        })
        it('seleciona um produto (YouTube) por seu texto',function(){
          cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })
        it('seleciona um produto(mentoria) por seu valor',function(){
          cy.get('#product')
             .select('mentoria')
             .should('have.value','mentoria')
        })
        it('selecione um produto(blog) por seu indice',function(){
          cy.get('#product')
            .select(2)
            .should('have.value','cursos')
        })
        it('marca o tipo de atendimento "Feedback"',function (){
          cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')
        })
        it('marca cada tipo de atendimento',function(){
          cy.get('input[type="radio"]')
           .should('have.length',3)
           .each(function($radio){
             cy.wrap($radio).check()
             cy.wrap($radio).should('be.checked')
           })
        })
        it('marca ambos checkboxes, depois desmarca o último',function(){
          cy.get('input[type="checkbox"]')
             .check()
             .should('be.checked')
             .last()
             .uncheck()
             .should('not.be.checked')
        
        })
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
          cy.get('#phone-checkbox').check()
          cy.contains('button','Enviar').click()
          cy.get('.error').should('be.visible')
        })
        it('seleciona um arquivo da pasta fixtures',function(){
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
              expect($input[0].files[0].name).to.equal('example.json')
            })
        })
        it('seleciona um arquivo simulando um drag-and-drop',function(){///esse comando arrasta  a imagem ao inves de selecionar
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
            .should(function($input){
              expect($input[0].files[0].name).to.equal('example.json')
            })
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
            .selectFile('@sampleFile')
        })
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
          cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        })
        it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
          cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        })
      })