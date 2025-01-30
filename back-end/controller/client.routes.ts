import express, { Request, Response, NextFunction } from 'express';
import clientService from '../service/client.service';

const clientRouter = express.Router();

clientRouter.get('/:clientId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientId = req.params.clientId;
        const client = await clientService.getClientWithUser(Number(clientId));
        res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
})

export default clientRouter;