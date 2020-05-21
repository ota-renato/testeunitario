import { ClienteIdPipe } from './';

describe('Suite de testes de formatação do id do cliente', () => {
    
    let clienteIdPipe: ClienteIdPipe;

    beforeEach(() => {
        clienteIdPipe = new ClienteIdPipe();
    });

    it('Should return id value formated as ####-#######/##', () => {
        expect(clienteIdPipe.transform('1234567890123')).toEqual('1234-5678901/23');
    });

    it('Should returns the same value when id not contains 13 digits', () => {
        expect(clienteIdPipe.transform('12345')).toEqual('12345');
        expect(clienteIdPipe.transform('12345678901234')).toEqual('12345678901234');
    });
})
