import express, { NextFunction, Request, Response, Router } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';
import sanitizehtml from "sanitize-html";
const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sanitizedInput = {
            firstName: sanitizehtml(req.body.firstName || ""),
            lastName: sanitizehtml(req.body.lastName || ""),
            email: sanitizehtml(req.body.email || ""),
            username: sanitizehtml(req.body.username || ""),
            password: req.body.password,
            birthDate: new Date(req.body.birthDate),
        };
        const newUserInput = sanitizedInput as UserInput;
        const newUser = await userService.createUser(newUserInput);
        res.status(200).json(newUser);
    }
    catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sanitizedInput = {
            firstName: sanitizehtml(req.body.firstName || ""),
            lastName: sanitizehtml(req.body.lastName || ""),
            email: sanitizehtml(req.body.email || ""),
            username: sanitizehtml(req.body.username || ""),
            password: req.body.password,
            birthDate: new Date(req.body.birthDate),
        };
        const newUserInput = sanitizedInput as UserInput;
        const response = await userService.authenticate({ username: newUserInput.username, password: newUserInput.password });
        res.status(200).json({ message: 'Authentication successful', ...response });
    }
    catch (error) {
        next(error);
    }
})

export default userRouter;