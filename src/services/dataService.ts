import { Comment } from "../models/index";
import { Product } from "../models/index";
import { ProductSummary } from "../models/index";

export class DataService {

    private mockComments: Comment[];
    private mockProducts: Product[];
    private mockSummaries: ProductSummary[];

    constructor(mockComments: Comment[], mockProducts: Product[], mockSummaries: ProductSummary[]) {
        this.mockComments = mockComments;
        this.mockProducts = mockProducts;
        this.mockSummaries = mockSummaries;
    }

    getAllComments(): Comment[] {
        return this.mockComments;
    }

    getAllProducts(): Product[] {
        return this.mockProducts;
    }

    getAllSummaries(): ProductSummary[] {
        return this.mockSummaries;
    }
}
