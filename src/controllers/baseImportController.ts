import { Request, Response } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import ProductService from '../services/productService';
import commentService from '../services/commentService';
import { Comment } from '../models';
import { getManager } from 'typeorm';
import { BaseImportLog } from '../models/baseImportLog';
import categorySummaryService from '../services/categorySummaryService';

class BaseImportController {
    public async uploadFile(req: Request, res: Response) {

    let dataArray: any[] = []
        try {
            const upload = multer().single('file');
            upload(req, res, async (err: any) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }

                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }

                

                let status = 'success'

                if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
                    const sheetName = workbook.SheetNames[0];
                    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    console.log(data);
                } else if (req.file.mimetype === 'text/csv') {
                    const csvTransform = csvParser({
                        separator: ',',
                        mapHeaders: ({ header }) => header.trim(),
                        mapValues: ({ header, index, value }) => value.trim()
                    });

                    const csvReadableStream = new Readable();
                    csvReadableStream.push(req.file.buffer);
                    csvReadableStream.push(null);
                    csvReadableStream.pipe(csvTransform)
                        .on('data', async (data) => {
                            dataArray.push(data);
                        })
                        .on('end', async () => {
                            
                            const uniqueCategories = new Set();
                            dataArray.forEach((row) => {
                                uniqueCategories.add(row.site_category_lv1);
                            });
                            const categories: string[] = Array.from(uniqueCategories) as string[];

                            dataArray.forEach(async (row) => {
                                if (!isNaN(row.product_id)) {
                                    let product = await ProductService.checkAndSaveProduct(row.product_id, row.product_name, row.site_category_lv1, row.site_category_lv2);

                                    const comment = new Comment();
                                    comment.product = product;
                                    comment.text = row.review_text ? row.review_text : '';
                                    comment.rating = row.overall_rating ? row.overall_rating : 0;
                                    comment.date = row.submission_date ? row.submission_date : '';
                                    comment.gender = row.reviewer_gender ? row.reviewer_gender : '';
                                    comment.state = row.reviewer_state ? row.reviewer_state : '';
                                    await commentService.createComment(comment);
                                }
                            });
                            
                            const summarizedCategories = await categorySummaryService.summarizeByCategory(categories, dataArray, 500);

                        });
                } else {
                    status = 'unsupported file type';
                }


                const fileName = req.file.originalname;

                const importLogRepository = getManager().getRepository(BaseImportLog);
                const importLog = new BaseImportLog();
                importLog.fileName = fileName;
                importLog.status = status;
                await importLogRepository.save(importLog);

                if (status === 'success') {
                    return res.status(200).json({ message: 'File uploaded successfully' });
                } else {
                    return res.status(400).json({ message: 'File upload failed', reason: status });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getImportLogs(req: Request, res: Response) {
        try {
            const importLogRepository = getManager().getRepository(BaseImportLog);
            const importLogs = await importLogRepository.find();
            return res.json(importLogs);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default BaseImportController;
