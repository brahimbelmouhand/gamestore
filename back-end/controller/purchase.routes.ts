import express, { Request, Response, NextFunction } from 'express';
import purchaseService from '../service/purchase.service';

const purchaseRouter = express.Router();

purchaseRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await purchaseService.getAllPurchases();
        res.status(200).json(purchases);
    }
    catch (error) {
        next(error);
    }
});

export default purchaseRouter;