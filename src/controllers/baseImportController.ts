
import { Request, Response } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import ProductService from '../services/productService';

class BaseImportController {
    public async uploadFile(req: Request, res: Response) {
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
                    const dataArray: any[] = [];
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
                            await ProductService.checkAndSaveProduct(data.product_id, data.product_name, data.site_category_lv1, data.site_category_lv2);
                            dataArray.push(data);
                        })
                        .on('end', () => {
                            console.log(dataArray);
                            return res.status(200).json({ message: 'File uploaded successfully', data: dataArray });
                        });
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
