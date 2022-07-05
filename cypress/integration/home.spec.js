describe('home page', ()=>{ //Definindo a Suite de Teste
    it('app deve estar online', ()=>{ //Criando o Caso de Teste
        cy.visit('/')
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

    })
})