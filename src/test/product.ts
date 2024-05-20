import { Product } from "../models";

export default class TesteProduct {
    static giveMeaValidProduct(): Product{
        const product = new Product();
        product.name = "teste_produto";
        product.category = "Informática";
        product.subcategory = "Notebooks";
        return product;
    }
}