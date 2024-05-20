import TesteProduct from "../src/test/product";

const teste = 'Teste'

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  getById: jest.fn(),

};

describe('getById', () => {
     it(' Deve buscar um produto cadastrado pelo Id', async () =>{
       const product = TesteProduct.giveMeaValidProduct();
      let mockProcuct = mockRepository.find.mockReturnValue([product]);
      expect(mockProcuct).toBeTruthy();
  })
});

 describe('Teste', () => {
  test('Testando em Jest', () => {
    expect(teste).toBe('Teste')
 });
})