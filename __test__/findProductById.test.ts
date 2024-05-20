import TesteProduct from "../src/test/product";

const teste = 'Teste'

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  getById: jest.fn(),

};

describe('getById', () => {
     it(' Deve buscar um produto cadastrado pelo Id', async () =>{
       const parametro = TesteProduct.giveMeaValidProduct();
      let mockParametro = mockRepository.find.mockReturnValue([parametro]);
      expect(mockParametro).toBeTruthy();
  })
});

 describe('Teste', () => {
  test('Testando em Jest', () => {
    expect(teste).toBe('Teste')
 });
})