// import express, { Request, Response } from 'express';
// import { DataService } from '../services/dataService';
// import { comments, products, summaries } from '../models/mockData'; 

// class DataController {
//     private dataService: DataService;

//     constructor() {

//         this.dataService = new DataService(comments, products, summaries);
//     }

//     public async getAllComments(req: Request, res: Response): Promise<void> {
//         try {
//             const comments = this.dataService.getAllComments();
//             res.json(comments);
//         } catch (error: any) {
//             res.status(500).json({ message: 'Erro ao buscar comentários', error: error.message });
//         }
//     }

//     public async getAllProducts(req: Request, res: Response): Promise<void> {
//         try {
//             const products = this.dataService.getAllProducts();
//             res.json(products);
//         } catch (error: any) { 
//             res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
//         }
//     }

//     public async getAllSummaries(req: Request, res: Response): Promise<void> {
//         try {
//             const summaries = this.dataService.getAllSummaries();
//             res.json(summaries);
//         } catch (error: any) { 
//             res.status(500).json({ message: 'Erro ao buscar resumos', error: error.message });
//         }
//     }
// }

// export default DataController;
