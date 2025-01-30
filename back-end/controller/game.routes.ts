import express, { Request, Response, NextFunction } from 'express';
import gameService from '../service/game.service';

const gameRouter = express.Router();

gameRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    }
    catch (error) {
        next(error)
    }
})


export default gameRouter;