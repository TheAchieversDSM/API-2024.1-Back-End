
import { Request, Response } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import ProductService from '../services/productService';
import commentService from '../services/commentService';
import { Comment } from '../models';

class BaseImportController {
    public async uploadFile(req: Request, res: Response) {
        let products = await ProductService.getProducts();
        let dataArray: any[] = []
        try {
            const upload = multer().single('file');
            upload(req, res, (err: any) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }


                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }

                if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
                    const sheetName = workbook.SheetNames[0];
                    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    console.log(data);
                    return res.status(200).json({ message: 'File uploaded successfully' });
                }

                if (req.file.mimetype === 'text/csv') {
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
      
                        dataArray.forEach(async (row) => {
                            if( !isNaN(row.product_id) ){
                            let product = await ProductService.checkAndSaveProduct(row.product_id, row.product_name, row.site_category_lv1, row.site_category_lv2);
                            
                            const comment = new Comment();
                            comment.product = product;
                            comment.text = row.review_text? row.review_text : '';
                            comment.rating = row.overall_rating? row.overall_rating : 0;
                            comment.date = row.submission_date? row.submission_date : '';
                            comment.gender = row.reviewer_gender? row.reviewer_gender : '';
                            comment.state = row.reviewer_state ? row.reviewer_state : '';
                            await commentService.createComment(comment);}
                        }
                    );
                });
                    console.log("Finished processing file");
                    return res.status(200).json({ message: 'File uploaded successfully'});
                    
                } else {
                    return res.status(400).json({ message: 'Unsupported file type' });
                }
            });
            
         
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default BaseImportController;
