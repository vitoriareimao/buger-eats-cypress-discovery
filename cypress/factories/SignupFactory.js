var faker = require('faker') //Importando a biblioteca 'faker'
var cpf = require('gerador-validador-cpf') //Importando a biblioteca que gera e valida cpf
//Criando um módulo
export default {

    deliver: function() {

        var firstName = faker.name.firstName()//Irá retornar um primeiro nome dinâmico
        var lastName = faker.name.lastName()//Irá retornar um segundo nome dinâmico

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data

    }

}