//Exportando a Classe signupPage
import signupPage from '../pages/signupPage.js'
import signupFactory from '../factories/SignupFactory.js'


describe('Signup', ()=>{ //Define a Suite do Teste

    //Recurso de ganchos
    /*
    beforeEach(function(){
        cy.fixture('deliver').then((d)=>{
            this.deliver = d
        })
    })
    */

    //Cria o Caso de Teste
    it('User should be deliver', function() { 

        //Irá criar a massa de teste
        var deliver = signupFactory.deliver()
              
        //Chamada das funções
         signupPage.go()
         signupPage.fillForm(deliver)
         signupPage.submit()
                 
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)  

    })
    //Cria o Caso de Teste
    it('Incorrect document', function() { 
        
        //Irá criar a massa de teste
        var deliver = signupFactory.deliver()

        deliver.cpf = 'x00000141AA'
         
         //Chamada das funções
          signupPage.go()
          signupPage.fillForm(deliver)
          signupPage.submit()
          signupPage.alertMessageShouldBe('Oops! CPF inválido')
               
              

    })

    it('Incorret email', function() {

        //Irá criar a massa de teste
        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')


    })

    //Contexto para testar compos obrigatórios que gera uma massa de dados 
    context('Required fields', function() {
        
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'deliver_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
         
        ]

        //Função de gancho que será executado uma única vez
        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        //Chamada da constante messages que por ser um array utiliza-se a função forEach a qual irá percorre pela lista de menssagens através de lup
        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){ //Caso de teste que faz a validação campo por campo, fazendo uma concatenação de valores
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

})