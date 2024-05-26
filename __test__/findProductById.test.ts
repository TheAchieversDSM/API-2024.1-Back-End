import TesteProduct from "../src/test/product";

const teste = 'Teste'

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  getById: jest.fn(),
};

describe('getById', () => {
  it('Deve buscar um produto cadastrado pelo Id', async () => {
    const product = TesteProduct.giveMeaValidProduct();
    let mockProduct = mockRepository.find.mockReturnValue([product]);
    expect(mockProduct).toBeTruthy();
  });

  it('Deve retornar o produto correto ao chamar getById', async () => {
    const product = TesteProduct.giveMeaValidProduct();
    mockRepository.getById.mockReturnValue(product);
    const result = await mockRepository.getById(product.id);
    expect(result).toEqual(product);
  });

  it('Deve chamar a função findOneBy com o argumento correto', async () => {
    const productId = 1;
    await mockRepository.findOneBy({ id: productId });
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: productId });
  });
});

describe('Teste', () => {
  test('Testando em Jest', () => {
    expect(teste).toBe('Teste')
  });
});
