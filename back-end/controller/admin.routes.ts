import express, { NextFunction, Request, Response } from 'express';
import adminService from '../service/admin.service';
import sanitizehtml from "sanitize-html";
const adminRouter = express.Router();

adminRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
    const username = sanitizehtml(req.body);
    const admin = adminService.createAdmin(username);
    res.status(200).json(admin);
});

export default adminRouter;