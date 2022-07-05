
class SignupPage {
    //A função "go" irá acessar a página de cadastro do usuário que deseja se tornar um entregador.
    go() {
         
        cy.visit('/') //Acessa a tela principal para o teste

        cy.get('a[href="/deliver"]').click() //Função get com a sub-função click, passando um localizador CSS para enconter o botão "Cadastre-se para fazer entregas"
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas') //Um checkpoint para certificar que se chegou ao logar correto

    }

    //A função "fillForm" irá preencher todo o formulário do entregador, recebendo uma massa de teste como argumento.    
    fillForm(deliver) {

        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)
        
       //validação dos campo preenchidos pela busca do CEP
        cy.get('input[name="address"]').should('have.value',deliver.address.street)
        cy.get('input[name="district"]').should('have.value',deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value',deliver.address.city_state)
        
        //Função que uni um CSS Selector com um texto (localizador utilizado em substituição ao XPath que o cypress n tem suporte)
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)

    }

    //Submete o formulário
    submit() {

        cy.get('form button[type="submit"]').click()
    }

    //Irá encapsular a validação
    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage)//A função get tem a capacidade de obter apenas um elemento se ele encotrar mais de um ocorrerá problema de ambiguidade. 
        cy.contains('.alert-error', expectedMessage).should('be.visible')//A função contains faz uma combinação de localizadores

    }
}
//exportando e instancia a página, para seja importada na Suite de teste
export default new SignupPage;