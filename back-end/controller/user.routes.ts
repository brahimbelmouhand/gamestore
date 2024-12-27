import express, { NextFunction, Request, Response, Router } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUserInput = <UserInput>req.body;
        const newUser = await userService.createUser(newUserInput);
        res.status(200).json(newUser);
    }
    catch (error) {
        next(error);
    }
});

export default userRouter;