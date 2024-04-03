import { Comment } from "../models/index";
import { Product } from "../models/index";
import { Summary } from "../models/index";

export class DataService {

    private mockComments: Comment[];
    private mockProducts: Product[];
    private mockSummaries: Summary[];

    constructor(mockComments: Comment[], mockProducts: Product[], mockSummaries: Summary[]) {
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

    getAllSummaries(): Summary[] {
        return this.mockSummaries;
    }
}
